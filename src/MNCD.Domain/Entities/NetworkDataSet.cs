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

        public FileType FileType { get; set; }

        public NetworkInfo NetworkInfo { get; set; }

        public List<AnalysisRequest> Requests { get; set; }
    }
}
