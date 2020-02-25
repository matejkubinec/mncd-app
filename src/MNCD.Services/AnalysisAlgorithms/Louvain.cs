using System;
using System.Collections.Generic;
using System.Linq;
using MNCD.Core;
using MNCD.Domain.Entities;
using MNCD.Evaluation;

namespace MNCD.Services.AnalysisAlgorithms
{
    public static class Louvain
    {
        private const string CommunityCountKey = "CommunityCount";

        public static AnalysisResult Analyze(AnalysisRequest request, Network network, Network multiLayer)
        {
            Validate(request, network);

            var communityCount = ParseCommunityCount(request);
            var instance = new MNCD.CommunityDetection.Louvain();
            var hierarchy = instance.Compute(network);

            var communities = hierarchy
                .FirstOrDefault(h => h.Count == communityCount)
                .Select(c => new MNCD.Core.Community(c.Value))
                .ToList();
            var actorToIndex = GetActorToIndex(network);
            var actorToCommunity = InitActorToCommunity(network.Actors.Count);
            for (var i = 0; i < communities.Count; i++)
            {
                var community = communities[i];
                foreach (var actor in community.Actors)
                {
                    var idx = actorToIndex[actor];
                    actorToCommunity[idx] = i;
                }
            }

            var varieties = communities.Select(c => Variety.Compute(c, multiLayer)).ToList();
            var exclusivities = communities.Select(c =>
            {
                if (c.Actors.Count == 1)
                {
                    return 0.0;
                }

                return Exclusivity.Compute(c, multiLayer);
            }).ToList();
            var homogenities = communities.Select(c =>
            {
                if (c.Actors.Count == 1)
                {
                    return 0.0;
                }

                return Homogenity.Compute(c, multiLayer);
            }).ToList();

            return new AnalysisResult
            {
                ActorToCommunity = actorToCommunity,
                Varieties = varieties,
                Exclusivities = exclusivities,
                Homogenities = homogenities
            };
        }

        private static List<int> InitActorToCommunity(int actorCount)
        {
            var actorToCommunity = new List<int>(actorCount);
            for (var i = 0; i < actorCount; i++)
            {
                actorToCommunity.Add(-1);
            }
            return actorToCommunity;
        }

        private static Dictionary<Actor, int> GetActorToIndex(Network network)
        {
            var actorToIndex = new Dictionary<Actor, int>();
            for (var i = 0; i < network.Actors.Count; i++)
            {
                actorToIndex.Add(network.Actors[i], i);
            }
            return actorToIndex;
        }

        private static int ParseCommunityCount(AnalysisRequest request)
        {
            var communityCountString = request.AnalysisAlgorithmParameters[CommunityCountKey];
            return int.Parse(communityCountString);
        }

        private static void Validate(AnalysisRequest request, Network network)
        {
            if (request.AnalysisAlgorithmParameters.ContainsKey(CommunityCountKey))
            {
                var value = request.AnalysisAlgorithmParameters[CommunityCountKey];

                if (int.TryParse(value, out var communityCount))
                {
                    var actorCount = network.Actors.Count;
                    if (communityCount < 1 || communityCount > actorCount)
                    {
                        throw new ArgumentException(CommunityCountKey + " must be greater than zero and less than number of actors in network (" + actorCount + ").");
                    }
                }
                else
                {
                    throw new ArgumentException(CommunityCountKey + " must be a valid integer.");
                }
            }
            else
            {
                throw new ArgumentException(CommunityCountKey + " must be a valid integer.");
            }
        }
    }
}