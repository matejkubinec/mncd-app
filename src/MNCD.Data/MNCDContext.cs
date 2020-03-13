using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using MNCD.Domain.Entities;
using Newtonsoft.Json;

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
            builder
                .Entity<AnalysisRequest>()
                .Property(e => e.AnalysisAlgorithmParameters)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<Dictionary<string, string>>(v)
                );

            builder
                .Entity<AnalysisRequest>()
                .Property(e => e.FlatteningAlgorithmParameters)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<Dictionary<string, string>>(v)
                );

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.ActorToCommunity)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<Dictionary<int, int>>(v)
                );

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Varieties)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<List<double?>>(v)
                );

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Exclusivities)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<List<double?>>(v)
                );

            builder
                .Entity<AnalysisResult>()
                .Property(e => e.Homogenities)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<List<double?>>(v)
                );

            builder
                .Entity<NetworkInfo>()
                .Property(e => e.LayerNames)
                .HasConversion(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<List<string>>(v)
                );
        }
    }
}