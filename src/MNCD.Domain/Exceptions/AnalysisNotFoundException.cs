namespace MNCD.Domain.Exceptions
{
    public class AnalysisNotFoundException : NotFoundException
    {
        public AnalysisNotFoundException(string message) : base(message)
        {
        }
    }
}