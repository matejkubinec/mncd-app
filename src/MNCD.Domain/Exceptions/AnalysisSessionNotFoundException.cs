namespace MNCD.Domain.Exceptions
{
    public class AnalysisSessionNotFoundException : NotFoundException
    {
        public AnalysisSessionNotFoundException(string message) : base(message)
        {
        }
    }
}