using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.DTO.Visualization;
using MNCD.Domain.Entities;
using MNCD.Domain.Exceptions;
using MNCD.Domain.Extensions;
using MNCD.Domain.Services;
using MNCD.Services.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MNCD.Services.Impl
{
    public class VisualizationService : IVisualizationService
    {
        private readonly static Semaphore semaphore = new(1, 1);
        private readonly MNCDContext _ctx;
        private readonly string _baseUrl;

        public VisualizationService(MNCDContext ctx, string baseUrl)
        {
            _ctx = ctx;
            _baseUrl = baseUrl;
        }

        public string GetUrl()
        {
            return _baseUrl;
        }

        public async Task<bool> IsAvailable()
        {
            try
            {
                using var client = GetClient();
                var res = await client.GetAsync(_baseUrl);
                return res.IsSuccessStatusCode;
            }
            catch (Exception)
            {
                return false;
            }
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
            var vis = await _ctx.Visualizations
                .FirstOrDefaultAsync(v => v.NetworkDatasetId == dataSetId && v.Type == type);

            if (vis != null)
            {
                return vis;
            }

            if (type == VisualizationType.MultiLayer_Diagonal)
            {
                vis = await GetDiagonalDatasetVisualization(dataSetId);
            }
            else if (type == VisualizationType.MultiLayer_Slices)
            {
                vis = await GetSlicesDatasetVisualization(dataSetId);
            }

            if (vis != null)
            {
                await _ctx.Visualizations.AddAsync(vis);
                await _ctx.SaveChangesAsync();
            }

            throw new NotSupportedException($"Visualization type '{type}' is not supported for datasets.");
        }

        private async Task<Visualization> GetDiagonalDatasetVisualization(int dataSetId)
        {
            var dataSet = await _ctx.DataSets.FindAsync(dataSetId);
            var request = new MultilayerRequest
            {
                EdgeList = dataSet.EdgeList,
                Type = VisualizationType.MultiLayer_Diagonal
            };
            return await VisualizeMultilayer(request);
        }

        private async Task<Visualization> GetSlicesDatasetVisualization(int dataSetId)
        {
            var dataSet = await _ctx.DataSets.FindAsync(dataSetId);
            var request = new MultilayerRequest
            {
                EdgeList = dataSet.EdgeList,
                Type = VisualizationType.MultiLayer_Slices
            };
            return await VisualizeMultilayer(request);
        }

        public async Task<Visualization> GetAnalysisVisualization(int analysisId, VisualizationType type)
        {
            var vis = await _ctx.Visualizations.FirstOrDefaultAsync(vis => vis.AnalysisId == analysisId && vis.Type == type);

            if (vis != null)
            {
                return vis;
            }

            if (type == VisualizationType.Barplot)
            {
                vis = await VisualizeBarplot(analysisId);
            }
            else if (type == VisualizationType.Treemap)
            {
                vis = await VisualizeTreemap(analysisId);
            }
            else if (type.IsSingleLayer())
            {
                vis = await VisualizeSingleLayer(analysisId, type);
            }
            else if (type.IsSingleLayerCommunities())
            {
                vis = await VisualizeSingleLayerCommunity(analysisId, type);
            }
            else if (type.IsMultiLayer())
            {
                vis = await VisualizeMultilayer(analysisId, type);
            }
            else if (type.IsMultiLayerCommunities())
            {
                vis = await VisualizeMultilayerCommunities(analysisId, type);
            }

            if (vis != null)
            {
                vis.AnalysisId = analysisId;

                await _ctx.Visualizations.AddAsync(vis);
                await _ctx.SaveChangesAsync();

                return vis;
            }

            throw new ArgumentException("Unsupported visualization type " + type);
        }

        public async Task<Visualization> VisualizeMultilayer(int analysisId, VisualizationType type)
        {
            var res = await GetAnalysisResult(analysisId);
            var req = VisualizationHelper.GetMultilayerRequest(res.AnalyzedNetworkEdgeList, type);
            return await VisualizeMultilayer(req);
        }

        public async Task<Visualization> VisualizeMultilayer(MultilayerRequest request)
        {
            var uri = "/multi-layer" + request.Type switch
            {
                VisualizationType.MultiLayer_Diagonal => "/diagonal",
                VisualizationType.MultiLayer_Slices => "/slices",
                _ => throw new NotSupportedException($"Visualization type '{request.Type}' is not supported.")
            };
            var image = await DoRequest(uri, request);
            return new Visualization
            {
                Title = request.Type.ToTitle(),
                Type = request.Type,
                SvgImage = image
            };
        }

        public async Task<Visualization> VisualizeMultilayerCommunities(int analysisId, VisualizationType type)
        {
            var res = await GetAnalysisResult(analysisId);
            var req = VisualizationHelper.GetMultilayerCommunitiesRequest(res.AnalyzedNetworkEdgeList, res.CommunityList, type);
            return await VisualizeMultilayerCommunities(req);
        }

        public async Task<Visualization> VisualizeMultilayerCommunities(MultilayerCommunitiesRequest request)
        {
            var uri = "/multi-layer" + request.Type switch
            {
                VisualizationType.MultiLayer_Hairball => "/hairball",
                VisualizationType.MultiLayer_Slices_Communities => "/slices-communities",
                _ => throw new NotSupportedException($"Visualization type '{request.Type}' is not supported.")
            };
            var image = await DoRequest(uri, request);
            return new Visualization
            {
                Title = request.Type.ToTitle(),
                Type = request.Type,
                SvgImage = image
            };
        }

        public async Task<Visualization> VisualizeSingleLayer(int analysisId, VisualizationType type)
        {
            var res = await GetAnalysisResult(analysisId);
            var req = VisualizationHelper.GetSingleLayerRequest(res.AnalyzedNetworkEdgeList, type);
            return await VisualizeSingleLayer(req);
        }

        public async Task<Visualization> VisualizeSingleLayer(SingleLayerRequest request)
        {
            var image = await DoRequest("/single-layer/network", request);
            return new Visualization
            {
                Title = request.Type.ToTitle(),
                Type = request.Type,
                SvgImage = image
            };
        }

        public async Task<Visualization> VisualizeSingleLayerCommunity(int analysisId, VisualizationType type)
        {
            var res = await GetAnalysisResult(analysisId);
            var req = VisualizationHelper.GetSingleLayerCommunityRequest(res.AnalyzedNetworkEdgeList, res.CommunityList, type);
            return await VisualizeSingleLayerCommunity(req);
        }

        public async Task<Visualization> VisualizeSingleLayerCommunity(SingleLayerCommunityRequest request)
        {
            var image = await DoRequest("/single-layer/community", request);
            return new Visualization
            {
                Title = request.Type.ToTitle(),
                Type = request.Type,
                SvgImage = image
            };
        }

        public async Task<Visualization> VisualizeTreemap(int analysisId)
        {
            var res = await GetAnalysisResult(analysisId);
            var req = VisualizationHelper.GetTreemapRequest(res);
            return await VisualizeTreemap(req);
        }

        public async Task<Visualization> VisualizeTreemap<T>(TreemapRequest<T> req)
        {
            var image = await DoRequest("/common-charts/treemap", req);
            return new Visualization
            {
                Title = "Communities Count - Treemap",
                Type = VisualizationType.Treemap,
                SvgImage = image,
            };
        }

        private async Task<Visualization> VisualizeBarplot(int analysisId)
        {
            var res = await GetAnalysisResult(analysisId);
            var req = VisualizationHelper.GetBarplotRequest(res);
            return await VisualizeBarplot(req);
        }

        public async Task<Visualization> VisualizeBarplot<R, T>(BarplotRequest<R, T> req)
        {
            var image = await DoRequest("/common-charts/barplot", req);
            return new Visualization
            {
                Title = "Communities Count - Barplot",
                Type = VisualizationType.Barplot,
                SvgImage = image
            };
        }


        private async Task<Visualization> GetVisualizationFromAnalysis(int analysisId, VisualizationType type)
        {
            var vis = await _ctx.Visualizations.FirstOrDefaultAsync(vis => vis.AnalysisId == analysisId && vis.Type == type);

            if (vis != null)
            {
                return vis;
            }

            if (type == VisualizationType.Barplot)
            {
                vis = await VisualizeBarplot(analysisId);
            }

            await _ctx.Visualizations.AddAsync(vis);
            await _ctx.SaveChangesAsync();

            return null;
        }

        private HttpClient GetClient()
        {
            return new HttpClient
            {
                // Timeout = TimeSpan.FromMinutes(5)
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

        public async Task<string> DoRequest(string url, Object body)
        {
            var client = GetClient();
            var json = JsonConvert.SerializeObject(body);
            var uri = $"{_baseUrl}/api{url}";
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            semaphore.WaitOne();
            var response = await client.PostAsync(uri, content);
            semaphore.Release();

            if (response.IsSuccessStatusCode)
            {
                var svg = await response.Content.ReadAsStringAsync();
                return svg;
            }
            else
            {
                var error = await HandleError(response);
                throw new ArgumentException(error);
            }
        }

        private class ErrorResponse
        {
            public List<string> Errors { get; set; }
        }

        private async Task<AnalysisResult> GetAnalysisResult(int analysisId) => await _ctx.AnalysisResult.FirstOrDefaultAsync(i => i.AnalysisId == analysisId) ??
                throw new NotFoundException("Analysis result not found.");


        private async Task<AnalysisRequest> GetAnalysisRequest(int analysisId) => await _ctx.AnalysisRequests.FirstOrDefaultAsync(i => i.AnalysisId == analysisId) ??
                throw new NotFoundException("Analysis request not found.");

        private async Task<NetworkDataSet> GetAnalysisDataset(int analysisId)
        {
            var request = await _ctx.AnalysisRequests.Include(r => r.DataSet).FirstOrDefaultAsync(i => i.AnalysisId == analysisId);

            return request?.DataSet ?? throw new NotFoundException("Analysis dataset not found.");
        }
    }
}
