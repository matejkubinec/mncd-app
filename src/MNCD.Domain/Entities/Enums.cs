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
        KClique = 2,
        CLECC = 3,
        ABACUS = 4
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
        MultiLayer_Diagonal = 0,
        MultiLayerHairball = 1,
        SingleLayer_Spring = 2,
        SingleLayer_Circular = 3,
        SingleLayer_Spiral = 4,
        SingleLayerCommunitiesSpring = 5,
        SingleLayerCommunitiesCircular = 6,
        SingleLayerCommunitiesSpiral = 7,
        Barplot = 8,
        Treemap = 9,
        MultiLayer_Slices = 10,
        MultiLayerSlicesCommunities = 11
    }
}