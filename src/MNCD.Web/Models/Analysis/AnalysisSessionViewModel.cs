using System;
using System.Collections.Generic;

namespace MNCD.Web.Models.Analysis
{
    public class AnalysisSessionViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Guid { get; set; }
        public DateTime CreateDate { get; set; }
        public List<AnalysisViewModel> Analyses { get; set; }
    }
}