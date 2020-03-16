using Microsoft.EntityFrameworkCore;
using MNCD.Domain.Entities;
using System.Reflection;

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
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}