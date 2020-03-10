using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.Analysis;

namespace MNCD.Web.Mappings
{
    public class AnalysisVisualizationItemViewModelProfile : Profile
    {
        public AnalysisVisualizationItemViewModelProfile()
        {
            CreateMap<Visualization, AnalysisVisualizationItemViewModel>()
                .ForMember(
                    dest => dest.Url,
                    opt => opt.MapFrom(src => "api/dataset/visualization/" + src.Id)
                );
        }
    }
}