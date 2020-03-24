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
using MNCD.Services.Algorithms;
using MNCD.Services.Algorithms.Analysis;
using MNCD.Services.Algorithms.Flattening;
using MNCD.Services.Helpers;

namespace MNCD.Services.Impl
{
    public class AnalysisService : IAnalysisService
    {
        private readonly MNCDContext _ctx;
        private readonly INetworkDataSetService _dataSets;
        private readonly IAnalysisSessionService _sessions;

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
            { AnalysisAlgorithm.CLECC, new CLECCAnalysis() }
        };

        public AnalysisService(
            MNCDContext ctx,
            INetworkDataSetService dataSets,
            IAnalysisSessionService sessions)
        {
            _ctx = ctx;
            _dataSets = dataSets;
            _sessions = sessions;
        }

        public async Task<List<Analysis>> GetAnalysesForSession(int sessionId)
        {
            var session = await _ctx
                .AnalysisSessions
                .Include(a => a.Analyses)
                .FirstOrDefaultAsync(a => a.Id == sessionId);

            if (session is null)
            {
                throw new ArgumentException($"Session with id '{sessionId}' was not found.");
            }

            return session.Analyses?.ToList() ?? new List<Analysis>();
        }

        public async Task<Analysis> GetAnalysis(int id)
        {
            var analysis = await _ctx.Analyses
                .Include(a => a.Request)
                .ThenInclude(r => r.DataSet)
                .Include(a => a.Result)
                .Include(a => a.Visualizations)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (analysis is null)
            {
                throw new ArgumentException($"Analysis with id '{id}' was not found.");
            }

            return analysis;
        }

        public async Task<Analysis> Analyze(int sessionId, int dataSetId, AnalysisRequest request)
        {
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

            await _ctx.SaveChangesAsync();

            return analysis;
        }

        public async Task ToggleVisibility(int id)
        {
            var analysis = await GetAnalysis(id);
            analysis.IsOpen = !analysis.IsOpen;
            await _ctx.SaveChangesAsync();
        }

        public async Task RemoveFromSession(int sessionId, int analysisId)
        {
            var session = await _sessions.GetAnalysisSession(sessionId);

            var analysis = session.Analyses.FirstOrDefault(a => a.Id == analysisId);

            if (analysis is null)
            {
                throw new ArgumentException($"Analysis with id '{analysisId}' doesn't exist in sesion with id '{sessionId}'.");
            }

            _ctx.Analyses.Remove(analysis);

            await _ctx.SaveChangesAsync();
        }

        private Network GetNetworkToAnalyze(AnalysisRequest request)
        {
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
    }
}