using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Data.Comparer;
using MNCD.Data.Converters;
using MNCD.Domain.Entities;
using System.Collections.Generic;

namespace MNCD.Data.Configurations
{
    public class AnalysisResultConfiguration : IEntityTypeConfiguration<AnalysisResult>
    {
        public void Configure(EntityTypeBuilder<AnalysisResult> builder)
        {
            var dictConverter = new DictionaryConverter<int, int>();
            var dictJsonComparer = new JsonComparer<Dictionary<int, int>>();
            var listConverter = new ListConverter<double?>();
            var listJsonComparer = new JsonComparer<List<double?>>();

            //builder
            //    .HasOne(s => s.Analysis)
            //    .WithOne(a => a.Result);

            builder
                .Property(e => e.ActorToCommunity)
                .HasConversion(dictConverter)
                .Metadata.SetValueComparer(dictJsonComparer);

            builder
                .Property(e => e.Varieties)
                .HasConversion(listConverter)
                .Metadata.SetValueComparer(listJsonComparer);

            builder
                .Property(e => e.Exclusivities)
                .HasConversion(listConverter)
                .Metadata.SetValueComparer(listJsonComparer);

            builder
                .Property(e => e.Homogenities)
                .HasConversion(listConverter)
                .Metadata.SetValueComparer(listJsonComparer);
        }
    }
}
