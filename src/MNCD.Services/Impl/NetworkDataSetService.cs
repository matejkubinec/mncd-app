using Microsoft.EntityFrameworkCore;
using MNCD.Core;
using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Readers;
using MNCD.Writers;
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

        public void AddDataSet(string name, string content, FileType fileType)
        {
            var hash = _hashService.GetHashFor(content);

            if (ExistsNetworkDataSet(hash) && false)
            {
                // TODO: Throw exception or something
                return;
            }

            var info = GetNetworkInfo(content, fileType);
            var network = GetNetwork(content, fileType);
            var edgeList = GetEdgeList(network);
            var visualization = GetVisualisation(edgeList, VisualizationType.Diagonal);

            var dataSet = new NetworkDataSet
            {
                Name = name,
                Content = content,
                EdgeList = edgeList,
                FileType = fileType,
                Hash = hash,
                Info = info,
                Visualization = visualization
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
            return _ctx
                .DataSets
                .Include(d => d.Visualization)
                .FirstOrDefault(d => d.Id == id);
        }

        public IList<NetworkDataSet> GetDataSets()
        {
            return _ctx
                .DataSets
                .Include(d => d.Info)
                .Include(d => d.Visualization)
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
                case FileType.EdgeList:
                    throw new NotImplementedException();
                default:
                    // TODO: custom exception
                    throw new ArgumentException("File type is not supported.");
            }
        }

        private Network GetNetwork(string content, FileType fileType)
        {
            if (fileType != FileType.MPX)
            {
                throw new ArgumentException("File type is not supported");
            }

            var reader = new MpxReader();

            return reader.FromString(content);
        }

        private string GetEdgeList(Network network)
        {
            var writer = new EdgeListWriter();
            return writer.ToString(network);
        }

        private Visualization GetVisualisation(string edgeList, VisualizationType type)
        {
            return _visualizationService.VisualiseMultilayer(edgeList, type);
        }
    }
}