using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Readers;
using System.Linq;

namespace MNCD.Services.Impl
{
    public class ReaderService : IReaderService
    {
        private readonly MpxReader _mpxReader = new MpxReader();

        public NetworkInfo ReadMPX(string content)
        {
            var network = _mpxReader.FromString(content);
            return new NetworkInfo
            {
                NodeCount = network.Actors.Count(),
                EdgeCount = network.Layers.Sum(l => l.Edges.Count),
                LayerCount = network.Layers.Count()
            };
        }
    }
}
