using MNCD.Domain.Entities;

namespace MNCD.Domain.Extensions
{
    public static class VisualizationTypeExtensions
    {
        public static bool IsMultiLayer(this VisualizationType type) => type switch
        {
            VisualizationType.MultiLayerDiagonal => true,
            _ => false
        };

        public static bool IsMultiLayerCommunities(this VisualizationType type) => type switch
        {
            VisualizationType.MultiLayerHairball => true,
            _ => false
        };

        public static bool IsSingleLayer(this VisualizationType type) => type switch
        {
            VisualizationType.SingleLayerSpring => true,
            VisualizationType.SingleLayerSpiral => true,
            VisualizationType.SingleLayerCircular => true,
            _ => false
        };

        public static bool IsSingleLayerCommunities(this VisualizationType type) => type switch
        {
            VisualizationType.SingleLayerCommunitiesSpring => true,
            VisualizationType.SingleLayerCommunitiesSpiral => true,
            VisualizationType.SingleLayerCommunitiesCircular => true,
            _ => false
        };

        public static string ToTitle(this VisualizationType type) => type switch
        {
            VisualizationType.MultiLayerDiagonal => "Diagonal Layout",
            VisualizationType.MultiLayerHairball => "Hairball Layout",
            VisualizationType.SingleLayerSpring => "Spring Layout",
            VisualizationType.SingleLayerCircular => "Circular Layout",
            VisualizationType.SingleLayerSpiral => "Spiral Layout",
            VisualizationType.SingleLayerCommunitiesSpring => "Spring Layout",
            VisualizationType.SingleLayerCommunitiesCircular => "Circular Layout",
            VisualizationType.SingleLayerCommunitiesSpiral => "Spiral Layout",
            VisualizationType.Barplot => "Barplot",
            VisualizationType.Treemap => "Treemap",
            VisualizationType.MultiLayerSlices => "Layers",
            VisualizationType.MultiLayerSlicesCommunities => "Communities in Layers",
            _ => ""
        };

        public static string ToLayout(this VisualizationType type) => type switch
        {
            VisualizationType.SingleLayerCircular => "circular",
            VisualizationType.SingleLayerSpiral => "spiral",
            VisualizationType.SingleLayerSpring => "spring",
            VisualizationType.SingleLayerCommunitiesCircular => "circular",
            VisualizationType.SingleLayerCommunitiesSpiral => "spiral",
            VisualizationType.SingleLayerCommunitiesSpring => "spring",
            _ => ""
        };
    }
}
