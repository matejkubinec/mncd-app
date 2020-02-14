using MNCD.Domain.Entities;
using System.Collections.Generic;

namespace MNCD.Domain.Services
{
    public interface INetworkDataSetService
    {
        IList<NetworkDataSet> GetDataSets();

        NetworkDataSet GetDataSet(int id);

        void AddDataSet(int id, string name, string content, FileType fileType);

        void UpdateDataSet(int id, string name);

        void DeleteDataSet(int id);
    }
}