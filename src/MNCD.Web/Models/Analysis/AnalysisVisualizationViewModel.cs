using System.Collections.Generic;

namespace MNCD.Web.Models.Analysis
{
    public class AnalysisVisualizationViewModel
    {
        public List<AnalysisVisualizationItemViewModel> MultiLayer { get; set; }

        public List<AnalysisVisualizationItemViewModel> MultiLayerCommunities { get; set; }

        public List<AnalysisVisualizationItemViewModel> SingleLayer { get; set; }

        public List<AnalysisVisualizationItemViewModel> SingleLayerCommunities { get; set; }

        public List<AnalysisVisualizationItemViewModel> CommunitySizes { get; set; }
    }

    public class AnalysisVisualizationItemViewModel
    {
        public string Title { get; set; }
        public string Url { get; set; }
    }
}