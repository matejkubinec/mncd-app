using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Data.Comparer;
using MNCD.Data.Converters;
using MNCD.Domain.Entities;
using System.Collections.Generic;

namespace MNCD.Data.Configurations
{
    public class NetworkInfoConfiguration : IEntityTypeConfiguration<NetworkInfo>
    {
        public void Configure(EntityTypeBuilder<NetworkInfo> builder)
        {
            var listConverter = new ListConverter<string>();
            var listJsonComparer = new JsonComparer<List<string>>();

            builder
                .Property(e => e.LayerNames)
                .HasConversion(listConverter)
                .Metadata.SetValueComparer(listJsonComparer);
        }
    }
}
