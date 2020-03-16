using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Data.Comparer;
using MNCD.Data.Converters;
using MNCD.Domain.Entities;
using System.Collections.Generic;

namespace MNCD.Data.Configurations
{
    public class AnalysisRequestConfiguration : IEntityTypeConfiguration<AnalysisRequest>
    {
        public void Configure(EntityTypeBuilder<AnalysisRequest> builder)
        {
            var dictConverter = new DictionaryConverter<string, string>();
            var dictJsonComparer = new JsonComparer<Dictionary<string, string>>();

            //builder
            //    .HasOne(s => s.DataSet);

            //builder
            //    .HasOne(s => s.Analysis)
            //    .WithOne(a => a.Request);

            builder
                .Property(e => e.AnalysisAlgorithmParameters)
                .HasConversion(dictConverter)
                .Metadata.SetValueComparer(dictJsonComparer);

            builder
                .Property(e => e.FlatteningAlgorithmParameters)
                .HasConversion(dictConverter)
                .Metadata.SetValueComparer(dictJsonComparer);
        }
    }
}
