using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Services.Impl;
using MNCD.Tests.Helpers;
using System;
using System.Collections.Generic;
using Xunit;

namespace MNCD.Tests.Services
{
    public class AnalysisServiceTests
    {
        public AnalysisServiceTests()
        {

        }

        [Fact]
        public void GetAnalysisFound()
        {
            using (var ctx = SetupDB("GetAnalysisFound"))
            {
                var service = new AnalysisService(ctx, null);

                var analysis = service.GetAnalysis(1);

                Assert.NotNull(analysis);
            }
        }

        [Fact]
        public void GetAnalysisNotFound()
        {
            using (var ctx = SetupDB("GetAnalysisNotFound"))
            {
                var service = new AnalysisService(ctx, null);

                Assert.Throws<ApplicationException>(() => service.GetAnalysis(2));
            }
        }

        [Fact]
        public void ApplyFluidC()
        {
            using (var ctx = SetupDB("GetAnalysisNotFound"))
            {
                var service = new AnalysisService(ctx, null);
                var request = new AnalysisRequest()
                {
                    CreateDate = new DateTime(2020, 12, 01),
                    DataSet = DataSetHelper.LouvainTest,
                    SelectedLayer = 0,
                    Approach = AnalysisApproach.SingleLayerOnly,
                    AnalysisAlgorithm = AnalysisAlgorithm.FluidC,
                    AnalysisAlgorithmParameters = new Dictionary<string, string>()
                    {
                        { "k", "2" },
                        { "maxIterations", "100" },
                    },
                    FlattenningAlgorithm = FlattenningAlgorithm.BasicFlattening,
                    FlattenningAlgorithmParameters = new Dictionary<string, string>(),
                };
                var result = service.Analyze(1, request, false);
            }
        }

        private MNCDContext SetupDB(string databaseName)
        {
            var datasets = new List<NetworkDataSet>
            {
                DataSetHelper.Florentine,
                DataSetHelper.LouvainTest,
            };

            var requests = new List<AnalysisRequest>
            {
                new AnalysisRequest
                {
                    CreateDate = new DateTime(2020, 12, 01),
                    DataSet = DataSetHelper.Florentine,
                    SelectedLayer = 0,
                    Approach = AnalysisApproach.SingleLayerFlattening,
                    AnalysisAlgorithm = AnalysisAlgorithm.Louvain,
                    AnalysisAlgorithmParameters = new Dictionary<string, string>(),
                    FlattenningAlgorithm = FlattenningAlgorithm.BasicFlattening,
                    FlattenningAlgorithmParameters = new Dictionary<string, string>(),
                }
            };

            var analyses = new List<Analysis>
            {
                new Analysis
                {
                    Request = requests[0]
                }
            };

            var session = new AnalysisSession
            {
                Name = "LouvainSession"
            };

            var options = new DbContextOptionsBuilder<MNCDContext>()
                .UseInMemoryDatabase(databaseName)
                .Options;

            var ctx = new MNCDContext(options);
            ctx.AnalysisRequests.AddRange(requests);
            ctx.Analyses.AddRange(analyses);
            ctx.AnalysisSessions.Add(session);
            ctx.SaveChanges();

            return ctx;
        }
    }
}
