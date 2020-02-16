using System.Collections.Generic;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IAnalysisService
    {
        List<Analysis> GetAnalysesForSession(int sessionId);

        Analysis GetAnalysis(int id);

        void Analyze(AnalysisRequest request);

        void RemoveFromSession(int sessionId, int analysisId);
    }
}