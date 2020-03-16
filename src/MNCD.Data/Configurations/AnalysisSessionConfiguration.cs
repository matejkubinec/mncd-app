using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Domain.Entities;

namespace MNCD.Data.Configurations
{
    public class AnalysisSessionConfiguration : IEntityTypeConfiguration<AnalysisSession>
    {
        public void Configure(EntityTypeBuilder<AnalysisSession> builder)
        {
            builder
                .HasMany(s => s.Analyses)
                .WithOne(a => a.Session)
                .OnDelete(DeleteBehavior.Cascade)
                .HasForeignKey(a => a.SessionId);
        }
    }
}
