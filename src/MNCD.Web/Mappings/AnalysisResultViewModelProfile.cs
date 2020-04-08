using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.Analysis;
using System.Collections.Generic;
using System.Linq;

namespace MNCD.Web.Mappings
{
    public class AnalysisResultViewModelProfile : Profile
    {
        public AnalysisResultViewModelProfile()
        {
            CreateMap<AnalysisResult, AnalysisResultViewModel>()
                .ForMember(
                    dst => dst.AverageVariety,
                    opt => opt.MapFrom(src => src.Varieties.DefaultIfEmpty().Average())
                )
                .ForMember(
                    dst => dst.AverageExclusivity,
                    opt => opt.MapFrom(src => src.Exclusivities.DefaultIfEmpty().Average())
                )
                .ForMember(
                    dst => dst.AverageHomogenity,
                    opt => opt.MapFrom(src => src.Homogenities.DefaultIfEmpty().Average())
                )
                .ForMember(
                    dst => dst.AverageCoverage,
                    opt => opt.MapFrom(src => src.Coverages.DefaultIfEmpty().Average())
                )
                .ForMember(
                    dst => dst.AveragePerformance,
                    opt => opt.MapFrom(src => src.Performances.DefaultIfEmpty().Average())
                )
                .ForMember(
                    dst => dst.AverageModularity,
                    opt => opt.MapFrom(src => src.Modularities.DefaultIfEmpty().Average())
                )
                .ForMember(
                    dst => dst.CommunityDetails,
                    src => src.MapFrom(src => MapCommunityDetails(src))
                );
            CreateMap<AnalysisResultViewModel, AnalysisResult>();
        }

        private List<AnalysisCommunityDetailViewModel> MapCommunityDetails(AnalysisResult result)
        {
            var communities = new Dictionary<int, List<int>>();
            var actorNames = GetActorNames(result.CommunityList);

            foreach (var act in result.ActorToCommunity)
            {
                if (communities.ContainsKey(act.Value))
                {
                    communities[act.Value].Add(act.Key);
                }
                else
                {
                    communities[act.Value] = new List<int>
                    {
                        act.Key
                    };
                }
            }

            return communities
            .OrderBy(c => c.Key)
            .Select((c, i) => new AnalysisCommunityDetailViewModel
            {
                ActorCount = c.Value.Count,
                Actors = c.Value.Select(a => new ActorItem
                {
                    Idx = a,
                    Name = actorNames[a]
                }).ToList(),
                Name = "C" + i
            })
            .ToList();
        }

        private Dictionary<int, string> GetActorNames(string communityList)
        {
            var actorNames = new Dictionary<int, string>();
            var readingActors = false;
            foreach (var line in communityList.Split("\n"))
            {
                if (line.StartsWith("# Actors"))
                {
                    readingActors = true;
                    continue;
                }
                else if (line.StartsWith("#"))
                {
                    readingActors = false;
                }

                if (!readingActors)
                {
                    continue;
                }

                var values = line.Split(" ");
                var actor = int.Parse(values[0]);
                var name = values[1];

                actorNames[actor] = name;
            }
            return actorNames;
        }
    }
}
