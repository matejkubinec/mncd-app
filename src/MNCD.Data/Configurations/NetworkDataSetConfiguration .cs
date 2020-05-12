using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Domain.Entities;

namespace MNCD.Data.Configurations
{
    public class NetworkDataSetConfiguration : IEntityTypeConfiguration<NetworkDataSet>
    {
        public void Configure(EntityTypeBuilder<NetworkDataSet> builder)
        {
            builder
                .HasMany(s => s.Requests)
                .WithOne(a => a.DataSet)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(r => r.DataSetId);
        }
    }
}
