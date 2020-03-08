using MNCD.CommunityDetection.SingleLayer;
using MNCD.Core;
using MNCD.Domain.Entities;
using MNCD.Services.Helpers;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms.Analysis
{
    public class LouvainAnalysis : IAnalysisAlgorithm
    {
        private static readonly Louvain Algorithm = new Louvain();

        public AnalysisResult Analyze(Network network, Dictionary<string, string> parameters)
        {
            var communities = Algorithm.Apply(network);
            return new AnalysisResult
            {
                ActorToCommunity = AnalysisHelper.ActorToCommunity(network.Actors, communities),
                AnalyzedNetworkEdgeList = AnalysisHelper.EdgeList(network),
                Coverage = AnalysisHelper.Coverage(network, communities),
                Performance = AnalysisHelper.Performance(network, communities),
                Modularity = AnalysisHelper.Modularity(network, communities)
            };
        }

        public List<string> ValidateParameters(Network network, Dictionary<string, string> parameters)
        {
            // Louvain doesnt have any parameters
            return new List<string>();
        }
    }
}
