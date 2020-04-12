using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Domain.Entities;

namespace MNCD.Data.Configurations
{
    public class NetworkInfoConfiguration : IEntityTypeConfiguration<NetworkInfo>
    {
        public void Configure(EntityTypeBuilder<NetworkInfo> builder)
        {
            builder
                .HasOne(i => i.NetworkDataSet)
                .WithOne(d => d.NetworkInfo)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<NetworkInfo>(i => i.NetworkDataSetId);
        }
    }
}
