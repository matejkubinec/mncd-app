using MNCD.Domain.Entities;
using MNCD.Services.Impl;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace MNCD.Tests.Services
{
    public class VisualizationServiceTests
    {
        private readonly VisualizationService _service = new VisualizationService(null, "http://127.0.0.1:5000");


        [Fact(Skip = "Local testing only")]
        public async Task VisualizeMultilayer()
        {
            var edgeList = "0 l1 1 l1 1\n1 l1 2 l2 1\n2 l1 0 l2 1";
            var layouts = new List<MultiLayerLayout>
            {
                MultiLayerLayout.Diagonal
            };

            foreach (var layout in layouts)
            {
                var visualisation = await _service.VisualizeMultilayer(edgeList, layout);

                Assert.NotNull(visualisation);
            }
        }

        [Fact(Skip = "Local testing only")]
        public async Task VisualizeMultilayerCommunities()
        {
            var edgeList = "0 l1 1 l1 1\n1 l1 2 l2 1\n2 l1 0 l2 1";
            var communityList = "0 1\n1 1\n2 2";
            var layouts = new List<MultiLayerCommunitiesLayout>
            {
                MultiLayerCommunitiesLayout.Hairball
            };

            foreach (var layout in layouts)
            {
                var visualisation = await _service.VisualizeMultilayerCommunities(edgeList, communityList, layout);

                Assert.NotNull(visualisation);
            }
        }

        [Fact(Skip = "Local testing only")]
        public async Task VisualizeSingleLayerNetwork()
        {
            var edgeList = "0 1\n1 2\n2 0";
            var layouts = new List<SingleLayerLayout>
            {
                SingleLayerLayout.Circular,
                SingleLayerLayout.Spiral,
                SingleLayerLayout.Spring
            };

            foreach (var layout in layouts)
            {
                var visualisation = await _service.VisualizeSingleLayer(edgeList, layout);

                Assert.NotNull(visualisation);
            }
        }

        [Fact(Skip = "Local testing only")]
        public async Task VisualizeSingleLayerNetworkCommunities()
        {
            var edgeList = "0 1\n1 2\n2 0";
            var communityList = "0 1\n1 1\n2 2";
            var layouts = new List<SingleLayerLayout>
            {
                SingleLayerLayout.Circular,
                SingleLayerLayout.Spiral,
                SingleLayerLayout.Spring
            };

            foreach (var layout in layouts)
            {
                var visualisation = await _service.VisualizeSingleLayerCommunity(edgeList, communityList, layout);

                Assert.NotNull(visualisation);
            }
        }

        [Fact(Skip = "Local testing only")]
        public async Task VisualizeBarplot()
        {
            var x = new[] { 1, 2, 3, 4, 5 };
            var y = new[] { 1, 2, 3, 4, 5 };
            var labels = new[] { "a", "b", "c", "d", "e" };
            var xlabel = "foX";
            var ylabel = "foY";

            var visualization = await _service.VisualizeBarplot(x, y, labels, xlabel, ylabel);

            Assert.NotNull(visualization);
        }

        [Fact(Skip = "Local testing only")]
        public async Task VisualizeTreemap()
        {
            var sizes = new[] { 1, 2, 3, 4, 5 };
            var label = new[] { "a", "b", "c", "d", "e" };

            var visualization = await _service.VisualizeTreemap(sizes, label);

            Assert.NotNull(visualization);
        }
    }
}
