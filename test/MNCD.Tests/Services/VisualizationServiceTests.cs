using MNCD.Domain.Entities;
using MNCD.Services.Impl;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace MNCD.Tests.Services
{
    public class VisualizationServiceTests
    {
        private static string Url => "https://mncd-viz.azurewebsites.net/";
        private readonly VisualizationService _service = new VisualizationService(null, Url);

        [Fact]
        public async Task VisualizeMultilayer()
        {
            var edgeList = string.Join('\n', new string[]
            {
                "0 0 1 1 1",
                "# Actors",
                "0 a0",
                "1 a1",
                "# Layers",
                "0 l0",
                "1 l1"
            });

            var layouts = new List<VisualizationType>
            {
                VisualizationType.MultiLayerDiagonal
            };

            foreach (var layout in layouts)
            {
                var visualisation = await _service.VisualizeMultilayer(edgeList, layout);
                Assert.NotNull(visualisation);
            }
        }

        [Fact]
        public async Task VisualizeMultilayerCommunities()
        {
            var edgeList = string.Join('\n', new string[]
            {
                "0 0 1 1 1",
                "# Actors",
                "0 a0",
                "1 a1",
                "# Layers",
                "0 l0",
                "1 l1"
            });
            var communityList = string.Join('\n', new string[]
            {
                "0 0",
                "1 1",
                "# Actors",
                "0 a0",
                "1 a1",
                "# Communities",
                "0 c0",
                "1 c1"
            });
            var layouts = new List<VisualizationType>
            {
                VisualizationType.MultiLayerHairball
            };

            foreach (var layout in layouts)
            {
                var visualisation = await _service.VisualizeMultilayerCommunities(edgeList, communityList, layout);
                Assert.NotNull(visualisation);
            }
        }

        [Fact]
        public async Task VisualizeSingleLayerNetwork()
        {
            var edgeList = string.Join('\n', new string[]
            {
                "0 0 1 0 1",
                "0 0 2 0 1",
                "# Actors",
                "0 a0",
                "1 a1",
                "1 a2",
                "# Layers",
                "0 l0",
            });
            var layouts = new List<VisualizationType>
            {
                VisualizationType.SingleLayerLayoutCircular,
                VisualizationType.SingleLayerLayoutSpiral,
                VisualizationType.SingleLayerLayoutSpring
            };
            foreach (var layout in layouts)
            {
                var visualisation = await _service.VisualizeSingleLayer(edgeList, layout);
                Assert.NotNull(visualisation);
            }
        }

        [Fact]
        public async Task VisualizeSingleLayerNetworkCommunities()
        {
            var edgeList = string.Join('\n', new string[]
            {
                "0 0 1 0 1",
                "0 0 2 0 1",
                "# Actors",
                "0 a0",
                "1 a1",
                "1 a2",
                "# Layers",
                "0 l0",
            });
            var communityList = string.Join('\n', new string[]
            {
                "0 0",
                "1 1",
                "2 1",
                "# Actors",
                "0 a0",
                "1 a1",
                "2 a2",
                "# Communities",
                "0 c0",
                "1 c1"
            });
            var layouts = new List<VisualizationType>
            {
                VisualizationType.SingleLayerLayoutCircular,
                VisualizationType.SingleLayerLayoutSpiral,
                VisualizationType.SingleLayerLayoutSpring
            };
            foreach (var layout in layouts)
            {
                var visualisation = await _service.VisualizeSingleLayerCommunity(edgeList, communityList, layout);
                Assert.NotNull(visualisation);
            }
        }

        [Fact]
        public async Task VisualizeBarplot()
        {
            var x = new[] { 1, 2, 3, 4, 5 };
            var y = new[] { 1, 2, 3, 4, 5 };
            var labels = new[] { "a", "b", "c", "d", "e" };
            var xlabel = "foX";
            var ylabel = "foY";

            var visualization = await _service.VisualizeBarplot(x, y, labels, xlabel, ylabel, true);
            Assert.NotNull(visualization);
        }

        [Fact]
        public async Task VisualizeTreemap()
        {
            var sizes = new[] { 1, 2, 3, 4, 5 };
            var label = new[] { "a", "b", "c", "d", "e" };

            var visualization = await _service.VisualizeTreemap(sizes, label);
            Assert.NotNull(visualization);
        }
    }
}
