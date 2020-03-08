namespace MNCD.Domain.Entities
{
    public enum AnalysisApproach
    {
        MultiLayer = 0,
        SingleLayerOnly = 1,
        SingleLayerFlattening = 2
    }

    public enum AnalysisAlgorithm
    {
        FluidC = 0,
        Louvain = 1,
        KClique = 2
    }

    public enum FlatteningAlgorithm
    {
        BasicFlattening = 0,
        LocalSimplification = 1,
        MergeFlattening = 2,
        WeightedFlattening = 3
    }

    public enum FileType
    {
        MPX = 0,
        EdgeList = 1
    }

    // TODO: remove

    public enum VisualizationType
    {
    }

    public enum MultiLayerLayout
    {
        Diagonal
    }

    public enum MultiLayerCommunitiesLayout
    {
        Hairball
    }

    public enum SingleLayerLayout
    {
        Spring,
        Circular,
        Spiral
    }

    public enum VisualizationCommonChart
    {
        Barplot,
        Treemap
    }
}