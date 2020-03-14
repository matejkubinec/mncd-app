using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MNCD.Services.Impl
{
    public class VisualizationService : IVisualizationService
    {
        private readonly MNCDContext _ctx;
        private readonly string _baseUrl;

        public VisualizationService(MNCDContext ctx, string baseUrl)
        {
            _ctx = ctx;
            _baseUrl = baseUrl;
        }

        public async Task<Visualization> GetVisualization(int id)
        {
            var visualization = await _ctx.Visualizations.FindAsync(id);

            if (visualization is null)
            {
                // TODO: custom exception
                throw new ArgumentException($"Visualization with id '{id}' was not found.");
            }

            return visualization;
        }

        public async Task<Visualization> VisualizeMultilayer(string edgeList, VisualizationType type)
        {
            var client = new HttpClient();
            var request = new VisualizeMultilayerRequest
            {
                EdgeList = edgeList
            };
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/multi-layer/diagonal";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Title = "Diagonal Layout",
                    Type = type,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeMultilayerCommunities(string edgeList, string communityList, VisualizationType type)
        {
            var client = new HttpClient();
            var request = new VisualizeMultilayerCommunitiesRequest
            {
                EdgeList = edgeList,
                CommunityList = communityList
            };
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/multi-layer/hairball";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Title = "Hairball Layout",
                    Type = type,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeSingleLayer(string edgeList, VisualizationType type)
        {
            var client = new HttpClient();
            var request = new VisualizeSingleLayerRequest
            {
                EdgeList = edgeList,
                Layout = LayoutToString(type)
            };
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/single-layer/network";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Title = LayoutToTitle(type),
                    Type = type,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeSingleLayerCommunity(string edgeList, string communityList, VisualizationType type)
        {
            var client = new HttpClient();
            var request = new VisualizeSingleLayerCommunityRequest
            {
                EdgeList = edgeList,
                CommunityList = communityList,
                Layout = LayoutToString(type)
            };
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/single-layer/community";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Title = LayoutToTitle(type),
                    Type = type,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeBarplot<R, T>(IEnumerable<R> x, IEnumerable<T> y, IEnumerable<string> labels, string xlabel, string ylabel, bool visualizeCommunities)
        {
            var client = new HttpClient();
            var request = new BarplotRequest<R, T>
            {
                X = x,
                Y = y,
                Labels = labels,
                XLabel = xlabel,
                YLabel = ylabel,
                Params = new BarplotRequestParameters
                {
                    ColorCommunities = visualizeCommunities
                }
            };
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/common-charts/barplot";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Type = VisualizationType.Barplot,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeTreemap<T>(IEnumerable<T> sizes, IEnumerable<string> label)
        {
            var client = new HttpClient();
            var request = new Treemap<T>
            {
                Sizes = sizes,
                Label = label
            };
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/common-charts/treemap";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Type = VisualizationType.Treemap,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        private async Task<string> HandleError(HttpResponseMessage response)
        {
            if (response.StatusCode == HttpStatusCode.BadRequest)
            {
                var responseDataJson = await response.Content.ReadAsStringAsync();
                var responseData = JsonConvert.DeserializeObject<ErrorResponse>(responseDataJson);
                var errorMessage = "Invalid request, errors: \n" + string.Join('\n', responseData.Errors);
                return errorMessage;
            }
            else
            {
                var errorMessage = await response.Content.ReadAsStringAsync();
                return errorMessage;
            }
        }

        private string LayoutToString(VisualizationType layout)
        {
            return layout switch
            {
                VisualizationType.SingleLayerLayoutCircular => "circular",
                VisualizationType.SingleLayerLayoutSpiral => "spiral",
                VisualizationType.SingleLayerLayoutSpring => "spring",
                _ => throw new ArgumentException("Unsupported layout.")
            };
        }

        private string LayoutToTitle(VisualizationType layout)
        {
            return layout switch
            {
                VisualizationType.SingleLayerLayoutCircular => "Circular Layout",
                VisualizationType.SingleLayerLayoutSpiral => "Spiral Layout",
                VisualizationType.SingleLayerLayoutSpring => "Spring Layout",
                _ => throw new ArgumentException("Unsupported layout.")
            };
        }

        private class VisualizeMultilayerRequest
        {
            [JsonProperty("edge_list")]
            public string EdgeList { get; set; }
        }

        private class VisualizeMultilayerCommunitiesRequest
        {
            [JsonProperty("edge_list")]
            public string EdgeList { get; set; }

            [JsonProperty("community_list")]
            public string CommunityList { get; set; }
        }

        private class VisualizeSingleLayerRequest
        {
            [JsonProperty("edge_list")]
            public string EdgeList { get; set; }

            [JsonProperty("layout")]
            public string Layout { get; set; }
        }

        private class VisualizeSingleLayerCommunityRequest
        {
            [JsonProperty("edge_list")]
            public string EdgeList { get; set; }

            [JsonProperty("community_list")]
            public string CommunityList { get; set; }

            [JsonProperty("layout")]
            public string Layout { get; set; }
        }

        private class BarplotRequest<R, T>
        {
            [JsonProperty("x")]
            public IEnumerable<R> X { get; set; }

            [JsonProperty("y")]
            public IEnumerable<T> Y { get; set; }

            [JsonProperty("labels")]
            public IEnumerable<string> Labels { get; set; }

            [JsonProperty("xlabel")]
            public string XLabel { get; set; }

            [JsonProperty("ylabel")]
            public string YLabel { get; set; }

            [JsonProperty("params")]
            public BarplotRequestParameters Params { get; set; }
        }

        private class BarplotRequestParameters
        {
            [JsonProperty("color_communities")]
            public bool ColorCommunities { get; set; }
        }

        private class Treemap<T>
        {
            [JsonProperty("sizes")]
            public IEnumerable<T> Sizes { get; set; }

            [JsonProperty("label")]
            public IEnumerable<string> Label { get; set; }
        }

        private class ErrorResponse
        {
            public List<string> Errors { get; set; }
        }
    }
}
