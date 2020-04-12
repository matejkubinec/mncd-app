using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Domain.Entities;

namespace MNCD.Data.Configurations
{
    public class AnalysisConfiguration : IEntityTypeConfiguration<Analysis>
    {
        public void Configure(EntityTypeBuilder<Analysis> builder)
        {
            builder
                .HasOne(a => a.AnalysisSession)
                .WithMany(s => s.Analyses)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(s => s.AnalysisSessionId);

            builder
                .HasOne(a => a.Result)
                .WithOne(r => r.Analysis)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<AnalysisResult>(r => r.AnalysisId);

            builder
                .HasOne(a => a.Request)
                .WithOne(r => r.Analysis)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<AnalysisRequest>(r => r.AnalysisId);

            builder
                .HasMany(a => a.Visualizations);
        }
    }
}
