using System.Collections.Generic;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IAnalysisSessionService
    {
        List<AnalysisSession> GetAnalysisSessions();

        AnalysisSession GetAnalysisSession(int id);

        AnalysisSession GetAnalysisSession(string guid);

        void AddAnalysisSession(string name);

        void UpdateAnalysisSession(int id, string name);

        void RemoveAnalysisSession(int id);
    }
}