using System.IO;
using MNCD.Domain.Entities;

namespace MNCD.Tests.Helpers
{
    public static class DataSetHelper
    {
        public static readonly NetworkDataSet Florentine = new NetworkDataSet
        {
            Name = "Florentine",
            FileType = FileType.MPX,
            Info = new NetworkInfo
            {
                EdgeCount = 35,
                NodeCount = 16,
                LayerCount = 2
            },
            Content = File.ReadAllText("Networks/florentine.mpx")
        };

        public static readonly NetworkDataSet LouvainTest = new NetworkDataSet
        {
            Name = "Louvain",
            FileType = FileType.MPX,
            Info = new NetworkInfo
            {
                EdgeCount = 5,
                NodeCount = 6,
                LayerCount = 1
            },
            Content = File.ReadAllText("Networks/louvain.mpx")
        };
    }
}
