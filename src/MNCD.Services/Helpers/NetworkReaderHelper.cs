using MNCD.Core;
using MNCD.Domain.Entities;
using MNCD.Readers;
using System;

namespace MNCD.Services.Helpers
{
    public static class NetworkReaderHelper
    {
        public static Network ReadDataSet(NetworkDataSet dataSet)
        {
            return dataSet.FileType switch
            {
                FileType.MPX => new MpxReader().FromString(dataSet.Content),
                FileType.EdgeList => new EdgeListReader().FromString(dataSet.Content),
                _ => throw new ApplicationException("Unsupported file type."),
            };
        }
    }
}
