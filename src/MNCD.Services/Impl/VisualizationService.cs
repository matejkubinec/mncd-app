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
            var client = new HttpClient();
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
            var client = new HttpClient();
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
            var client = new HttpClient();
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
            var client = new HttpClient();
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
            var client = new HttpClient();
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
            var client = new HttpClient();
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

        private async Task<Visualization> GetVisualizationFromAnalysis(Analysis analysis, VisualizationType type)
        {
            if (type.IsMultiLayer())
            {
                var viz = analysis.MultiLayer.FirstOrDefault(a => a.Type == type);
                if (viz == null)
                {
                    viz = await VisualizeMultilayer(new MultilayerRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        Type = type
                    });
                    analysis.MultiLayer.Add(viz);
                    await _ctx.SaveChangesAsync();
                }
                return viz;
            }
            else if (type.IsMultiLayerCommunities())
            {
                var viz = analysis.MultiLayerCommunities.FirstOrDefault(a => a.Type == type);
                if (viz == null)
                {
                    viz = await VisualizeMultilayerCommunities(new MultilayerCommunitiesRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        CommunityList = analysis.Result.CommunityList,
                        Type = type
                    });
                    analysis.MultiLayerCommunities.Add(viz);
                    await _ctx.SaveChangesAsync();
                }
                return viz;
            }
            else if (type.IsSingleLayer())
            {
                var viz = analysis.SingleLayer.FirstOrDefault(a => a.Type == type);
                if (viz == null)
                {
                    viz = await VisualizeSingleLayer(new SingleLayerRequest
                    {
                        EdgeList = analysis.Result.AnalyzedNetworkEdgeList,
                        Type = type
                    });
                    analysis.SingleLayer.Add(viz);
                    await _ctx.SaveChangesAsync();
                }
                return viz;
            }
            else if (type.IsSingleLayerCommunities())
            {
                var viz = analysis.SingleLayerCommunities.FirstOrDefault(a => a.Type == type);
                if (viz == null)
                {
                    viz = await VisualizeSingleLayerCommunity(new SingleLayerCommunityRequest
                    {
                        EdgeList = analysis.Result.AnalyzedNetworkEdgeList,
                        CommunityList = analysis.Result.CommunityList,
                        Type = type
                    });
                    analysis.SingleLayerCommunities.Add(viz);
                    await _ctx.SaveChangesAsync();
                }
                return viz;
            }
            else if (type == VisualizationType.Barplot)
            {
                var viz = analysis.CommunitiesBarplot;
                if (viz == null)
                {
                    var communities = analysis.Result.ActorToCommunity.Values.Distinct().OrderByDescending(c => c);
                    var communitiesCount = communities.Select(c => analysis.Result.ActorToCommunity.Where(a => a.Value == c).Count());
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
                    analysis.CommunitiesBarplot = viz;
                    await _ctx.SaveChangesAsync();
                }
                return viz;
            }
            else if (type == VisualizationType.Treemap)
            {
                var viz = analysis.CommunitiesTreemap;
                if (viz == null)
                {
                    var communities = analysis.Result.ActorToCommunity.Values.Distinct().OrderByDescending(c => c);
                    var communitiesCount = communities.Select(c => analysis.Result.ActorToCommunity.Where(a => a.Value == c).Count());
                    viz = await VisualizeTreemap(new TreemapRequest<int>
                    {
                        Label = communities.Select(c => "C" + c),
                        Sizes = communitiesCount,
                        Type = type
                    });
                    analysis.CommunitiesTreemap = viz;
                    await _ctx.SaveChangesAsync();
                }
                return viz;
            }
            return null;
        }

        private class ErrorResponse
        {
            public List<string> Errors { get; set; }
        }
    }
}
