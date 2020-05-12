using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Web.Models.DataSet;

namespace MNCD.Web.Mappings
{
    public class DataSetRowViewModelProfile : Profile
    {
        public DataSetRowViewModelProfile()
        {
            CreateMap<NetworkDataSet, DataSetRowViewModel>();
        }
    }
}
