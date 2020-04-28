using System.Collections.Generic;
using System.Threading.Tasks;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IAnalysisSessionService
    {
        Task<List<AnalysisSession>> GetAnalysisSessions();

        Task<AnalysisSession> GetAnalysisSession(int id);

        Task<AnalysisSession> AddAnalysisSession(string name);

        Task<AnalysisSession> UpdateAnalysisSession(int id, string name);

        Task RemoveAnalysisSession(int id);
    }
}