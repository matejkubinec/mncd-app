using MNCD.Domain.DTO.Visualization;
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
            var types = new List<VisualizationType>
             {
                 VisualizationType.MultiLayer_Diagonal
             };
            foreach (var type in types)
            {
                var visualisation = await _service.VisualizeMultilayer(new MultilayerRequest
                {
                    EdgeList = edgeList,
                    Type = type
                });
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
            var types = new List<VisualizationType>
            {
                VisualizationType.MultiLayerHairball
            };
            foreach (var type in types)
            {
                var visualisation = await _service.VisualizeMultilayerCommunities(new MultilayerCommunitiesRequest
                {
                    EdgeList = edgeList,
                    CommunityList = communityList,
                    Type = type
                });
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
            var types = new List<VisualizationType>
             {
                 VisualizationType.SingleLayer_Circular,
                 VisualizationType.SingleLayer_Spiral,
                 VisualizationType.SingleLayer_Spring
             };
            foreach (var type in types)
            {
                var visualisation = await _service.VisualizeSingleLayer(new SingleLayerRequest
                {
                    EdgeList = edgeList,
                    Type = type
                });
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
            var types = new List<VisualizationType>
             {
                 VisualizationType.SingleLayer_Circular,
                 VisualizationType.SingleLayer_Spiral,
                 VisualizationType.SingleLayer_Spring
             };
            foreach (var type in types)
            {
                var visualisation = await _service.VisualizeSingleLayerCommunity(new SingleLayerCommunityRequest
                {
                    EdgeList = edgeList,
                    CommunityList = communityList,
                    Type = type
                });
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
            var visualization = await _service.VisualizeBarplot(new BarplotRequest<int, int>
            {
                X = x,
                Y = y,
                Labels = labels,
                XLabel = xlabel,
                YLabel = ylabel,
                Params = new BarplotRequestParameters
                {
                    ColorCommunities = true
                }
            });
            Assert.NotNull(visualization);
        }

        [Fact]
        public async Task VisualizeTreemap()
        {
            var sizes = new[] { 1, 2, 3, 4, 5 };
            var label = new[] { "a", "b", "c", "d", "e" };
            var visualization = await _service.VisualizeTreemap(new TreemapRequest<int>
            {
                Sizes = sizes,
                Label = label
            });
            Assert.NotNull(visualization);
        }
    }
}
