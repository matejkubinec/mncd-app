namespace MNCD.Domain.Entities
{
    public class Analysis
    {
        public int Id { get; set; }
        public AnalysisRequest Request { get; set; }
        public AnalysisResult Result { get; set; }
    }
}