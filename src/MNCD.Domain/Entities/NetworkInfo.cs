using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class NetworkInfo
    {
        public int Id { get; set; }

        public int NodeCount { get; set; }

        public int EdgeCount { get; set; }

        public int LayerCount { get; set; }

        public List<string> LayerNames { get; set; } = new List<string>();

        public List<string> ActorNames { get; set; } = new List<string>();
    }
}
