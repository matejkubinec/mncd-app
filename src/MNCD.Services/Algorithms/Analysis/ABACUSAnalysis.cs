using MNCD.CommunityDetection.MultiLayer;
using MNCD.Core;
using MNCD.Domain.Entities;
using MNCD.Services.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MNCD.Services.Algorithms.Analysis
{
    public class ABACUSAnalysis : IAnalysisAlgorithm
    {
        private readonly static ABACUS Algorithm = new ABACUS();

        public AnalysisResult Analyze(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }

            var treshold = int.Parse(parameters["treshold"]);
            var algorithm = ParseAlgorithm(parameters);
            var communities = Algorithm.Apply(network, algorithm, treshold);
            return new AnalysisResult
            {
                ActorToCommunity = AnalysisHelper.ActorToCommunity(network.Actors, communities),
                AnalyzedNetworkEdgeList = AnalysisHelper.EdgeList(network),
                CommunityList = AnalysisHelper.CommunityList(network.Actors, communities),
                Exclusivities = AnalysisHelper.Exclusivities(network, communities),
                Homogenities = AnalysisHelper.Homogenities(network, communities),
                Varieties = AnalysisHelper.Varieties(network, communities),
                Performances = AnalysisHelper.Performances(network, communities),
                Coverages = AnalysisHelper.Coverages(network, communities),
                Modularities = AnalysisHelper.Modularities(network, communities)
            };
        }

        public List<string> ValidateParameters(Network network, Dictionary<string, string> parameters)
        {
            var errors = new List<string>();

            if (!parameters.ContainsKey("treshold"))
            {
                errors.Add("Parameter 'treshold' is required.");
            }
            else
            {
                var tresholdStr = parameters["treshold"];

                if (int.TryParse(tresholdStr, out var treshold))
                {
                    if (treshold < 1)
                    {
                        errors.Add("Parameter 'treshold' must be greater than 0.");
                    }
                }
                else
                {
                    errors.Add("Parameter 'treshold' must be a valid integer.");
                }
            }

            var algorithm = parameters.GetValueOrDefault("algorithm");
            if (algorithm is null)
            {
                errors.Add("Parameter 'algorithm' is required.");
            }
            else
            {
                if (Enum.TryParse(typeof(AnalysisAlgorithm), algorithm, true, out var obj))
                {
                    var alg = (AnalysisAlgorithm)obj;
                    ValidateAlgorithmParameters(errors, network, parameters, alg);
                }
                else
                {
                    errors.Add("Invalid 'algorithm' value.");
                }
            }

            return errors;
        }

        private void ValidateAlgorithmParameters(
            List<string> errors,
            Network network,
            Dictionary<string, string> parameters,
            AnalysisAlgorithm algorithm)
        {
            var json = parameters.GetValueOrDefault("parameters");

            if (parameters is null)
            {
                errors.Add("Parameter 'parameters' is required.");
            }
            else
            {
                try
                {
                    var deserialized = JsonConvert.DeserializeObject<Dictionary<string, string>>(json);

                    switch (algorithm)
                    {
                        case AnalysisAlgorithm.FluidC:
                            ValidateFluidC(network, errors, parameters);
                            break;
                        case AnalysisAlgorithm.KClique:
                            break;
                            // TODO: add KCliques
                    }
                }
                catch (Exception)
                {
                    errors.Add("Parameter 'parameters' is not a valid Dictionary<string, string>.");
                }
            }
        }

        private void ValidateFluidC(
            Network network,
            List<string> errors,
            Dictionary<string, string> parameters)
        {
            if (!parameters.ContainsKey("k"))
            {
                errors.Add("Algorithm Parameters: Parameter 'k' is required.");
            }
            else
            {
                var kStr = parameters["k"];

                if (int.TryParse(kStr, out var k))
                {
                    var actorCount = network.Actors.Count;
                    if (k > actorCount)
                    {
                        errors.Add("Algorithm Parameters: Parameter 'k' must be lower than number of actors in network (" + actorCount + ").");
                    }
                }
                else
                {
                    errors.Add("Algorithm Parameters: Parameter 'k' must be a valid integer.");
                }
            }

            if (!parameters.ContainsKey("maxIterations"))
            {
                errors.Add("Algorithm Parameters: Parameter 'maxIterations' is required.");
            }
            else
            {
                var maxIterationsStr = parameters["maxIterations"];

                if (int.TryParse(maxIterationsStr, out var maxIterations))
                {
                    if (maxIterations <= 0)
                    {
                        errors.Add("Algorithm Parameters: Parameter 'maxIterations' must be greater than zero.");
                    }
                }
                else
                {
                    errors.Add("Algorithm Parameters: Parameter 'maxIterations' must be a valid integer.");
                }
            }
        }

        private void ValidateKCliques(
            Network network,
            List<string> errors,
            Dictionary<string, string> parameters)
        {
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
        }

        private Func<Network, List<Community>> ParseAlgorithm(Dictionary<string, string> parameters)
        {
            var alg = (AnalysisAlgorithm)Enum.Parse(typeof(AnalysisAlgorithm), parameters["algorithm"]);
            var par = JsonConvert.DeserializeObject<Dictionary<string, string>>(parameters["parameters"]);
            return alg switch
            {
                AnalysisAlgorithm.Louvain => (Network n) =>
                {
                    return new MNCD.CommunityDetection.SingleLayer.Louvain().Apply(n);
                }
                ,
                AnalysisAlgorithm.FluidC => (Network n) =>
                {
                    var k = int.Parse(par["k"]);
                    var maxIterations = int.Parse(par["maxIterations"]);
                    return new MNCD.CommunityDetection.SingleLayer.FluidC().Compute(n, k, maxIterations).ToList();
                }
                ,
                AnalysisAlgorithm.KClique => (Network n) =>
                {
                    var k = int.Parse(par["k"]);
                    return new MNCD.CommunityDetection.SingleLayer.KClique().GetKCommunities(n, k);
                }
                ,
                _ => throw new ArgumentException("Invalid algorithm")
            };
        }
    }
}
