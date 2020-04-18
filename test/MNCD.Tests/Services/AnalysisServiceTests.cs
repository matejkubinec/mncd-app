using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Exceptions;
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
        [Fact]
        public async Task GetAnalysesForSession_InvalidSessionId()
        {
            using (var ctx = InitCtx(nameof(GetAnalysesForSession_InvalidSessionId)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.GetAnalysesForSession(-1));
                await Assert.ThrowsAsync<ArgumentException>(() => service.GetAnalysesForSession(0));
            }
        }

        [Fact]
        public async Task GetAnalysesForSession_SessionNotFound()
        {
            using (var ctx = InitCtx(nameof(GetAnalysesForSession_SessionNotFound)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<AnalysisSessionNotFoundException>(() => service.GetAnalysesForSession(404));
            }
        }


        [Fact]
        public async Task GetAnalysesForSession_Valid()
        {
            using (var ctx = InitCtx(nameof(GetAnalysesForSession_Valid)))
            {
                var service = InitService(ctx);
                var analyses = await service.GetAnalysesForSession(1);

                Assert.Collection(analyses, a => Assert.Equal(1, a.Id));
            }
        }

        [Fact]
        public async Task GetAnalysis_InvalidId()
        {
            using (var ctx = InitCtx(nameof(GetAnalysis_InvalidId)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.GetAnalysis(-1));
                await Assert.ThrowsAsync<ArgumentException>(() => service.GetAnalysis(0));
            }
        }

        [Fact]
        public async Task GetAnalysis_NotFound()
        {
            using (var ctx = InitCtx(nameof(GetAnalysis_NotFound)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<AnalysisNotFoundException>(() => service.GetAnalysis(404));
            }
        }

        [Fact]
        public async Task GetAnalysis_Valid()
        {
            using (var ctx = InitCtx(nameof(GetAnalysis_Valid)))
            {
                var service = InitService(ctx);
                var analysis = await service.GetAnalysis(1);

                Assert.Equal(1, analysis.Id);
            }
        }

        [Fact]
        public async Task Analyze_RequestNull()
        {
            using (var ctx = InitCtx(nameof(Analyze_RequestNull)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentNullException>(() => service.Analyze(1, 1, null));
            }
        }

        [Fact]
        public async Task Analyze_SessionIdInvalid()
        {
            using (var ctx = InitCtx(nameof(Analyze_SessionIdInvalid)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.Analyze(-1, 1, new AnalysisRequest()));
                await Assert.ThrowsAsync<ArgumentException>(() => service.Analyze(0, 1, new AnalysisRequest()));
            }
        }

        [Fact]
        public async Task Analyze_DataSetId()
        {
            using (var ctx = InitCtx(nameof(Analyze_DataSetId)))
            {
                var service = InitService(ctx);
                await Assert.ThrowsAsync<ArgumentException>(() => service.Analyze(1, -1, new AnalysisRequest()));
                await Assert.ThrowsAsync<ArgumentException>(() => service.Analyze(1, 0, new AnalysisRequest()));
            }
        }

        [Fact]
        public async Task Analyze_SingleLayerOnly_FluidC()
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

            using (var ctx = InitCtx(nameof(Analyze_SingleLayerOnly_FluidC)))
            {
                var service = InitService(ctx);
                var analysis = await service.Analyze(1, 1, request);

                Assert.NotNull(analysis);
                Assert.NotNull(analysis.Result);
                Assert.NotNull(analysis.Request);
            }
        }

        [Fact]
        public async Task Analyze_SingleLayerOnly_Louvain()
        {
            var request = new AnalysisRequest()
            {
                CreateDate = new DateTime(2020, 12, 01),
                DataSet = DataSetHelper.LouvainTest,
                SelectedLayer = 0,
                Approach = AnalysisApproach.SingleLayerOnly,
                AnalysisAlgorithm = AnalysisAlgorithm.Louvain,
                AnalysisAlgorithmParameters = new Dictionary<string, string>(),
                FlatteningAlgorithm = FlatteningAlgorithm.BasicFlattening,
                FlatteningAlgorithmParameters = new Dictionary<string, string>(),
            };

            using (var ctx = InitCtx(nameof(Analyze_SingleLayerOnly_Louvain)))
            {
                var service = InitService(ctx);
                var analysis = await service.Analyze(1, 1, request);

                Assert.NotNull(analysis);
                Assert.NotNull(analysis.Result);
                Assert.NotNull(analysis.Request);
            }
        }

        public async Task Analyze_MultiLayer_CLECC()
        {
            var request = new AnalysisRequest()
            {
                CreateDate = new DateTime(2020, 12, 01),
                DataSet = DataSetHelper.Florentine,
                SelectedLayer = 0,
                Approach = AnalysisApproach.MultiLayer,
                AnalysisAlgorithm = AnalysisAlgorithm.CLECC,
                AnalysisAlgorithmParameters = new Dictionary<string, string>()
                {
                    { "k", "2" },
                    { "alpha", "1" },
                },
                FlatteningAlgorithm = FlatteningAlgorithm.BasicFlattening,
                FlatteningAlgorithmParameters = new Dictionary<string, string>(),
            };

            using (var ctx = InitCtx(nameof(Analyze_MultiLayer_CLECC)))
            {
                var service = InitService(ctx);
                var analysis = await service.Analyze(1, 1, request);

                Assert.NotNull(analysis);
                Assert.NotNull(analysis.Result);
                Assert.NotNull(analysis.Request);
            }
        }

        private static IAnalysisService InitService(MNCDContext ctx)
        {
            var data = new NetworkDataSetService(ctx, new HashService(), new ReaderService());
            var session = new AnalysisSessionService(ctx);
            return new AnalysisService(ctx, data, session);
        }

        private MNCDContext InitCtx(string dbName)
        {
            var options = new DbContextOptionsBuilder<MNCDContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;

            var ctx = new MNCDContext(options);

            var datasets = new List<NetworkDataSet>
            {
                DataSetHelper.Florentine,
                DataSetHelper.LouvainTest,
            };

            ctx.DataSets.AddRange(datasets);
            ctx.SaveChanges();

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

            ctx.Analyses.AddRange(analyses);
            ctx.SaveChanges();

            var session = new AnalysisSession
            {
                Name = "AnalysisSession",
                Analyses = analyses,
            };

            ctx.AnalysisSessions.Add(session);
            ctx.SaveChanges();

            return new MNCDContext(options);
        }
    }
}
