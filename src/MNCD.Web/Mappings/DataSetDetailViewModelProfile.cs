using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.DataSet;

namespace MNCD.Web.Mappings
{
    public class DataSetDetailViewModelProfile : Profile
    {
        public DataSetDetailViewModelProfile()
        {
            CreateMap<NetworkDataSet, DataSetDetailViewModel>()
                .ForMember(
                    dest => dest.DiagonalUrl,
                    opt => opt.MapFrom(src => $"/api/visualization/dataset/{src.Id}/{VisualizationType.MultiLayer_Diagonal}")
                )
                .ForMember(
                    dest => dest.SlicesUrl,
                    opt => opt.MapFrom(src => $"/api/visualization/dataset/{src.Id}/{VisualizationType.MultiLayer_Slices}")
                );
        }
    }
}
