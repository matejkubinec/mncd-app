using MNCD.Domain.Entities;

namespace MNCD.Domain.Extensions
{
    public static class AnalysisAlgorithmExtensions
    {
        public static bool IsSingleLayer(this AnalysisAlgorithm algorithm)
        {
            return
                algorithm == AnalysisAlgorithm.FluidC ||
                algorithm == AnalysisAlgorithm.KClique ||
                algorithm == AnalysisAlgorithm.Louvain;
        }

        public static bool IsMultiLayer(this AnalysisAlgorithm algorithm)
        {
            return !IsSingleLayer(algorithm);
        }
    }
}
