using MNCD.Core;
using MNCD.Domain.Entities;
using MNCD.Evaluation.SingleLayer;
using MNCD.Writers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MNCD.Services.AnalysisAlgorithms
{
    public static class FluidC
    {
        public static AnalysisResult Analyze(AnalysisRequest request, Network analyzedNetwork, Network mainNetwork)
        {
            Validate(request, analyzedNetwork);

            var fluidC = new CommunityDetection.SingleLayer.FluidC();
            var k = int.Parse(request.AnalysisAlgorithmParameters["k"]);
            var maxIterations = int.Parse(request.AnalysisAlgorithmParameters["maxIterations"]);

            var communities = fluidC.Compute(analyzedNetwork, k, maxIterations).ToList();
            var result = new AnalysisResult();
            var edgeList = new EdgeListWriter().ToString(analyzedNetwork);

            result.ActorToCommunity = ActorToCommunity(analyzedNetwork.Actors, communities);
            result.AnalyzedNetworkEdgeList = edgeList;

            if (analyzedNetwork.LayerCount == 1)
            {
                result.Coverage = Coverage.Get(analyzedNetwork, communities);
                result.Performance = Coverage.Get(analyzedNetwork, communities);
            }

            // TODO: multilayer evaluation

            return result;
        }

        private static List<int> ActorToCommunity(List<Actor> actors, List<Core.Community> communities)
        {
            var result = new List<int>();
            for (var i = 0; i < actors.Count; i++)
            {
                for (var j = 0; j < communities.Count; j++)
                {
                    if (communities[j].Actors.Contains(actors[i]))
                    {
                        result.Add(j);
                        break;
                    }
                }
            }
            return result;
        }

        private static void Validate(AnalysisRequest request, Network analyzedNetwork)
        {
            var errors = new List<string>();

            if (!request.AnalysisAlgorithmParameters.ContainsKey("k"))
            {
                errors.Add("Parameter 'k' is required.");
            }
            else
            {
                var kStr = request.AnalysisAlgorithmParameters["k"];

                if (int.TryParse(kStr, out var k))
                {
                    var actorCount = analyzedNetwork.Actors.Count;
                    if (k > actorCount)
                    {
                        errors.Add("Parameter 'k' must be lower than number of actors in network (" + actorCount + ").");
                    }
                }
                else
                {
                    errors.Add("Parameter 'k' must be a valid integer.");
                }
            }

            if (!request.AnalysisAlgorithmParameters.ContainsKey("maxIterations"))
            {
                errors.Add("Parameter 'maxIterations' is required.");
            }
            else
            {
                var maxIterationsStr = request.AnalysisAlgorithmParameters["maxIterations"];

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

            if (errors.Count > 0)
            {
                var json = JsonConvert.SerializeObject(errors);
                throw new ArgumentException(json);
            }
        }
    }
}
