using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IVisualizationService
    {
        Visualization VisualiseMultilayer(string edgeList, VisualizationType type);
        Visualization VisualiseSingleLayer(string edgeList, VisualizationType type);
    }
}
