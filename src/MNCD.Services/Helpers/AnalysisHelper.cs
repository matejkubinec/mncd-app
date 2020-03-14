using MNCD.Core;
using MNCD.Writers;
using System.Collections.Generic;

namespace MNCD.Services.Helpers
{
    public static class AnalysisHelper
    {
        private readonly static EdgeListWriter EdgeListWriter = new EdgeListWriter();

        public static double Coverage(Network network, List<Community> communities)
        {
            return Evaluation.SingleLayer.Coverage.Get(network, communities);
        }

        public static double Performance(Network network, List<Community> communities)
        {
            return Evaluation.SingleLayer.Performance.Get(network, communities);
        }

        public static double Modularity(Network network, List<Community> communities)
        {
            return Evaluation.Modularity.Compute(network, communities);
        }

        public static Dictionary<int, int> ActorToCommunity(List<Actor> actors, List<Community> communities)
        {
            var res = new Dictionary<int, int>();
            for (var i = 0; i < actors.Count; i++)
            {
                for (var j = 0; j < communities.Count; j++)
                {
                    if (communities[j].Contains(actors[i]))
                    {
                        res.Add(i, j);
                        break;
                    }
                }
            }
            return res;
        }

        public static string CommunityList(List<Actor> actors, List<Community> communities)
        {
            return new EdgeListWriter().ToString(actors, communities, true);
        }

        public static string EdgeList(Network network)
        {
            return EdgeListWriter.ToString(network, true);
        }
    }
}
