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
                    dest => dest.EdgeCount,
                    opt => opt.MapFrom(src => src.NetworkInfo.EdgeCount)
                )
                .ForMember(
                    dest => dest.NodeCount,
                    opt => opt.MapFrom(src => src.NetworkInfo.NodeCount)
                )
                .ForMember(
                    dest => dest.LayerCount,
                    opt => opt.MapFrom(src => src.NetworkInfo.LayerCount)
                )
                .ForMember(
                    dest => dest.LayerNames,
                    opt => opt.MapFrom(src => src.NetworkInfo.LayerNames)
                )
                .ForMember(
                    dest => dest.ActorNames,
                    opt => opt.MapFrom(src => src.NetworkInfo.ActorNames)
                )
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
