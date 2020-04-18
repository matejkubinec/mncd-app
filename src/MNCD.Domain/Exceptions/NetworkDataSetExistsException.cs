using System;

namespace MNCD.Domain.Exceptions
{
    public class NetworkDataSetExistsException : Exception
    {
        public NetworkDataSetExistsException(string message) : base(message)
        {
        }
    }
}