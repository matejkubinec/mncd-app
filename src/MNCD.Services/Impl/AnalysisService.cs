using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MNCD.Core;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Extensions;
using MNCD.Domain.Services;
using MNCD.Services.AnalysisAlgorithms;
using MNCD.Services.Helpers;
using Newtonsoft.Json;

namespace MNCD.Services.Impl
{
    public class AnalysisService : IAnalysisService
    {
        private readonly MNCDContext _ctx;
        private readonly IVisualizationService _visualization;

        public AnalysisService(MNCDContext ctx, IVisualizationService visualization)
        {
            _ctx = ctx;
            _visualization = visualization;
        }

        public List<Analysis> GetAnalysesForSession(int sessionId)
        {
            // TODO: switch to async
            var session = _ctx
                .AnalysisSessions
                .Include(a => a.Analyses)
                .FirstOrDefault(a => a.Id == sessionId);

            if (session == null)
            {
                throw new ApplicationException("Session was not found.");
            }

            return session.Analyses?.ToList() ?? new List<Analysis>();
        }

        public Analysis GetAnalysis(int id)
        {
            // TODO: switch to async
            var analysis = _ctx.Analyses.FirstOrDefault(a => a.Id == id);

            if (analysis == null)
            {
                throw new ApplicationException("Analysis was not found.");
            }

            return analysis;
        }

        public Analysis Analyze(int sessionId, AnalysisRequest request, bool visualize)
        {
            var session = _ctx.AnalysisSessions.FirstOrDefault(a => a.Id == sessionId);
            var dataSet = request.Dataset;

            if (session == null)
            {
                throw new ArgumentException($"Session with id {sessionId} was not found.");
            }

            if (dataSet == null)
            {
                throw new ApplicationException("Dataset is required.");
            }

            var network = NetworkReaderHelper.ReadDataSet(dataSet);
            var result = AnalyzeNetwork(request, network);

            var analysis = new Analysis
            {
                Request = request,
                Result = result
            };

            if (session.Analyses == null)
            {
                session.Analyses = new List<Analysis>
                {
                    analysis
                };
            }
            else
            {
                session.Analyses.Add(analysis);
            }

            if (visualize)
            {
                analysis = AddVisualizations(analysis).GetAwaiter().GetResult();
            }

            // TODO: switch to async
            _ctx.SaveChanges();

            return analysis;
        }

        private async Task<Analysis> AddVisualizations(Analysis analysis)
        {
            var edgeListMultiLayer = analysis.Request.Dataset.EdgeList;
            var edgeListAnalyzed = analysis.Result.AnalyzedNetworkEdgeList;
            var communityList = string.Join('\n', analysis.Result.ActorToCommunity.Select((c, a) => a + " " + c));
            var actorToCommunity = analysis.Result.ActorToCommunity;
            var communities = actorToCommunity.Distinct();
            var communitiesCount = communities.Select(c => actorToCommunity.Count(ac => ac == c));

            var multilayer = await _visualization.VisualizeMultilayer(edgeListMultiLayer, MultiLayerLayout.Diagonal);
            analysis.MultiLayer.Add(multilayer);

            var multilayerCommunities = await _visualization.VisualizeMultilayerCommunities(edgeListMultiLayer, communityList, MultiLayerCommunitiesLayout.Hairball);
            analysis.MultiLayerCommunities.Add(multilayerCommunities);

            if (analysis.Request.Approach.IsSingleLayerApproach())
            {
                var singleLayerLayouts = new List<SingleLayerLayout>
                {
                    SingleLayerLayout.Circular,
                    SingleLayerLayout.Spiral,
                    SingleLayerLayout.Spring
                };

                foreach (var layout in singleLayerLayouts)
                {
                    analysis.SingleLayer.Add(await _visualization.VisualizeSingleLayer(edgeListAnalyzed, layout));
                }

                foreach (var layout in singleLayerLayouts)
                {
                    analysis.SingleLayerCommunities.Add(await _visualization.VisualizeSingleLayerCommunity(edgeListAnalyzed, communityList, layout));
                }
            }

            var x = communities;
            var y = communitiesCount;
            var labels = communities.Select(c => "c" + c);
            var xlabel = "Community";
            var ylabel = "Number of nodes";
            analysis.CommunitiesBarplot = await _visualization.VisualizeBarplot(x, y, labels, xlabel, ylabel);

            var sizes = communitiesCount;
            var label = labels.Select((l, i) => l + '\n' + sizes.ElementAt(i));
            analysis.CommunitiesTreemap = await _visualization.VisualizeTreemap(sizes, label);

            return analysis;
        }

        public void RemoveFromSession(int sessionId, int analysisId)
        {
            // TODO: switch to async
            var session = _ctx
                .AnalysisSessions
                .Include(a => a.Analyses)
                .FirstOrDefault(a => a.Id == sessionId);

            if (session == null)
            {
                throw new ApplicationException("Session was not found.");
            }

            // TODO: switch to async
            var analysis = session.Analyses.FirstOrDefault(a => a.Id == analysisId);

            _ctx.Analyses.Remove(analysis);

            // TODO: switch to async
            _ctx.SaveChanges();
        }

        private AnalysisResult AnalyzeNetwork(AnalysisRequest request, Network network)
        {
            if (request.Approach == AnalysisApproach.SingleLayerOnly)
            {
                return SingleLayerAnalysis(request, network);
            }

            throw new ArgumentException("Unsupported approach.");
        }

        private AnalysisResult SingleLayerAnalysis(AnalysisRequest request, Network network)
        {
            ValidateSingleLayerAnalysis(request, network);

            var selectedLayer = network.Layers[request.SelectedLayer];
            var networkToAnalyze = new Network
            {
                Actors = network.Actors,
                Layers = new List<Layer>
                {
                    selectedLayer
                }
            };

            if (request.AnalysisAlgorithm == AnalysisAlgorithm.Louvain)
            {
                return Louvain.Analyze(request, networkToAnalyze, network);
            }

            if (request.AnalysisAlgorithm == AnalysisAlgorithm.FluidC)
            {
                return FluidC.Analyze(request, networkToAnalyze, network);
            }

            throw new ArgumentException(JsonConvert.SerializeObject(new[] { "Unsupported algorithm." }));
        }

        private void ValidateSingleLayerAnalysis(AnalysisRequest request, Network network)
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

            if (errors.Count > 0)
            {
                throw new ArgumentException(JsonConvert.SerializeObject(errors));
            }
        }
    }
}