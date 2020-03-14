using MNCD.CommunityDetection.SingleLayer;
using MNCD.Core;
using MNCD.Domain.Entities;
using MNCD.Services.Helpers;
using System;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms.Analysis
{
    public class KCliqueAnalysis : IAnalysisAlgorithm
    {
        private static readonly KClique Algorithm = new KClique();

        public AnalysisResult Analyze(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }

            var k = int.Parse(parameters["k"]);
            var communities = Algorithm.GetKCommunities(network, k);
            return new AnalysisResult
            {
                ActorToCommunity = AnalysisHelper.ActorToCommunity(network.Actors, communities),
                AnalyzedNetworkEdgeList = AnalysisHelper.EdgeList(network),
                CommunityList = AnalysisHelper.CommunityList(network.Actors, communities),
                Coverage = AnalysisHelper.Coverage(network, communities),
                Performance = AnalysisHelper.Performance(network, communities),
                Modularity = AnalysisHelper.Modularity(network, communities)
            };
        }

        public List<string> ValidateParameters(Network network, Dictionary<string, string> parameters)
        {
            var errors = new List<string>();

            if (!parameters.ContainsKey("k"))
            {
                errors.Add("Parameter 'k' is required.");
            }
            else
            {
                var kStr = parameters["k"];

                if (int.TryParse(kStr, out var k))
                {
                    if (k < 2)
                    {
                        errors.Add("Parameter 'k' must be greater than one.");
                    }
                }
                else
                {
                    errors.Add("Parameter 'k' must be a valid integer.");
                }
            }

            return errors;
        }
    }
}
