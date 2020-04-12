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
                .HasForeignKey(s => s.AnalysisSessionId);

            builder
                .HasOne(a => a.Result)
                .WithOne(r => r.Analysis)
                .HasForeignKey<Analysis>(a => a.ResultId)
                .HasForeignKey<AnalysisResult>(r => r.AnalysisId);

            builder
                .HasOne(a => a.Request)
                .WithOne(r => r.Analysis)
                .HasForeignKey<AnalysisRequest>(r => r.AnalysisId)
                .HasForeignKey<Analysis>(a => a.RequestId);

            builder
                .HasMany(a => a.Visualizations);
        }
    }
}
