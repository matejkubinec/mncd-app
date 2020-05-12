using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IReaderService
    {
        string ReadMPXToEdgeList(string content);

        string ReadEdgeListToString(string content);
    }
}
