using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using MNCD.Core;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Services.Helpers;

namespace MNCD.Services.Impl
{
    public class AnalysisService : IAnalysisService
    {
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

        public void Analyze(AnalysisRequest request)
        {
            var dataSet = _ctx.DataSets.FirstOrDefault(d => d.Id == request.Id);

            if (dataSet == null)
            {
                throw new ApplicationException("Dataset was not found.");
            }

            var network = NetworkReaderHelper.ReadDataSet(dataSet);
            var networkToAnalyze = network;

            if (request.Approach == AnalysisApproach.SingleLayerOnly)
            {
                if (request.SelectedLayer > network.Layers.Count || request.SelectedLayer < 0)
                {
                    throw new ApplicationException("Selected layer must be greater than zero and not greater than number of layers in data set.");
                }

                var selectedLayer = network.Layers[request.SelectedLayer];
                networkToAnalyze = new Network
                {
                    Actors = network.Actors,
                    Layers = new List<Layer>
                    {
                        selectedLayer
                    }
                };
            }

            if (request.AnalysisAlgorithm == AnalysisAlgorithm.Louvain)
            {
                // TODO: compute and validate arguments
            }
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
    }
}