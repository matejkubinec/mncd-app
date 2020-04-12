using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Domain.Entities;

namespace MNCD.Data.Configurations
{
    public class AnalysisResultConfiguration : IEntityTypeConfiguration<AnalysisResult>
    {
        public void Configure(EntityTypeBuilder<AnalysisResult> builder)
        {
            builder
                .HasOne(r => r.Analysis)
                .WithOne(a => a.Result)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey<AnalysisResult>(r => r.AnalysisId);
        }
    }
}
