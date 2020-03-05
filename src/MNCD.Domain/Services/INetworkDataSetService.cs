using MNCD.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MNCD.Domain.Services
{
    public interface INetworkDataSetService
    {
        Task<List<NetworkDataSet>> GetDataSets();

        Task<NetworkDataSet> GetDataSet(int id);

        Task AddDataSet(string name, string content, FileType fileType);

        Task UpdateDataSet(int id, string name);

        Task DeleteDataSet(int id);
    }
}