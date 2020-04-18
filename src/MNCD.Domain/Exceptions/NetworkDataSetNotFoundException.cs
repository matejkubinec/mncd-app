namespace MNCD.Domain.Exceptions
{
    public class NetworkDataSetNotFoundException : NotFoundException
    {
        public NetworkDataSetNotFoundException(string message) : base(message)
        {
        }
    }
}