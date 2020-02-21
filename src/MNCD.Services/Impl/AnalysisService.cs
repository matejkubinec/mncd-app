using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MNCD.Core;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Services.AnalysisAlgorithms;
using MNCD.Services.Helpers;

namespace MNCD.Services.Impl
{
    public class AnalysisService : IAnalysisService
    {
        private static List<AnalysisAlgorithm> SingleLayerAlgorithms = new List<AnalysisAlgorithm>
        {
            AnalysisAlgorithm.FluidC,
            AnalysisAlgorithm.Louvain
        };

        private static List<AnalysisAlgorithm> MultiLayerAlgorithms = new List<AnalysisAlgorithm>
        {
        };

        private readonly MNCDContext _ctx;

        public AnalysisService(MNCDContext ctx)
        {
            _ctx = ctx;
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

        public Analysis Analyze(int sessionId, AnalysisRequest request)
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

            // TODO: switch to async
            _ctx.SaveChanges();

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
                return Louvain.Analyze(request, network);
            }

            throw new ArgumentException("Unsupported algorithm.");
        }

        private void ValidateSingleLayerAnalysis(AnalysisRequest request, Network network)
        {
            if (request.SelectedLayer > network.Layers.Count || request.SelectedLayer < 0)
            {
                throw new ArgumentOutOfRangeException("Selected layer must be greater than zero and not greater than number of layers in data set.");
            }

            if (!SingleLayerAlgorithms.Any(alg => alg == request.AnalysisAlgorithm))
            {
                throw new ArgumentException("A algorithm for single layer networks must be used.");
            }
        }
    }
}