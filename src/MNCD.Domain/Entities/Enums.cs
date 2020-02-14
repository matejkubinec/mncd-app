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
        Louvain = 1
    }

    public enum FlattenningAlgorithm
    {
        BasicFlattening = 0,
        LocalSimplification = 1,
        MergeFlattening = 2,
        WeightedFlattening = 3
    }

    public enum FileType
    {
        MPX = 0
    }
}