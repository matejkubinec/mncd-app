using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Services.Impl;
using MNCD.Tests.Helpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace MNCD.Tests.Services
{
    public class AnalysisServiceTests
    {
        private static IAnalysisService _service = null;

        public AnalysisServiceTests()
        {
        }

        [Fact]
        public async Task GetAnalysisFound()
        {
            var service = SetupService();
            Assert.NotNull(await service.GetAnalysis(1));
        }

        [Fact]
        public async Task GetAnalysisNotFound()
        {
            var service = SetupService();
            await Assert.ThrowsAsync<ArgumentException>(async () => await service.GetAnalysis(404));
        }

        [Fact]
        public async Task ApplyFluidC()
        {
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
                FlatteningAlgorithm = FlatteningAlgorithm.BasicFlattening,
                FlatteningAlgorithmParameters = new Dictionary<string, string>(),
            };
            var service = SetupService();
            var analysis = await service.Analyze(1, 1, request);

            Assert.NotNull(analysis);
            Assert.NotNull(analysis.Result);
            Assert.NotNull(analysis.Request);
        }

        private static IAnalysisService SetupService()
        {
            if (_service is null)
            {
                var ctx = SetupDB(nameof(AnalysisServiceTests));
                var data = new NetworkDataSetService(ctx, new HashService(), new ReaderService());
                var session = new AnalysisSessionService(ctx);
                _service = new AnalysisService(ctx, data, session);
            }

            return _service;
        }

        private static MNCDContext SetupDB(string dbName)
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
                    FlatteningAlgorithm = FlatteningAlgorithm.BasicFlattening,
                    FlatteningAlgorithmParameters = new Dictionary<string, string>(),
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
                Name = "AnalysisSession"
            };

            var options = new DbContextOptionsBuilder<MNCDContext>()
                .UseInMemoryDatabase(databaseName: dbName)
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
