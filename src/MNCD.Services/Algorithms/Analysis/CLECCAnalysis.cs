using MNCD.CommunityDetection.MultiLayer;
using MNCD.CommunityDetection.SingleLayer;
using MNCD.Core;
using MNCD.Domain.Entities;
using MNCD.Services.Helpers;
using System;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms.Analysis
{
    public class CLECCAnalysis : IAnalysisAlgorithm
    {
        private readonly static CLECCCommunityDetection Algorithm = new CLECCCommunityDetection();

        public AnalysisResult Analyze(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }

            var k = int.Parse(parameters["k"]);
            var alpha = int.Parse(parameters["alpha"]);
            var communities = Algorithm.Apply(network, alpha, k);
            // TODO: multi layer network evaluation
            return new AnalysisResult
            {
                ActorToCommunity = AnalysisHelper.ActorToCommunity(network.Actors, communities),
                AnalyzedNetworkEdgeList = AnalysisHelper.EdgeList(network),
                CommunityList = AnalysisHelper.CommunityList(network.Actors, communities),
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
                    var actorCount = network.Actors.Count;
                    if (k > actorCount)
                    {
                        errors.Add("Parameter 'k' must be lower than number of actors in network (" + actorCount + ").");
                    }
                    else if (k <= 1)
                    {
                        errors.Add("Parameter 'k' must be greater than 1.");
                    }
                }
                else
                {
                    errors.Add("Parameter 'k' must be a valid integer.");
                }
            }

            if (!parameters.ContainsKey("alpha"))
            {
                errors.Add("Parameter 'alpha' is required.");
            }
            else
            {
                var alphaStr = parameters["alpha"];

                if (int.TryParse(alphaStr, out var alpha))
                {
                    var layerCount = network.LayerCount;
                    if (alpha > layerCount)
                    {
                        errors.Add("Parameter 'alpha' must be lower than number of layers in network (" + layerCount + ").");
                    }
                    else if (alpha < 0)
                    {
                        errors.Add("Parameter 'alpha' must be greater or equal than 0.");
                    }
                }
                else
                {
                    errors.Add("Parameter 'alpha' must be a valid integer.");
                }
            }

            return errors;
        }
    }
}
