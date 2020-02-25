﻿using System.Collections.Generic;

namespace MNCD.Domain.Entities
{
    public class AnalysisResult
    {
        public int Id { get; set; }
        public List<int> ActorToCommunity { get; set; }
        public List<double> Varieties { get; set; }
        public List<double> Exclusivities { get; set; }
        public List<double> Homogenities { get; set; }
    }
}
