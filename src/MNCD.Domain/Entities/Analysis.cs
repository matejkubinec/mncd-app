using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class Analysis
    {
        public int Id { get; set; }

        public AnalysisRequest Request { get; set; }

        public AnalysisResult Result { get; set; }

        public List<Visualization> Visualizations { get; set; }

        public bool IsOpen { get; set; }

        public Analysis()
        {
            Visualizations = new List<Visualization>();
        }
    }
}