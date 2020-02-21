namespace MNCD.Domain.Entities
{
    public class Visualization
    {
        public int Id { get; set; }
        public VisualizationType Type { get; set; }
        public string SvgImage { get; set; }
    }
}
