using MNCD.Core;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms
{
    interface IFlatteningAlgorithm
    {
        Network Flatten(Network network, Dictionary<string, string> parameters);

        List<string> ValidateParameters(Network network, Dictionary<string, string> parameters);
    }
}
