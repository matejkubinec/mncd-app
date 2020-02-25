using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.Analysis;

namespace MNCD.Web.Mappings
{
    public class AnalysisViewModelProfile : Profile
    {
        public AnalysisViewModelProfile()
        {
            CreateMap<Analysis, AnalysisViewModel>();
            CreateMap<AnalysisViewModel, Analysis>();
        }
    }
}
