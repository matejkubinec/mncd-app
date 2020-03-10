using MNCD.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MNCD.Domain.Services
{
    public interface IVisualizationService
    {
        Task<Visualization> GetVisualization(int id);

        Task<Visualization> VisualizeMultilayer(string edgeList, VisualizationType type);
        Task<Visualization> VisualizeMultilayerCommunities(string edgeList, string communityList, VisualizationType type);

        Task<Visualization> VisualizeSingleLayer(string edgeList, VisualizationType type);
        Task<Visualization> VisualizeSingleLayerCommunity(string edgeList, string communityList, VisualizationType type);

        Task<Visualization> VisualizeBarplot<R, T>(IEnumerable<R> x, IEnumerable<T> y, IEnumerable<string> labels, string xlabel, string ylabel);
        Task<Visualization> VisualizeTreemap<T>(IEnumerable<T> sizes, IEnumerable<string> label);
    }
}
