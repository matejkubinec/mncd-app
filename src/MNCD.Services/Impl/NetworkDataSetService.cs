using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using System.Linq;

namespace MNCD.Services.Impl
{
    public class NetworkDataSetService : INetworkDataSetService
    {
        private readonly MNCDContext _ctx;
        private readonly IReaderService _readerService;
        private readonly IHashService _hashService;

        public NetworkDataSetService(
            MNCDContext ctx,
            IHashService hashService,
            IReaderService readerService)
        {
            _ctx = ctx;
            _hashService = hashService;
            _readerService = readerService;
        }

        public async Task<NetworkDataSet> AddDataSet(string name, string content, FileType fileType)
        {
            var hash = _hashService.GetHashFor(content);
            var existing = await GetNetworkDataSetByHash(hash);

            if (existing != null)
            {
                if (existing.Deleted)
                {
                    existing.Deleted = false;
                    await _ctx.SaveChangesAsync();
                    return existing;
                }

                throw new ArgumentException($"DataSet already exists in the system with name {existing.Name}.");
            }

            var info = GetNetworkInfo(content, fileType);
            var edgeList = GetEdgeList(content, fileType);

            var dataSet = new NetworkDataSet
            {
                Name = name,
                Content = content,
                EdgeList = edgeList,
                FileType = fileType,
                Hash = hash,
                Info = info,
            };

            await _ctx.DataSets.AddAsync(dataSet);
            await _ctx.SaveChangesAsync();

            return dataSet;
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

        public async Task<NetworkDataSet> UpdateDataSet(int id, string name)
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

            return dataSet;
        }

        public async Task<List<NetworkDataSet>> GetDataSets()
        {
            return await _ctx
                .DataSets
                .Include(d => d.Info)
                .Where(d => !d.Deleted)
                .ToListAsync();
        }

        private async Task<NetworkDataSet> GetNetworkDataSetByHash(string hash)
        {
            return await _ctx.DataSets
                .Include(d => d.Info)
                .FirstOrDefaultAsync(d => d.Hash == hash);
        }

        private NetworkInfo GetNetworkInfo(string content, FileType fileType) => fileType switch
        {
            FileType.MPX => _readerService.ReadMPX(content),
            FileType.EdgeList => _readerService.ReadEdgeList(content),
            _ => throw new ArgumentException("File type is not supported."),// TODO: custom exception
        };

        private string GetEdgeList(string content, FileType fileType) => fileType switch
        {
            FileType.MPX => _readerService.ReadMPXToEdgeList(content),
            FileType.EdgeList => _readerService.ReadEdgeListToString(content),
            _ => throw new ArgumentException("File type is not supported."),// TODO: custom exception
        };
    }
}