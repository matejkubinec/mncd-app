using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class Analysis
    {
        public int Id { get; set; }

        public int AnalysisSessionId { get; set; }

        public AnalysisSession AnalysisSession { get; set; }

        public AnalysisRequest Request { get; set; }

        public AnalysisResult Result { get; set; }

        public List<Visualization> Visualizations { get; set; } = new List<Visualization>();

        public bool IsOpen { get; set; }
    }
}
