using Microsoft.EntityFrameworkCore;
using MNCD.Data.Converters;
using MNCD.Domain.Entities;

namespace MNCD.Data
{
    public class MNCDContext : DbContext
    {
        public DbSet<AnalysisSession> AnalysisSessions { get; set; }

        public DbSet<AnalysisRequest> AnalysisRequests { get; set; }

        public DbSet<AnalysisResult> AnalysisResult { get; set; }

        public DbSet<Analysis> Analyses { get; set; }

        public DbSet<NetworkDataSet> DataSets { get; set; }

        public DbSet<NetworkInfo> NetworkInfos { get; set; }

        public DbSet<Visualization> Visualizations { get; set; }

        public MNCDContext()
        {
        }

        public MNCDContext(DbContextOptions<MNCDContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            var dictStringConverter = new DictionaryJsonConverter<string, string>();
            var dictIntConverter = new DictionaryJsonConverter<int, int>();
            var listDoubleConverter = new ListJsonConverter<double>();
            var listStringConverter = new ListJsonConverter<string>();

            builder
                .Entity<AnalysisRequest>()
                .Property(e => e.AnalysisAlgorithmParameters)
                .HasConversion(dictStringConverter);

            builder
                .Entity<AnalysisRequest>()
                .Property(e => e.FlatteningAlgorithmParameters)
                .HasConversion(dictStringConverter);

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.ActorToCommunity)
                .HasConversion(dictIntConverter);

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Varieties)
                .HasConversion(listDoubleConverter);

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Exclusivities)
                .HasConversion(listDoubleConverter);

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Homogenities)
                .HasConversion(listDoubleConverter);

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Performances)
                .HasConversion(listDoubleConverter);

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Coverages)
                .HasConversion(listDoubleConverter);

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Modularities)
                .HasConversion(listDoubleConverter);

            builder
                .Entity<NetworkInfo>()
                .Property(e => e.LayerNames)
                .HasConversion(listStringConverter);

            builder
                .Entity<NetworkInfo>()
                .Property(e => e.ActorNames)
                .HasConversion(listStringConverter);
        }
    }
}