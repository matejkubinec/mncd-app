using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Services.Impl;
using MNCD.Tests.Helpers;
using System;
using System.Collections.Generic;
using Xunit;
using System.Threading;
using System.Threading.Tasks;

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
                var service = new AnalysisService(ctx);

                var analysis = service.GetAnalysis(1);

                Assert.NotNull(analysis);
            }
        }

        [Fact]
        public void GetAnalysisNotFound()
        {
            using (var ctx = SetupDB("GetAnalysisNotFound"))
            {
                var service = new AnalysisService(ctx);

                Assert.Throws<ApplicationException>(() => service.GetAnalysis(2));
            }
        }

        private MNCDContext SetupDB(string databaseName)
        {
            var requests = new List<AnalysisRequest>
            {
                new AnalysisRequest
                {
                    CreateDate = new DateTime(2020, 12, 01),
                    Dataset = DataSetHelper.Florentine,
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
                    Order = 1,
                    Request = requests[0]
                }
            };

            var options = new DbContextOptionsBuilder<MNCDContext>()
                .UseInMemoryDatabase(databaseName)
                .Options;

            var ctx = new MNCDContext(options);
            ctx.AnalysisRequests.AddRange(requests);
            ctx.Analyses.AddRange(analyses);
            ctx.SaveChanges();

            return ctx;
        }
    }
}
