using MNCD.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MNCD.Domain.Services
{
    public interface IVisualizationService
    {
        Task<Visualization> VisualizeMultilayer(string edgeList, MultiLayerLayout layout);
        Task<Visualization> VisualizeMultilayerCommunities(string edgeList, string communityList, MultiLayerCommunitiesLayout layout);

        Task<Visualization> VisualizeSingleLayer(string edgeList, SingleLayerLayout layout);
        Task<Visualization> VisualizeSingleLayerCommunity(string edgeList, string communityList, SingleLayerLayout layout);

        Task<Visualization> VisualizeBarplot<R, T>(IEnumerable<R> x, IEnumerable<T> y, IEnumerable<string> labels, string xlabel, string ylabel);
        Task<Visualization> VisualizeTreemap<T>(IEnumerable<T> sizes, IEnumerable<string> label);
    }
}
