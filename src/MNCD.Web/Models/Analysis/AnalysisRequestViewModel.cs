using System.Collections.Generic;
using MNCD.Domain.Entities;

namespace MNCD.Web.Models.Analysis
{
    public class AnalysisRequestViewModel
    {
        public int Id { get; set; }
        public int DatasetId { get; set; }
        public int SelectedLayer { get; set; }

        public AnalysisApproach Approach { get; set; }
        public AnalysisAlgorithm AnalysisAlgorithm { get; set; }
        public Dictionary<string, string> AnalysisAlgorithmParameters { get; set; }

        public FlattenningAlgorithm FlattenningAlgorithm { get; set; }
        public Dictionary<string, string> FlattenningAlgorithmParameters { get; set; }
    }
}