using System;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Extensions
{
    public static class FileTypeExtensions
    {
        public static string ToExtension(this FileType type) => type switch
        {
            FileType.MPX => ".mpx",
            FileType.EdgeList => ".edgelist.txt",
            _ => throw new NotSupportedException($"File type '{type}' cannot be converted to extension.")
        };
    }
}
