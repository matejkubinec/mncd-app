namespace MNCD.Domain.Entities
{
    public class Analysis
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public AnalysisRequest Request { get; set; }
    }
}