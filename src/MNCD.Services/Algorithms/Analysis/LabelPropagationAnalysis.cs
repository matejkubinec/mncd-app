using MNCD.CommunityDetection.SingleLayer;
using MNCD.Core;
using MNCD.Domain.Entities;
using MNCD.Services.Helpers;
using System;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms.Analysis
{
    public class LabelPropagationAnalysis : IAnalysisAlgorithm
    {
        private readonly static LabelPropagation Algorithm = new LabelPropagation();

        public AnalysisResult Analyze(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }

            var maxIterations = int.Parse(parameters["maxIterations"]);
            var communities = Algorithm.GetCommunities(network, maxIterations);
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

            if (!parameters.ContainsKey("maxIterations"))
            {
                errors.Add("Parameter 'maxIterations' is required.");
            }
            else
            {
                var maxIterationsStr = parameters["maxIterations"];

                if (int.TryParse(maxIterationsStr, out var maxIterations))
                {
                    if (maxIterations <= 0)
                    {
                        errors.Add("Parameter 'maxIterations' must be greater than zero.");
                    }
                }
                else
                {
                    errors.Add("Parameter 'maxIterations' must be a valid integer.");
                }
            }

            return errors;
        }
    }
}
