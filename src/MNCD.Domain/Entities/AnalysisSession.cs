using System;
using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class AnalysisSession
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime CreateDate { get; set; }

        public List<Analysis> Analyses { get; set; } = new List<Analysis>();
    }
}