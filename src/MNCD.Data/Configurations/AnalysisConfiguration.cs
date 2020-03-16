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
                .HasOne(s => s.Session)
                .WithMany(s => s.Analyses)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(a => a.SessionId);

            builder
                .HasOne(s => s.Result)
                .WithOne(s => s.Analysis)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<AnalysisResult>(a => a.AnalysisId);

            builder
                .HasOne(s => s.Request)
                .WithOne(s => s.Analysis)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<AnalysisRequest>(a => a.AnalysisId);

            builder
                .HasMany(s => s.Visualizations)
                .WithOne(v => v.Analysis)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(v => v.AnalysisId);
        }
    }
}
