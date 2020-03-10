using MNCD.Domain.Entities;

namespace MNCD.Domain.Extensions
{
    public static class AnalysisApproachExtensions
    {
        public static bool IsSingleLayerApproach(this AnalysisApproach approach)
        {
            return approach == AnalysisApproach.SingleLayerFlattening || approach == AnalysisApproach.SingleLayerOnly;
        }

        public static bool IsMultiLayerApproach(this AnalysisApproach approach)
        {
            return !IsSingleLayerApproach(approach);
        }
    }
}
