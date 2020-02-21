using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.Session;

namespace MNCD.Web.Mappings
{
    public class SessionRowViewModelProfile : Profile
    {
        public SessionRowViewModelProfile()
        {
            CreateMap<AnalysisSession, SessionRowViewModel>()
                .ForMember(
                    dest => dest.AnalysesCount,
                    opt => opt.MapFrom(src => src.Analyses.Count)
                );
        }
    }
}