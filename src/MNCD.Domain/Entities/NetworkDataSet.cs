using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class NetworkDataSet
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Hash { get; set; }

        public string Content { get; set; }

        public string EdgeList { get; set; }

        public bool Deleted { get; set; }

        public int NodeCount { get; set; }

        public int EdgeCount { get; set; }

        public int LayerCount { get; set; }

        public List<string> LayerNames { get; set; } = new List<string>();

        public List<string> ActorNames { get; set; } = new List<string>();

        public FileType FileType { get; set; }

        public List<AnalysisRequest> Requests { get; set; }

        public List<Visualization> Visualizations { get; set; } = new List<Visualization>();
    }
}
