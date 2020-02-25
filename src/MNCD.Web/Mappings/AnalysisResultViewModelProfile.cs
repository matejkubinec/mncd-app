using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.Analysis;
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
                    opt => opt.MapFrom(src => src.Varieties.Average())
                )
                .ForMember(
                    dst => dst.AverageExclusivity,
                    opt => opt.MapFrom(src => src.Exclusivities.Average())
                )
                .ForMember(
                    dst => dst.AverageHomogenity,
                    opt => opt.MapFrom(src => src.Homogenities.Average())
                );

            CreateMap<AnalysisResultViewModel, AnalysisResult>();
        }
    }
}
