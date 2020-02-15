using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MNCD.Services.Impl
{
    public class NetworkDataSetService : INetworkDataSetService
    {
        private readonly MNCDContext _ctx;
        private readonly IReaderService _readerService;
        private readonly IHashService _hashService;

        public NetworkDataSetService(MNCDContext ctx, IHashService hashService, IReaderService readerService)
        {
            _ctx = ctx;
            _hashService = hashService;
            _readerService = readerService;
        }

        public void AddDataSet(string name, string content, FileType fileType)
        {
            // TODO: change to content
            var hash = _hashService.GetHashFor(name);

            if (ExistsNetworkDataSet(hash))
            {
                return;
            }

            var info = GetNetworkInfo(content, fileType);
            var dataSet = new NetworkDataSet
            {
                Name = name,
                Content = content,
                FileType = fileType,
                Hash = hash,
                Info = info
            };

            // TODO: switch to async methods
            _ctx.DataSets.Add(dataSet);
            _ctx.SaveChanges();
        }

        public void DeleteDataSet(int id)
        {
            throw new System.NotImplementedException();
        }

        public NetworkDataSet GetDataSet(int id)
        {
            // TODO: switch to async
            return _ctx.DataSets.Find(id);
        }

        public IList<NetworkDataSet> GetDataSets()
        {
            return _ctx
                .DataSets
                .Include(d => d.Info)
                .ToList();
        }

        public void UpdateDataSet(int id, string name)
        {
            // TODO: switch to async
            var dataSet = _ctx
                .DataSets
                .Include(d => d.Info)
                .FirstOrDefault(d => d.Id == id);

            if (dataSet == null)
            {
                // TODO: custom exception
                throw new ArgumentException("Network was not found.");
            }

            dataSet.Name = name;

            // TODO: switch to async
            _ctx.SaveChanges();
        }

        private bool ExistsNetworkDataSet(string hash)
        {
            return _ctx.DataSets.Any(d => d.Hash == hash);
        }

        private NetworkInfo GetNetworkInfo(string content, FileType fileType)
        {
            switch (fileType)
            {
                case FileType.MPX:
                    return _readerService.ReadMPX(content);
                default:
                    // TODO: custom exception
                    throw new ArgumentException("File type is not supported.");
            }
        }
    }
}