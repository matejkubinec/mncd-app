using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
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
        public AnalysisServiceTests()
        {
        }

        [Fact]
        public async Task GetAnalysisFound()
        {
            var analysis = await InitService("GetAnalysisFound").GetAnalysis(1);

            Assert.NotNull(analysis);
        }

        [Fact]
        public async Task GetAnalysisNotFound()
        {
            await Assert.ThrowsAsync<ArgumentException>(async () => await InitService("GetAnalysisNotFound").GetAnalysis(2));
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
                FlattenningAlgorithm = FlattenningAlgorithm.BasicFlattening,
                FlattenningAlgorithmParameters = new Dictionary<string, string>(),
            };
            var result = await InitService("ApplyFluidC").Analyze(1, 1, request, false);
        }

        private AnalysisService InitService(string dbName)
        {
            var ctx = SetupDB(dbName);
            var data = new NetworkDataSetService(ctx, new HashService(), new ReaderService(), null);
            var session = new AnalysisSessionService(ctx);
            return new AnalysisService(ctx, null, data, session);
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
                Name = "AnalysisSession"
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
