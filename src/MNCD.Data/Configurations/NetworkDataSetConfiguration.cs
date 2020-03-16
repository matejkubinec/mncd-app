using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Domain.Entities;

namespace MNCD.Data.Configurations
{
    public class NetworkDataSetConfiguration : IEntityTypeConfiguration<NetworkDataSet>
    {
        public void Configure(EntityTypeBuilder<NetworkDataSet> builder)
        {
            builder.HasOne(s => s.Info);
        }
    }
}
