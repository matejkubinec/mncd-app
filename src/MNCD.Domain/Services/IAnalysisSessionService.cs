using System.Collections.Generic;
using System.Threading.Tasks;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IAnalysisSessionService
    {
        List<AnalysisSession> GetAnalysisSessions();

        AnalysisSession GetAnalysisSession(int id);

        Task<AnalysisSession> GetAnalysisSession(string guid);

        void AddAnalysisSession(string name);

        void UpdateAnalysisSession(int id, string name);

        void RemoveAnalysisSession(int id);
    }
}