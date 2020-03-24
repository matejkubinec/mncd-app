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

    public enum VisualizationType
    {
        MultiLayerDiagonal = 0,
        MultiLayerHairball = 1,
        SingleLayerSpring = 2,
        SingleLayerCircular = 3,
        SingleLayerSpiral = 4,
        SingleLayerCommunitiesSpring = 5,
        SingleLayerCommunitiesCircular = 6,
        SingleLayerCommunitiesSpiral = 7,
        Barplot = 8,
        Treemap = 9,
        MultiLayerSlices = 10,
        MultiLayerSlicesCommunities = 11
    }
}