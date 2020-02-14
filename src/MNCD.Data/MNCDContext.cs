using Microsoft.EntityFrameworkCore;
using MNCD.Data.Converters;
using MNCD.Domain.Entities;

namespace MNCD.Data
{
    public class MNCDContext : DbContext
    {
        public DbSet<AnalysisSession> AnalysisSessions { get; set; }
        public DbSet<AnalysisRequest> AnalysisRequests { get; set; }
        public DbSet<Analysis> Analyses { get; set; }
        public DbSet<NetworkDataSet> DataSets { get; set; }

        public MNCDContext(DbContextOptions<MNCDContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<AnalysisRequest>()
                .Property(e => e.AnalysisAlgorithmParameters)
                .HasConversion<DictionaryConverter>();

            modelBuilder
                .Entity<AnalysisRequest>()
                .Property(e => e.FlattenningAlgorithmParameters)
                .HasConversion<DictionaryConverter>();
        }
    }
}