using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.Analysis;

namespace MNCD.Web.Mappings
{
    public class AnalysisRequestViewModelProfile : Profile
    {
        public AnalysisRequestViewModelProfile()
        {
            CreateMap<AnalysisRequest, AnalysisRequestViewModel>()
                .ForMember(
                    dst => dst.DatasetId,
                    opt => opt.MapFrom(src => src.Dataset.Id)
                );
            CreateMap<AnalysisRequestViewModel, AnalysisRequest>();
        }
    }
}