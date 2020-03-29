using MNCD.Data;
using MNCD.Domain.DTO.Visualization;
using MNCD.Domain.Entities;
using MNCD.Domain.Extensions;
using MNCD.Domain.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace MNCD.Services.Impl
{
    public class VisualizationService : IVisualizationService
    {
        private readonly MNCDContext _ctx;
        private readonly IAnalysisService _analysisService;
        private readonly string _baseUrl;

        public VisualizationService(MNCDContext ctx, IAnalysisService analysisService, string baseUrl)
        {
            _ctx = ctx;
            _analysisService = analysisService;
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

        public async Task<Visualization> GetVisualization(int analysisId, VisualizationType type)
        {
            var analysis = await _analysisService.GetAnalysis(analysisId);
            return await GetVisualizationFromAnalysis(analysis, type);
        }

        public async Task<Visualization> VisualizeMultilayer(MultilayerRequest request)
        {
            var client = GetClient();
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/multi-layer/diagonal";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Title = request.Type.ToTitle(),
                    Type = request.Type,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeMultilayerCommunities(MultilayerCommunitiesRequest request)
        {
            var client = GetClient();
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/multi-layer/hairball";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Title = request.Type.ToTitle(),
                    Type = request.Type,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeSingleLayer(SingleLayerRequest request)
        {
            var client = GetClient();
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/single-layer/network";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Title = request.Type.ToTitle(),
                    Type = request.Type,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeSingleLayerCommunity(SingleLayerCommunityRequest request)
        {
            var client = GetClient();
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/single-layer/community";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Title = request.Type.ToTitle(),
                    Type = request.Type,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeBarplot<R, T>(BarplotRequest<R, T> request)
        {
            var client = GetClient();
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

        public async Task<Visualization> VisualizeTreemap<T>(TreemapRequest<T> request)
        {
            var client = GetClient();
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

        public async Task<Visualization> VisualizeSlices(SlicesRequest request)
        {
            var client = GetClient();
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/multi-layer/slices";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Type = VisualizationType.MultiLayerSlices,
                    SvgImage = svg
                };
            }
            else
            {
                var message = await HandleError(response);
                throw new ArgumentException(message);
            }
        }

        public async Task<Visualization> VisualizeSlicesCommunities(SlicesCommunitiesRequest request)
        {
            var client = GetClient();
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var uri = _baseUrl + "/api/multi-layer/slices-communities";
            var response = await client.PostAsync(uri, content);

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return new Visualization
                {
                    Type = VisualizationType.MultiLayerSlicesCommunities,
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

        private async Task<Visualization> GetVisualizationFromAnalysis(Analysis analysis, VisualizationType type)
        {
            var viz = analysis.Visualizations.FirstOrDefault(a => a.Type == type);
            if (viz == null)
            {
                if (type.IsMultiLayer())
                {
                    viz = await VisualizeMultilayer(new MultilayerRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        Type = type
                    });
                }
                else if (type.IsMultiLayerCommunities())
                {
                    viz = await VisualizeMultilayerCommunities(new MultilayerCommunitiesRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        CommunityList = analysis.Result.CommunityList,
                        Type = type
                    });
                }
                else if (type.IsSingleLayer())
                {
                    viz = await VisualizeSingleLayer(new SingleLayerRequest
                    {
                        EdgeList = analysis.Result.AnalyzedNetworkEdgeList,
                        Type = type
                    });
                }
                else if (type.IsSingleLayerCommunities())
                {
                    viz = await VisualizeSingleLayerCommunity(new SingleLayerCommunityRequest
                    {
                        EdgeList = analysis.Result.AnalyzedNetworkEdgeList,
                        CommunityList = analysis.Result.CommunityList,
                        Type = type
                    });
                }
                else if (type == VisualizationType.Barplot)
                {
                    var communities = analysis.Result.ActorToCommunity.Values
                        .Distinct()
                        .OrderBy(c => c);
                    var communitiesCount = communities
                        .Select(c => analysis.Result.ActorToCommunity.Where(a => a.Value == c).Count());
                    viz = await VisualizeBarplot(new BarplotRequest<int, int>
                    {
                        X = communities,
                        Y = communitiesCount,
                        Labels = communities.Select(c => "C" + c),
                        XLabel = "Community",
                        YLabel = "Actor Count",
                        Params = new BarplotRequestParameters
                        {
                            ColorCommunities = true
                        }
                    });
                }
                else if (type == VisualizationType.Treemap)
                {
                    var communities = analysis.Result.ActorToCommunity.Values.Distinct().OrderByDescending(c => c);
                    var communitiesCount = communities.Select(c => analysis.Result.ActorToCommunity.Where(a => a.Value == c).Count());
                    viz = await VisualizeTreemap(new TreemapRequest<int>
                    {
                        Label = communities.Select(c => "C" + c),
                        Sizes = communitiesCount,
                        Type = type
                    });
                }
                else if (type == VisualizationType.MultiLayerSlices)
                {
                    viz = await VisualizeSlices(new SlicesRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        Type = type
                    });
                }
                else if (type == VisualizationType.MultiLayerSlicesCommunities)
                {
                    viz = await VisualizeSlicesCommunities(new SlicesCommunitiesRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        CommunityList = analysis.Result.CommunityList,
                        Type = type
                    });
                }

                analysis.Visualizations.Add(viz);
                await _ctx.SaveChangesAsync();
            }
            return viz;
        }

        private HttpClient GetClient()
        {
            return new HttpClient
            {
                Timeout = TimeSpan.FromMinutes(5)
            };
        }

        private class ErrorResponse
        {
            public List<string> Errors { get; set; }
        }
    }
}
