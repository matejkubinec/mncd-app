using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IReaderService
    {
        NetworkInfo ReadMPX(string content);
        string ReadMPXToEdgeList(string content);

        NetworkInfo ReadEdgeList(string content);
    }
}
