using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.DataSet;

namespace MNCD.Web.Mappings
{
    public class DataSetRowViewModelProfile : Profile
    {
        public DataSetRowViewModelProfile()
        {
            CreateMap<NetworkDataSet, DataSetRowViewModel>()
                .ForMember(
                    dest => dest.EdgeCount,
                    opt => opt.MapFrom(src => src.Info.EdgeCount)
                )
                .ForMember(
                    dest => dest.NodeCount,
                    opt => opt.MapFrom(src => src.Info.NodeCount)
                )
                .ForMember(
                    dest => dest.LayerCount,
                    opt => opt.MapFrom(src => src.Info.LayerCount)
                );
        }
    }
}