using System.Collections.Generic;

namespace MNCD.Web.Models.Analysis
{
    public class AnalysisResultViewModel
    {
        public int Id { get; set; }
        public double AverageVariety { get; set; }
        public List<double> Varieties { get; set; }
        public double AverageExclusivity { get; set; }
        public List<double> Exclusivities { get; set; }
        public double AverageHomogenity { get; set; }
        public List<double> Homogenities { get; set; }

        public double? Coverage { get; set; }
        public double? Performance { get; set; }
    }
}
