using MNCD.Domain.DTO.Visualization;
using MNCD.Domain.Entities;
using System.Threading.Tasks;

namespace MNCD.Domain.Services
{
    public interface IVisualizationService
    {
        string GetUrl();

        Task<bool> IsAvailable();

        Task<Visualization> GetVisualization(int id);

        Task<Visualization> GetDataSetVisualization(int dataSetId, VisualizationType type);

        Task<Visualization> GetAnalysisVisualization(int analysisId, VisualizationType type);

        Task<Visualization> VisualizeMultilayer(MultilayerRequest request);

        Task<Visualization> VisualizeMultilayerCommunities(MultilayerCommunitiesRequest request);

        Task<Visualization> VisualizeSingleLayer(SingleLayerRequest request);

        Task<Visualization> VisualizeSingleLayerCommunity(SingleLayerCommunityRequest request);

        Task<Visualization> VisualizeBarplot<R, T>(BarplotRequest<R, T> request);

        Task<Visualization> VisualizeTreemap<T>(TreemapRequest<T> request);
    }
}
