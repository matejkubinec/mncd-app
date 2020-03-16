using System;
using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class AnalysisRequest
    {
        public int Id { get; set; }
        
        public int AnalysisId { get; set; }
        
        public Analysis Analysis { get; set; }

        public DateTime CreateDate { get; set; }

        public NetworkDataSet DataSet { get; set; }

        public int SelectedLayer { get; set; }

        public AnalysisApproach Approach { get; set; }

        public AnalysisAlgorithm AnalysisAlgorithm { get; set; }

        public Dictionary<string, string> AnalysisAlgorithmParameters { get; set; }

        public FlatteningAlgorithm FlatteningAlgorithm { get; set; }

        public Dictionary<string, string> FlatteningAlgorithmParameters { get; set; }
    }
}