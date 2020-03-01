using System.Collections.Generic;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IAnalysisService
    {
        List<Analysis> GetAnalysesForSession(int sessionId);

        Analysis GetAnalysis(int id);

        Analysis Analyze(int sessionId, AnalysisRequest request, bool visualize);

        void RemoveFromSession(int sessionId, int analysisId);
    }
}