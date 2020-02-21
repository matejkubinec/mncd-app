using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class AnalysisResult
    {
        public int Id { get; set; }
        public List<int> ActorToCommunity { get; set; }
    }
}
