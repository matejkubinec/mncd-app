using System.Collections.Generic;
using System.Threading.Tasks;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IAnalysisService
    {
        Task<List<Analysis>> GetAnalysesForSession(int sessionId);

        Task<Analysis> GetAnalysis(int id);

        Task<Analysis> Analyze(int sessionId, int dataSetId, AnalysisRequest request, bool visualize);

        Task<Analysis> AddVisualizations(int id);

        Task ToggleVisibility(int id);

        Task RemoveFromSession(int sessionId, int analysisId);
    }
}