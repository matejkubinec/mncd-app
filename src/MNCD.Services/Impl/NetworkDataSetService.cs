using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using System.Linq;
using MNCD.Core;
using MNCD.Readers;
using MNCD.Writers;
using MNCD.Domain.Exceptions;

namespace MNCD.Services.Impl
{
    public class NetworkDataSetService : INetworkDataSetService
    {
        private static readonly MpxReader _mpxReader = new MpxReader();
        private static readonly EdgeListReader _edgeListReader = new EdgeListReader();
        private static readonly EdgeListWriter _edgeListWriter = new EdgeListWriter();

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
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Name must not be empty.", nameof(name));
            }

            if (string.IsNullOrEmpty(content))
            {
                throw new ArgumentException("Content must not be empty.", nameof(content));
            }

            var hash = _hashService.GetHashFor(content);

            if (await ExistsDataSet(hash))
            {
                throw new NetworkDataSetExistsException($"Data set already exists in the system.");
            }

            var network = ReadNetwork(content, fileType);
            var info = GetInfo(network);
            var edgeList = GetEdgeList(network);

            var dataSet = new NetworkDataSet
            {
                Name = name,
                Content = content,
                EdgeList = edgeList,
                FileType = fileType,
                Hash = hash,
                NetworkInfo = info,
            };

            await _ctx.DataSets.AddAsync(dataSet);
            await _ctx.SaveChangesAsync();

            return dataSet;
        }

        public async Task DeleteDataSet(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id must be greater than zero.", nameof(id));
            }

            var dataSet = await _ctx.DataSets.FindAsync(id);

            if (dataSet is null)
            {
                throw new NetworkDataSetNotFoundException($"Data set with '{id}' was not found.");
            }

            dataSet.Deleted = true;
            await _ctx.SaveChangesAsync();
        }

        public async Task<NetworkDataSet> GetDataSet(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id must be greater than zero.", nameof(id));
            }

            var dataSet = await _ctx
                .DataSets
                .Include(d => d.NetworkInfo)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (dataSet is null)
            {
                throw new NetworkDataSetNotFoundException($"Data set with id '{id}' was not found.");
            }

            return dataSet;
        }

        public async Task<NetworkDataSet> UpdateDataSet(int id, string name)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Id must be greater than zero.", nameof(id));
            }

            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Name must not be empty.", nameof(name));
            }

            var dataSet = await GetDataSet(id);

            dataSet.Name = name;

            await _ctx.SaveChangesAsync();

            return dataSet;
        }

        public async Task<List<NetworkDataSet>> GetDataSets()
        {
            return await _ctx
                .DataSets
                .Include(d => d.NetworkInfo)
                .Where(d => !d.Deleted)
                .ToListAsync();
        }

        private async Task<bool> ExistsDataSet(string hash)
        {
            return await _ctx.DataSets.AnyAsync(d => d.Hash == hash && !d.Deleted);
        }

        private string GetEdgeList(Network network)
        {
            return _edgeListWriter.ToString(network, true);
        }

        private NetworkInfo GetInfo(Network network)
        {
            return new NetworkInfo
            {
                NodeCount = network.ActorCount,
                EdgeCount = network.Layers.Sum(l => l.Edges.Count) + network.InterLayerEdges.Count,
                LayerCount = network.LayerCount,
                ActorNames = network.Actors.Select(a => a.Name).ToList(),
                LayerNames = network.Layers.Select(l => l.Name).ToList()
            };
        }

        private Network ReadNetwork(string content, FileType fileType)
        {
            return fileType switch
            {
                FileType.MPX => _mpxReader.FromString(content),
                FileType.EdgeList => _edgeListReader.FromString(content),
                _ => throw new ArgumentException($"File type '{fileType}' is not supported.")
            };
        }
    }
}
