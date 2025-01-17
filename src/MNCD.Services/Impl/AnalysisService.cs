using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MNCD.Core;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Exceptions;
using MNCD.Domain.Extensions;
using MNCD.Domain.Services;
using MNCD.Services.Algorithms;
using MNCD.Services.Algorithms.Analysis;
using MNCD.Services.Algorithms.Flattening;
using MNCD.Services.Helpers;
using MNCD.Services.Workers;
using Newtonsoft.Json;

namespace MNCD.Services.Impl
{
    public class AnalysisService : IAnalysisService
    {
        private readonly MNCDContext _ctx;
        private readonly INetworkDataSetService _dataSets;
        private readonly IAnalysisSessionService _sessions;
        private readonly IVisualizationQueue _queue;
        private readonly IVisualizationService _visualizationService;

        private readonly Dictionary<FlatteningAlgorithm, IFlatteningAlgorithm> Flattening = new Dictionary<FlatteningAlgorithm, IFlatteningAlgorithm>
        {
            {  FlatteningAlgorithm.BasicFlattening, new BasicFlattening() },
            {  FlatteningAlgorithm.LocalSimplification, new LocalSimplification() },
            {  FlatteningAlgorithm.MergeFlattening, new MergeFlattening() },
            {  FlatteningAlgorithm.WeightedFlattening, new WeightedFlattening() }
        };

        private readonly Dictionary<AnalysisAlgorithm, IAnalysisAlgorithm> Analysis = new Dictionary<AnalysisAlgorithm, IAnalysisAlgorithm>
        {
            { AnalysisAlgorithm.FluidC, new FluidCAnalysis() },
            { AnalysisAlgorithm.Louvain, new LouvainAnalysis() },
            { AnalysisAlgorithm.KClique, new KCliqueAnalysis() },
            { AnalysisAlgorithm.CLECC, new CLECCAnalysis() },
            { AnalysisAlgorithm.ABACUS, new ABACUSAnalysis() },
            { AnalysisAlgorithm.LabelPropagation, new LabelPropagationAnalysis() },
        };

        public AnalysisService(
            MNCDContext ctx,
            INetworkDataSetService dataSets,
            IAnalysisSessionService sessions,
            IVisualizationQueue queue,
            IVisualizationService visualizationService)
        {
            _ctx = ctx;
            _dataSets = dataSets;
            _sessions = sessions;
            _queue = queue;
            _visualizationService = visualizationService;
        }

        public async Task<List<Analysis>> GetAnalysesForSession(int sessionId)
        {
            if (sessionId <= 0)
            {
                throw new ArgumentException("Session id must be greater than zero.", nameof(sessionId));
            }

            var session = await _ctx
                .AnalysisSessions
                .Include(a => a.Analyses)
                .FirstOrDefaultAsync(a => a.Id == sessionId);

            if (session is null)
            {
                throw new AnalysisSessionNotFoundException($"Session with id '{sessionId}' was not found.");
            }

            return session.Analyses?.ToList() ?? new List<Analysis>();
        }

        public async Task<Analysis> GetAnalysis(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id must be greater than zero.", nameof(id));
            }

            var analysis = await _ctx.Analyses
                .Include(a => a.Request)
                .ThenInclude(r => r.DataSet)
                .Include(a => a.Result)
                .Include(a => a.Visualizations)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (analysis is null)
            {
                throw new AnalysisNotFoundException($"Analysis with id '{id}' was not found.");
            }

            return analysis;
        }

