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
        MultiLayer_Hairball = 1,
        SingleLayer_Spring = 2,
        SingleLayer_Circular = 3,
        SingleLayer_Spiral = 4,
        SingleLayer_Communities_Spring = 5,
        SingleLayer_Communities_Circular = 6,
        SingleLayer_Communities_Spiral = 7,
        Barplot = 8,
        Treemap = 9,
        MultiLayer_Slices = 10,
        MultiLayer_Slices_Communities = 11
    }
}