using System.Data;

namespace MNCD.Domain.Entities
{
    public class Visualization
    {
        public int Id { get; set; }

        public VisualizationType Type { get; set; }

        public string Title { get; set; }

        public string SvgImage { get; set; }

        public int? AnalysisId { get; set; }

        public Analysis Analysis { get; set; }

        public int? NetworkDatasetId { get; set; }

        public NetworkDataSet NetworkDataSet { get; set; }
    }
}
