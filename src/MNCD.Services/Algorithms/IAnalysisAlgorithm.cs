using MNCD.Core;
using MNCD.Domain.Entities;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms
{
    public interface IAnalysisAlgorithm
    {
        AnalysisResult Analyze(Network network, Dictionary<string, string> parameters);

        List<string> ValidateParameters(Network network, Dictionary<string, string> parameters);
    }
}