        public async Task<Analysis> Analyze(int sessionId, int dataSetId, AnalysisRequest request)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));

            if (sessionId <= 0)
            {
                throw new ArgumentException("Session id must be greater than zero.", nameof(sessionId));
            }

            if (dataSetId <= 0)
            {
                throw new ArgumentException("Data set id must be greater than zero.", nameof(dataSetId));
            }

            var session = await _sessions.GetAnalysisSession(sessionId).ConfigureAwait(false);
            var dataSet = await _dataSets.GetDataSet(dataSetId).ConfigureAwait(false);

            request.DataSet = dataSet;

            var network = GetNetworkToAnalyze(request);
            var result = AnalyzeNetwork(request, network);

            var analysis = new Analysis
            {
                IsOpen = true,
                Request = request,
                Result = result
            };

            session.Analyses.Add(analysis);
            await _ctx.SaveChangesAsync();

            await _queue.QueueAsync(analysis);

            return analysis;
        }

        public async Task ToggleVisibility(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id must be greater than zero.", nameof(id));
            }

            var analysis = await GetAnalysis(id);
            analysis.IsOpen = !analysis.IsOpen;
            await _ctx.SaveChangesAsync();
        }

        public async Task Delete(int analysisId)
        {
            if (analysisId <= 0)
            {
                throw new ArgumentException("Analysis id must be greater than zero.", nameof(analysisId));
            }

            var analysis = await _ctx.Analyses
                .Include(a => a.Visualizations)
                .Include(a => a.Request)
                .Include(a => a.Result)
                .FirstOrDefaultAsync(a => a.Id == analysisId)
                .ConfigureAwait(false);

            if (analysis is null)
            {
                throw new AnalysisNotFoundException($"Analysis with id '{analysisId}' doesn't exist.");
            }

            _ctx.RemoveRange(analysis.Visualizations);

            _ctx.Remove(analysis);

            await _ctx.SaveChangesAsync();
        }

        public async Task EditNotes(int analysisId, string notes)
        {
            if (analysisId <= 0)
            {
                throw new ArgumentException("Analysis id must be greater than zero.", nameof(analysisId));
            }

            var analysis = await _ctx.Analyses.FirstOrDefaultAsync(a => a.Id == analysisId);

            if (analysis is null)
            {
                throw new AnalysisNotFoundException($"Analysis with id '{analysisId}' doesn't exist.");
            }

            analysis.Notes = notes;

            await _ctx.SaveChangesAsync();
        }

        public async Task ArchiveAnalysis(int analysisId, Stream outStream)
        {
            outStream = outStream ?? throw new ArgumentNullException(nameof(outStream));

            if (analysisId <= 0)
            {
                throw new ArgumentException("Analysis id must be greater than zero.", nameof(analysisId));
            }

            var analysis = _ctx.Analyses
                .Include(a => a.Visualizations)
                .Include(a => a.Request)
                .ThenInclude(r => r.DataSet)
                .Include(a => a.Request)
                .ThenInclude(r => r.DataSet)
                .ThenInclude(r => r.Visualizations)
                .Include(a => a.Result)
                .FirstOrDefault(a => a.Id == analysisId);

            if (analysis is null)
            {
                throw new AnalysisNotFoundException($"Analysis with id '{analysisId}' doesn't exist.");
            }

            var dataSet = analysis.Request.DataSet;
            var req = analysis.Request;
            var res = analysis.Result;

            var dataSetInfo = JsonConvert.SerializeObject(new
            {
                Name = dataSet.Name,
                FileType = dataSet.FileType.ToString(),
                NodeCount = dataSet.NodeCount,
                EdgeCount = dataSet.EdgeCount,
                LayerCount = dataSet.LayerCount,
                LayerNames = dataSet.LayerNames,
                ActorNames = dataSet.ActorNames,
            });
            var edgeList = dataSet.EdgeList;
            var originalData = dataSet.Content;
            var analyzedEdgeList = res.AnalyzedNetworkEdgeList;
            var communityList = res.CommunityList;
            var actorToCommunity = res.ActorToCommunity;

            var requestContent = new RequestContent
            {
                CreateDate = req.CreateDate,
                Approach = req.Approach.ToString(),
                AnalysisAlgorithm = req.AnalysisAlgorithm.ToString(),
                AnalysisAlgorithmParameters = req.AnalysisAlgorithmParameters
            };

            if (req.Approach == AnalysisApproach.SingleLayerFlattening)
            {
                requestContent.FlatteningAlgorithm = analysis.Request.FlatteningAlgorithm.ToString();
                requestContent.FlatteningAlgorithmParameters = analysis.Request.FlatteningAlgorithmParameters;
            }
            else if (req.Approach == AnalysisApproach.SingleLayerOnly)
            {
                requestContent.SelectedLayer = dataSet.LayerNames[req.SelectedLayer];
            }

            var resultContent = new ResultContent();

            if (req.Approach.IsSingleLayerApproach())
            {
                resultContent.Coverage = res.Coverage;
                resultContent.Modularity = res.Modularity;
                resultContent.Performance = res.Performance;
            }
            else
            {
                resultContent.Exclusivities = res.Exclusivities;
                resultContent.Homogenities = res.Homogenities;
                resultContent.Modularities = res.Modularities;
                resultContent.Performances = res.Performances;
                resultContent.Coverages = res.Coverages;
                resultContent.Varieties = res.Varieties;
            }

            using (var memoryStream = new MemoryStream())
            {
                using (var archive = new ZipArchive(memoryStream, ZipArchiveMode.Create, true))
                {
                    await WriteContent(archive, "/dataset/dataset-info.json", dataSetInfo);
                    await WriteContent(archive, "/dataset/data" + dataSet.FileType.ToExtension(), dataSet.Content);
                    await WriteContent(archive, "request.json", JsonConvert.SerializeObject(requestContent));
                    await WriteContent(archive, "result.json", JsonConvert.SerializeObject(resultContent));
                    await WriteContent(archive, "analyzed-data.edgelist.txt", analyzedEdgeList);
                    await WriteContent(archive, "community-list.txt", communityList);
                    await WriteContent(archive, "actor-to-community.json", JsonConvert.SerializeObject(actorToCommunity));

                    if (dataSet.FileType != FileType.EdgeList)
                    {
                        await WriteContent(archive, "dataset/data.edgelist.txt", edgeList);
                    }

                    var diagonal = dataSet.Visualizations.FirstOrDefault(v => v.Type == VisualizationType.MultiLayer_Diagonal);
                    if (diagonal != null)
                    {
                        await WriteContent(archive, "dataset/images/diagonal.svg", diagonal.SvgImage);
                    }

                    var slices = dataSet.Visualizations.FirstOrDefault(v => v.Type == VisualizationType.MultiLayer_Slices);
                    if (slices != null)
                    {
                        await WriteContent(archive, "dataset/images/slices.svg", slices.SvgImage);
                    }

                    foreach (var vis in analysis.Visualizations)
                    {
                        if (vis != null)
                        {
                            await WriteContent(archive, $"images/{vis.Title}.svg", vis.SvgImage);
                        }
                    }
                }

                memoryStream.Seek(0, SeekOrigin.Begin);
                await memoryStream.CopyToAsync(outStream);
                outStream.Seek(0, SeekOrigin.Begin);
            }
        }

        private async Task WriteContent(ZipArchive archive, string fileName, string content)
        {
            using (var stream = archive.CreateEntry(fileName).Open())
            using (var streamWriter = new StreamWriter(stream))
            {
                await streamWriter.WriteAsync(content);
            }
        }

        private Network GetNetworkToAnalyze(AnalysisRequest request)
        {
            request = request ?? throw new ArgumentNullException(nameof(request));

            var network = NetworkReaderHelper.ReadDataSet(request.DataSet);

            if (request.Approach == AnalysisApproach.SingleLayerOnly)
            {
                var errors = ValidateSingleLayerAnalysis(request, network);

                if (errors.Count > 0)
                {
                    throw new ArgumentException(string.Join('\n', errors));
                }

                var selected = request.SelectedLayer;
                var layer = network.Layers[selected];
                return new Network(layer, network.Actors);
            }

            if (request.Approach == AnalysisApproach.SingleLayerFlattening)
            {
                return Flattening[request.FlatteningAlgorithm].Flatten(network, request.FlatteningAlgorithmParameters);
            }

            return network;
        }

        private AnalysisResult AnalyzeNetwork(AnalysisRequest request, Network network)
        {
            return Analysis[request.AnalysisAlgorithm].Analyze(network, request.AnalysisAlgorithmParameters);
        }

        private List<string> ValidateSingleLayerAnalysis(AnalysisRequest request, Network network)
        {
            var errors = new List<string>();

            if (request.SelectedLayer > network.Layers.Count || request.SelectedLayer < 0)
            {
                errors.Add("Selected layer must be greater than zero and not greater than number of layers in data set.");
            }

            if (request.AnalysisAlgorithm.IsMultiLayer())
            {
                errors.Add("A algorithm for single layer networks must be used.");
            }

            return errors;
        }

        private class ResultContent
        {
            public List<double> Varieties { get; set; } = new List<double>();

            public List<double> Exclusivities { get; set; } = new List<double>();

            public List<double> Homogenities { get; set; } = new List<double>();

            public List<double> Performances { get; set; } = new List<double>();

            public List<double> Coverages { get; set; } = new List<double>();

            public List<double> Modularities { get; set; } = new List<double>();

            public double? Coverage { get; set; }

            public double? Performance { get; set; }

            public double? Modularity { get; set; }
        }

        private class RequestContent
        {
            public DateTime CreateDate { get; set; }

            public string SelectedLayer { get; set; }

            public string Approach { get; set; }

            public string AnalysisAlgorithm { get; set; }

            public Dictionary<string, string> AnalysisAlgorithmParameters { get; set; }

            public string FlatteningAlgorithm { get; set; }

            public Dictionary<string, string> FlatteningAlgorithmParameters { get; set; }
        }
    }
}