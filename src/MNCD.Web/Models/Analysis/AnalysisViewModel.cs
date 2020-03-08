namespace MNCD.Web.Models.Analysis
{
    public class AnalysisViewModel
    {
        public int Id { get; set; }
        public AnalysisRequestViewModel Request { get; set; }
        public AnalysisResultViewModel Result { get; set; }
        public AnalysisVisualizationViewModel Visualization { get; set; }
    }
}
