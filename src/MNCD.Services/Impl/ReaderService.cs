using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Readers;
using MNCD.Writers;
using System.Linq;

namespace MNCD.Services.Impl
{
    public class ReaderService : IReaderService
    {
        private readonly MpxReader _mpxReader = new MpxReader();
        private readonly EdgeListReader _edgeListReader = new EdgeListReader();
        private readonly EdgeListWriter _edgeListWriter = new EdgeListWriter();

        public NetworkInfo ReadMPX(string content)
        {
            var network = _mpxReader.FromString(content);
            return new NetworkInfo
            {
                NodeCount = network.Actors.Count(),
                EdgeCount = network.Layers.Sum(l => l.Edges.Count),
                LayerCount = network.LayerCount
            };
        }

        public string ReadMPXToEdgeList(string content)
        {
            var network = _mpxReader.FromString(content);
            return _edgeListWriter.ToString(network, true);
        }

        public string ReadEdgeListToString(string content)
        {
            var network = _edgeListReader.FromString(content);
            return _edgeListWriter.ToString(network, true);
        }

        public NetworkInfo ReadEdgeList(string content)
        {
            var network = _edgeListReader.FromString(content);
            return new NetworkInfo
            {
                NodeCount = network.Actors.Count(),
                EdgeCount = network.Layers.SelectMany(l => l.Edges).Count(),
                LayerCount = network.LayerCount
            };
        }
    }
}
