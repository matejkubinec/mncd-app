using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;

namespace MNCD.Services.Impl
{
    public class NetworkDataSetService : INetworkDataSetService
    {
        private readonly MNCDContext _ctx;
        private readonly IReaderService _readerService;
        private readonly IHashService _hashService;
        private readonly IVisualizationService _visualizationService;

        public NetworkDataSetService(
            MNCDContext ctx,
            IHashService hashService,
            IReaderService readerService,
            IVisualizationService visualizationService)
        {
            _ctx = ctx;
            _hashService = hashService;
            _readerService = readerService;
            _visualizationService = visualizationService;
        }

        public async Task AddDataSet(string name, string content, FileType fileType)
        {
            var hash = _hashService.GetHashFor(content);
            var existing = await GetNetworkDataSetByHash(hash);

            if (existing != null)
            {
                if (existing.Deleted)
                {
                    existing.Deleted = false;
                    await _ctx.SaveChangesAsync();
                    return;
                }

                throw new ArgumentException($"DataSet already exists in the system with name {existing.Name}.");
            }

            var info = GetNetworkInfo(content, fileType);
            var edgeList = GetEdgeList(content, fileType);

            var dataSet = new NetworkDataSet
            {
                Name = name,
                Content = content,
                FileType = fileType,
                Hash = hash,
                Info = info,
            };

            await _ctx.DataSets.AddAsync(dataSet);
            await _ctx.SaveChangesAsync();
        }

        public async Task DeleteDataSet(int id)
        {
            var dataSet = await _ctx.DataSets.FindAsync(id);

            if (dataSet is null)
            {
                throw new ArgumentException($"DataSet with '{id}' was not found.");
            }

            dataSet.Deleted = true;
            await _ctx.SaveChangesAsync();
        }

        public async Task<NetworkDataSet> GetDataSet(int id)
        {
            return await _ctx
                .DataSets
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task UpdateDataSet(int id, string name)
        {
            var dataSet = await _ctx
                .DataSets
                .Include(d => d.Info)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (dataSet is null)
            {
                // TODO: custom exception
                throw new ArgumentException("Network was not found.");
            }

            dataSet.Name = name;

            await _ctx.SaveChangesAsync();
        }

        public async Task<List<NetworkDataSet>> GetDataSets()
        {
            return await _ctx
                .DataSets
                .Include(d => d.Info)
                .ToListAsync();
        }

        private async Task<NetworkDataSet> GetNetworkDataSetByHash(string hash)
        {
            return await _ctx.DataSets.FirstOrDefaultAsync(d => d.Hash == hash);
        }

        private NetworkInfo GetNetworkInfo(string content, FileType fileType)
        {
            switch (fileType)
            {
                case FileType.MPX:
                    return _readerService.ReadMPX(content);
                case FileType.EdgeList:
                    return _readerService.ReadEdgeList(content);
                default:
                    // TODO: custom exception
                    throw new ArgumentException("File type is not supported.");
            }
        }

        private string GetEdgeList(string content, FileType fileType)
        {
            switch (fileType)
            {
                case FileType.MPX:
                    return _readerService.ReadMPXToEdgeList(content);
                case FileType.EdgeList:
                    return content;
                default:
                    // TODO: custom exception
                    throw new ArgumentException("File type is not supported.");
            }
        }
    }
}