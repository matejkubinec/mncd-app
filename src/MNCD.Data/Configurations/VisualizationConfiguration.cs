using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MNCD.Domain.Entities;

namespace MNCD.Data.Configurations
{
    public class VisualizationConfiguration : IEntityTypeConfiguration<Visualization>
    {
        public void Configure(EntityTypeBuilder<Visualization> builder)
        {
        }
    }
}
