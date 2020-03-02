using System.Collections.Generic;
using System.Threading.Tasks;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IAnalysisSessionService
    {
        Task<List<AnalysisSession>> GetAnalysisSessions();

        Task<AnalysisSession> GetAnalysisSession(int id);

        Task<AnalysisSession> GetAnalysisSession(string guid);

        Task AddAnalysisSession(string name);

        Task UpdateAnalysisSession(int id, string name);

        Task RemoveAnalysisSession(int id);
    }
}