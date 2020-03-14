using MNCD.Domain.DTO.Visualization;
using MNCD.Domain.Entities;
using System.Threading.Tasks;

namespace MNCD.Domain.Services
{
    public interface IVisualizationService
    {
        Task<Visualization> GetVisualization(int id);
        Task<Visualization> GetVisualization(int analysisId, VisualizationType type);

        Task<Visualization> VisualizeMultilayer(MultilayerRequest request);
        Task<Visualization> VisualizeMultilayerCommunities(MultilayerCommunitiesRequest request);

        Task<Visualization> VisualizeSingleLayer(SingleLayerRequest request);
        Task<Visualization> VisualizeSingleLayerCommunity(SingleLayerCommunityRequest request);

        Task<Visualization> VisualizeBarplot<R, T>(BarplotRequest<R, T> request);
        Task<Visualization> VisualizeTreemap<T>(TreemapRequest<T> request);
    }
}
