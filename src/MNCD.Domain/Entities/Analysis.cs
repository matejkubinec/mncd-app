using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class Analysis
    {
        public int Id { get; set; }
        public AnalysisRequest Request { get; set; }
        public AnalysisResult Result { get; set; }

        public List<Visualization> MultiLayer { get; set; }
        public List<Visualization> MultiLayerCommunities { get; set; }

        public List<Visualization> SingleLayer { get; set; }
        public List<Visualization> SingleLayerCommunities { get; set; }

        public Visualization CommunitiesBarplot { get; set; }
        public Visualization CommunitiesTreemap { get; set; }
    }
}