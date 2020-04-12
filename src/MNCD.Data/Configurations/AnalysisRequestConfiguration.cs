using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Domain.Entities;

namespace MNCD.Data.Configurations
{
    public class AnalysisRequestConfiguration : IEntityTypeConfiguration<AnalysisRequest>
    {
        public void Configure(EntityTypeBuilder<AnalysisRequest> builder)
        {
            builder
                .HasOne(r => r.Analysis)
                .WithOne(a => a.Request)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<AnalysisRequest>(r => r.AnalysisId);

            builder
                .HasOne(r => r.DataSet)
                .WithMany(d => d.Requests)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(r => r.DataSetId);
        }
    }
}
