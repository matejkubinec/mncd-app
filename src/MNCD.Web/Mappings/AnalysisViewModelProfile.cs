using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.Analysis;

namespace MNCD.Web.Mappings
{
    public class AnalysisViewModelProfile : Profile
    {
        public AnalysisViewModelProfile()
        {
            CreateMap<Analysis, AnalysisViewModel>()
                .ForMember(
                    dest => dest.Visualization,
                    opt => opt.MapFrom(src => new AnalysisVisualizationViewModel
                    {
                        MultiLayer = Map(src.MultiLayer),
                        MultiLayerCommunities = Map(src.MultiLayerCommunities),
                        SingleLayer = Map(src.SingleLayer),
                        SingleLayerCommunities = Map(src.SingleLayerCommunities),
                        CommunitiesBarplot = Map(src.CommunitiesBarplot),
                        CommunitiesTreemap = Map(src.CommunitiesTreemap)
                    })
                );
        }

        private List<AnalysisVisualizationItemViewModel> Map(List<Visualization> src)
        {
            return src.Select(s => Map(s)).ToList();
        }

        private AnalysisVisualizationItemViewModel Map(Visualization src)
        {
            return new AnalysisVisualizationItemViewModel
            {
                Title = src.Title,
                Url = "api/visualization/" + src.Id
            };
        }
    }
}
