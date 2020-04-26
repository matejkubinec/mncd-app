using MNCD.Domain.Entities;

namespace MNCD.Domain.Extensions
{
    public static class VisualizationTypeExtensions
    {
        public static bool IsMultiLayer(this VisualizationType type) => type switch
        {
            VisualizationType.MultiLayer_Diagonal => true,
            VisualizationType.MultiLayer_Slices => true,
            _ => false
        };

        public static bool IsMultiLayerCommunities(this VisualizationType type) => type switch
        {
            VisualizationType.MultiLayerHairball => true,
            VisualizationType.MultiLayerSlicesCommunities => true,
            _ => false
        };

        public static bool IsSingleLayer(this VisualizationType type) => type switch
        {
            VisualizationType.SingleLayer_Spring => true,
            VisualizationType.SingleLayer_Spiral => true,
            VisualizationType.SingleLayer_Circular => true,
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
            VisualizationType.MultiLayer_Diagonal => "Diagonal Layout",
            VisualizationType.MultiLayerHairball => "Hairball Layout",
            VisualizationType.SingleLayer_Spring => "Spring Layout",
            VisualizationType.SingleLayer_Circular => "Circular Layout",
            VisualizationType.SingleLayer_Spiral => "Spiral Layout",
            VisualizationType.SingleLayerCommunitiesSpring => "Spring Layout",
            VisualizationType.SingleLayerCommunitiesCircular => "Circular Layout",
            VisualizationType.SingleLayerCommunitiesSpiral => "Spiral Layout",
            VisualizationType.Barplot => "Barplot",
            VisualizationType.Treemap => "Treemap",
            VisualizationType.MultiLayer_Slices => "Layers",
            VisualizationType.MultiLayerSlicesCommunities => "Communities in Layers",
            _ => ""
        };

        public static string ToLayout(this VisualizationType type) => type switch
        {
            VisualizationType.SingleLayer_Circular => "circular",
            VisualizationType.SingleLayer_Spiral => "spiral",
            VisualizationType.SingleLayer_Spring => "spring",
            VisualizationType.SingleLayerCommunitiesCircular => "circular",
            VisualizationType.SingleLayerCommunitiesSpiral => "spiral",
            VisualizationType.SingleLayerCommunitiesSpring => "spring",
            _ => ""
        };
    }
}
