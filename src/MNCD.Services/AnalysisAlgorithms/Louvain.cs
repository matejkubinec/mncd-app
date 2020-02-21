using System;
using System.Collections.Generic;
using System.Linq;
using MNCD.Core;
using MNCD.Domain.Entities;

namespace MNCD.Services.AnalysisAlgorithms
{
    public static class Louvain
    {
        private const string CommunityCountKey = "CommunityCount";

        public static AnalysisResult Analyze(AnalysisRequest request, Network network)
        {
            Validate(request, network);

            var communityCount = ParseCommunityCount(request);
            var instance = new MNCD.CommunityDetection.Louvain();
            var hierarchy = instance.Compute(network);

            var communities = hierarchy.FirstOrDefault(h => h.Count == communityCount).ToList();
            var actorToIndex = GetActorToIndex(network);
            var actorToCommunity = InitActorToCommunity(network.Actors.Count);
            for (var i = 0; i < communities.Count; i++)
            {
                var community = communities[i];
                foreach (var actor in community.Value)
                {
                    var idx = actorToIndex[actor];
                    actorToCommunity[idx] = i;
                }
            }

            return new AnalysisResult
            {
                ActorToCommunity = actorToCommunity
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