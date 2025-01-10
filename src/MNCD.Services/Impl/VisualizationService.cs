using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.DTO.Visualization;
using MNCD.Domain.Entities;
using MNCD.Domain.Exceptions;
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
        private readonly int MAX_RETRY = 5;
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

        public async Task<Visualization> GetDataSetVisualization(int dataSetId, VisualizationType type)
        {
            var dataSet = await _ctx.DataSets
                .Include(d => d.Visualizations)
                .FirstOrDefaultAsync(d => d.Id == dataSetId);

            if (dataSet is null)
            {
                // TODO: add message
                throw new NetworkDataSetNotFoundException(string.Empty);
            }

            return await GetVisualizationFromDataSet(dataSet, type);
        }

        public async Task<Visualization> GetAnalysisVisualization(int analysisId, VisualizationType type)
        {
            var analysis = await _ctx.Analyses
                .Include(a => a.Result)
                .Include(a => a.Request)
                .ThenInclude(r => r.DataSet)
                .ThenInclude(d => d.Visualizations)
                .Include(a => a.Visualizations)
                .FirstOrDefaultAsync(a => a.Id == analysisId);

            if (analysis is null)
            {
                throw new AnalysisNotFoundException($"Analysis with id '{analysisId} was not found.");
            }

            return await GetVisualizationFromAnalysis(analysis, type);
        }

        public async Task<Visualization> VisualizeMultilayer(MultilayerRequest request)
        {
            var json = JsonConvert.SerializeObject(request);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var message = string.Empty;
            var uri = $"{_baseUrl}/api/multi-layer";

            if (request.Type == VisualizationType.MultiLayer_Diagonal)
            {
                uri += "/diagonal";
            }
            else if (request.Type == VisualizationType.MultiLayer_Slices)
            {
                uri += "/slices";
            }
            else
            {
                message = $"Visualization type '{request.Type}' is not supported.";
                throw new NotSupportedException(message);
            }

            for (var i = 0; i < MAX_RETRY; i++)
            {
                var client = GetClient();
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
                    message = await HandleError(response);
                }
            }

            throw new ArgumentException(message);
        }

        public async Task<Visualization> VisualizeMultilayerCommunities(MultilayerCommunitiesRequest request)
        {
            var json = JsonConvert.SerializeObject(request);
            var message = string.Empty;
            var uri = $"{_baseUrl}/api/multi-layer/";

            if (request.Type == VisualizationType.MultiLayer_Hairball)
            {
                uri += "hairball";
            }
            else if (request.Type == VisualizationType.MultiLayer_Slices_Communities)
            {
                uri += "slices-communities";
            }
            else
            {
                message = $"Visualization type '{request.Type}' is not supported.";
                throw new NotSupportedException(message);
            }

            for (var i = 0; i < MAX_RETRY; i++)
            {
                var client = GetClient();
                var content = new StringContent(json, Encoding.UTF8, "application/json");
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
                    message = await HandleError(response);
                }
            }

            throw new ArgumentException(message);
        }

        public async Task<Visualization> VisualizeSingleLayer(SingleLayerRequest request)
        {
            var message = string.Empty;
            var json = JsonConvert.SerializeObject(request);
            var uri = $"{_baseUrl}/api/single-layer/network";

            for (var i = 0; i < MAX_RETRY; i++)
            {
                var client = GetClient();
                var content = new StringContent(json, Encoding.UTF8, "application/json");
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
                    message = await HandleError(response);
                }
            }

            throw new ArgumentException(message);
        }

        public async Task<Visualization> VisualizeSingleLayerCommunity(SingleLayerCommunityRequest request)
        {
            var message = string.Empty;
            var json = JsonConvert.SerializeObject(request);
            var uri = $"{_baseUrl}/api/single-layer/community";

            for (var i = 0; i < MAX_RETRY; i++)
            {
                var client = GetClient();
                var content = new StringContent(json, Encoding.UTF8, "application/json");
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
                    message = await HandleError(response);
                }
            }

            throw new ArgumentException(message);
        }

        public async Task<Visualization> VisualizeBarplot<R, T>(BarplotRequest<R, T> request)
        {
            var message = string.Empty;
            var json = JsonConvert.SerializeObject(request);
            var uri = $"{_baseUrl}/api/common-charts/barplot";

            for (var i = 0; i < MAX_RETRY; i++)
            {
                var client = GetClient();
                var content = new StringContent(json, Encoding.UTF8, "application/json");
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
                    message = await HandleError(response);
                }
            }

            throw new ArgumentException(message);
        }

        public async Task<Visualization> VisualizeTreemap<T>(TreemapRequest<T> request)
        {
            var message = string.Empty;
            var json = JsonConvert.SerializeObject(request);
            var uri = $"{_baseUrl}/api/common-charts/treemap";

            for (var i = 0; i < MAX_RETRY; i++)
            {
                var client = GetClient();
                var content = new StringContent(json, Encoding.UTF8, "application/json");
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
                    message = await HandleError(response);
                }
            }

            throw new ArgumentException(message);
        }

        private async Task<Visualization> GetVisualizationFromAnalysis(Analysis analysis, VisualizationType type)
        {
            var viz = analysis.Visualizations.FirstOrDefault(a => a.Type == type);
            if (viz is null)
            {
                if (type.IsMultiLayer())
                {
                    if (type == VisualizationType.MultiLayer_Diagonal || type == VisualizationType.MultiLayer_Slices)
                    {
                        viz = analysis.Request.DataSet.Visualizations.FirstOrDefault(v => v.Type == type);

                        if (viz is null)
                        {
                            viz = await VisualizeMultilayer(new MultilayerRequest
                            {
                                EdgeList = analysis.Request.DataSet.EdgeList,
                                Type = type
                            });
                            analysis.Request.DataSet.Visualizations.Add(viz);
                        }
                    }
                    else
                    {
                        viz = await VisualizeMultilayer(new MultilayerRequest
                        {
                            EdgeList = analysis.Request.DataSet.EdgeList,
                            Type = type
                        });
                    }
                }
                else if (type.IsMultiLayerCommunities())
                {
                    var request = new MultilayerCommunitiesRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        CommunityList = analysis.Result.CommunityList,
                        Type = type
                    };
                    viz = await VisualizeMultilayerCommunities(request);
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
                    var request = new BarplotRequest<int, int>
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
                    };
                    viz = await VisualizeBarplot(request);
                    viz.Title = "Communities Count - Barplot";
                }
                else if (type == VisualizationType.Treemap)
                {
                    var communities = analysis.Result.ActorToCommunity.Values
                        .Distinct()
                        .OrderByDescending(c => c);
                    var communitiesCount = communities
                        .Select(c => analysis.Result.ActorToCommunity.Where(a => a.Value == c)
                        .Count());
                    var request = new TreemapRequest<int>
                    {
                        Label = communities.Select(c => "C" + c),
                        Sizes = communitiesCount,
                        Type = type
                    };
                    viz = await VisualizeTreemap(request);
                    viz.Title = "Communities Count - Treemap";
                }
                else if (type == VisualizationType.MultiLayer_Slices)
                {
                    var request = new MultilayerRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        Type = type
                    };
                    viz = await VisualizeMultilayer(request);
                }
                else if (type == VisualizationType.MultiLayer_Slices_Communities)
                {
                    var request = new MultilayerCommunitiesRequest
                    {
                        EdgeList = analysis.Request.DataSet.EdgeList,
                        CommunityList = analysis.Result.CommunityList,
                        Type = type
                    };
                    viz = await VisualizeMultilayerCommunities(request);
                }

                if (type != VisualizationType.MultiLayer_Diagonal && type != VisualizationType.MultiLayer_Slices)
                {
                    analysis.Visualizations.Add(viz);
                }

                await _ctx.SaveChangesAsync();
            }
            return viz;
        }

        private async Task<Visualization> GetVisualizationFromDataSet(
            NetworkDataSet dataSet,
            VisualizationType type)
        {
            if (type == VisualizationType.MultiLayer_Diagonal)
            {
                var diagonal = dataSet.Visualizations
                    .FirstOrDefault(v => v.Type == VisualizationType.MultiLayer_Diagonal);

                if (diagonal is null)
                {
                    var request = new MultilayerRequest
                    {
                        EdgeList = dataSet.EdgeList,
                        Type = VisualizationType.MultiLayer_Diagonal
                    };
                    diagonal = await VisualizeMultilayer(request);
                    dataSet.Visualizations.Add(diagonal);
                    await _ctx.SaveChangesAsync();
                }

                return diagonal;
            }
            else if (type == VisualizationType.MultiLayer_Slices)
            {
                var slices = dataSet.Visualizations
                    .FirstOrDefault(v => v.Type == VisualizationType.MultiLayer_Slices);

                if (slices is null)
                {
                    var request = new MultilayerRequest
                    {
                        EdgeList = dataSet.EdgeList,
                        Type = VisualizationType.MultiLayer_Slices
                    };
                    slices = await VisualizeMultilayer(request);
                    dataSet.Visualizations.Add(slices);
                    await _ctx.SaveChangesAsync();
                }

                return slices;
            }

            throw new NotSupportedException($"Visualization type '{type}' is not supported for datasets.");
        }

        private HttpClient GetClient()
        {
            return new HttpClient
            {
                Timeout = TimeSpan.FromMinutes(5)
            };
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

        private class ErrorResponse
        {
            public List<string> Errors { get; set; }
        }
    }
}
