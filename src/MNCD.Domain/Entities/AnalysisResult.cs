using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class AnalysisResult
    {
        public int Id { get; set; }

        public int AnalysisId { get; set; }

        public Analysis Analysis { get; set; }

        public Dictionary<int, int> ActorToCommunity { get; set; } = new Dictionary<int, int>();

        public string CommunityList { get; set; }

        public string AnalyzedNetworkEdgeList { get; set; }

        public List<double> Varieties { get; set; } = new List<double>();

        public List<double> Exclusivities { get; set; } = new List<double>();

        public List<double> Homogenities { get; set; } = new List<double>();

        public List<double> Performances { get; set; } = new List<double>();

        public List<double> Coverages { get; set; } = new List<double>();

        public List<double> Modularities { get; set; } = new List<double>();

        public double? Coverage { get; set; }

        public double? Performance { get; set; }

        public double? Modularity { get; set; }
    }
}
