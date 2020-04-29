using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using MNCD.Domain.Entities;

namespace MNCD.Domain.Services
{
    public interface IAnalysisService
    {
        Task<List<Analysis>> GetAnalysesForSession(int sessionId);

        Task<Analysis> GetAnalysis(int id);

        Task<Analysis> Analyze(int sessionId, int dataSetId, AnalysisRequest request);

        Task ToggleVisibility(int id);

        Task Delete(int analysisId);

        Task ArchiveAnalysis(int analysisId, Stream outStream);
    }
}