using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.Analysis;

namespace MNCD.Web.Mappings
{
    public class AnalysisSessionViewModelProfile : Profile
    {
        public AnalysisSessionViewModelProfile()
        {
            CreateMap<AnalysisSession, AnalysisSessionViewModel>();
            CreateMap<AnalysisSessionViewModel, AnalysisSession>();
        }
    }
}