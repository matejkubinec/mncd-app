using System.Collections.Generic;

namespace MNCD.Web.Models.Analysis
{
    public class AnalysisCommunityDetailViewModel
    {
        public string Name { get; set; }
        public int ActorCount { get; set; }
        public List<ActorItem> Actors { get; set; }
    }

    public class ActorItem
    {
        public int Idx { get; set; }
        public string Name { get; set; }
    }
}