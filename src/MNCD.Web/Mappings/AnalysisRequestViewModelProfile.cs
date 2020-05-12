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
                    opt => opt.MapFrom(src => src.DataSet.Id)
                )
                .ForMember(
                    dst => dst.DataSetName,
                    opt => opt.MapFrom(src => src.DataSet.Name)
                )
                .ForMember(
                    dst => dst.SelectedLayerName,
                    opt => opt.MapFrom(src => src.DataSet.LayerNames[src.SelectedLayer])
                );
            CreateMap<AnalysisRequestViewModel, AnalysisRequest>();
        }
    }
}
