using MNCD.Core;
using MNCD.Writers;
using System.Collections.Generic;
using System.Linq;

namespace MNCD.Services.Helpers
{
    public static class AnalysisHelper
    {
        private readonly static EdgeListWriter EdgeListWriter = new EdgeListWriter();

        public static double Coverage(Network network, List<Community> communities)
        {
            return Evaluation.SingleLayer.Coverage.Get(network, communities);
        }

        public static List<double> Coverages(Network network, List<Community> communities)
        {
            return network.Layers
                .Select(l => Evaluation.SingleLayer.Coverage.Get(new Network(l, network.Actors), communities))
                .ToList();
        }

        public static double Performance(Network network, List<Community> communities)
        {
            return Evaluation.SingleLayer.Performance.Get(network, communities);
        }

        public static List<double> Performances(Network network, List<Community> communities)
        {
            return network.Layers
                .Select(l => Evaluation.SingleLayer.Performance.Get(new Network(l, network.Actors), communities))
                .ToList();
        }


        public static double Modularity(Network network, List<Community> communities)
        {
            return Evaluation.SingleLayer.Modularity.Compute(network, communities);
        }

        public static List<double> Modularities(Network network, List<Community> communities)
        {
            return network.Layers
                .Select(l => Evaluation.SingleLayer.Modularity.Compute(new Network(l, network.Actors), communities))
                .ToList();
        }


        public static List<double> Exclusivities(Network network, List<Community> communities)
        {
            return communities
                .Select(c =>
                {
                    try
                    {
                        return Evaluation.MultiLayer.Exclusivity.Compute(c, network);
                    }
                    catch (System.Exception)
                    {
                        return 0;
                    }
                })
                .ToList();
        }

        public static List<double> Homogenities(Network network, List<Community> communities)
        {
            return communities
                .Select(c =>
                {
                    try
                    {
                        return Evaluation.MultiLayer.Homogenity.Compute(c, network);
                    }
                    catch (System.Exception)
                    {
                        return 1;
                    }
                })
                .ToList();
        }

        public static List<double> Varieties(Network network, List<Community> communities)
        {
            return communities
                .Select(c =>
                {
                    try
                    {
                        return Evaluation.MultiLayer.Variety.Compute(c, network);
                    }
                    catch (System.Exception)
                    {
                        return 0;
                    }
                })
                .ToList();
        }

        public static List<double> Complementarity(Network network, List<Community> communities)
        {
            return communities
                .Select(c =>
                {
                    try
                    {
                        return Evaluation.MultiLayer.Complementarity.Compute(c, network);
                    }
                    catch (System.Exception)
                    {
                        return 0;
                    }
                })
                .ToList();
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
