using System;
using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class AnalysisRequest
    {
        public int Id { get; set; }
        public DateTime CreateDate { get; set; }
        public NetworkDataSet Dataset { get; set; }
        public int? SelectedLayer { get; set; }

        public AnalysisApproach Approach { get; set; }
        public AnalysisAlgorithm AnalysisAlgorithm { get; set; }
        public Dictionary<string, string> AnalysisAlgorithmParameters { get; set; }

        public FlattenningAlgorithm FlattenningAlgorithm { get; set; }
        public Dictionary<string, string> FlattenningAlgorithmParameters { get; set; }
    }
}