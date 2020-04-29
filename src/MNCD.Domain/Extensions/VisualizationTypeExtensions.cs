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
            VisualizationType.MultiLayer_Hairball => true,
            VisualizationType.MultiLayer_Slices_Communities => true,
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
            VisualizationType.SingleLayer_Communities_Spring => true,
            VisualizationType.SingleLayer_Communities_Spiral => true,
            VisualizationType.SingleLayer_Communities_Circular => true,
            _ => false
        };

        public static string ToTitle(this VisualizationType type) => type switch
        {
            VisualizationType.MultiLayer_Diagonal => "Diagonal Layout",
            VisualizationType.MultiLayer_Hairball => "Hairball Layout",
            VisualizationType.MultiLayer_Slices_Communities => "Communities in Layers",
            VisualizationType.SingleLayer_Spring => "Spring Layout",
            VisualizationType.SingleLayer_Circular => "Circular Layout",
            VisualizationType.SingleLayer_Spiral => "Spiral Layout",
            VisualizationType.SingleLayer_Communities_Spring => "Communities - Spring Layout",
            VisualizationType.SingleLayer_Communities_Circular => "Communities - Circular Layout",
            VisualizationType.SingleLayer_Communities_Spiral => "Communities - Spiral Layout",
            VisualizationType.Barplot => "Barplot",
            VisualizationType.Treemap => "Treemap",
            VisualizationType.MultiLayer_Slices => "Layers",
            _ => ""
        };

        public static string ToLayout(this VisualizationType type) => type switch
        {
            VisualizationType.SingleLayer_Circular => "circular",
            VisualizationType.SingleLayer_Spiral => "spiral",
            VisualizationType.SingleLayer_Spring => "spring",
            VisualizationType.SingleLayer_Communities_Circular => "circular",
            VisualizationType.SingleLayer_Communities_Spiral => "spiral",
            VisualizationType.SingleLayer_Communities_Spring => "spring",
            _ => ""
        };
    }
}
