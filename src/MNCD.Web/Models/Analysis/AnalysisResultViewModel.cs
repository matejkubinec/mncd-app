using System.Collections.Generic;

namespace MNCD.Web.Models.Analysis
{
    public class AnalysisResultViewModel
    {
        public int Id { get; set; }

        public double? AverageVariety { get; set; }

        public List<double> Varieties { get; set; }

        public double? AverageExclusivity { get; set; }

        public List<double> Exclusivities { get; set; }

        public double? AverageHomogenity { get; set; }

        public List<double> Homogenities { get; set; }

        public double? AverageCoverage { get; set; }

        public List<double> Coverages { get; set; }

        public double? AveragePerformance { get; set; }

        public List<double> Performances { get; set; }

        public double? AverageModularity { get; set; }

        public List<double> Modularities { get; set; }

        public double? Coverage { get; set; }

        public double? Performance { get; set; }

        public double? Modularity { get; set; }

        public List<AnalysisCommunityDetailViewModel> CommunityDetails { get; set; }
    }
}
