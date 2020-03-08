using MNCD.Core;
using System;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms.Flattening
{
    public class WeightedFlattening : IFlatteningAlgorithm
    {
        // TODO: finish up weighted flattening
        public Network Flatten(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }
            throw new NotImplementedException();
        }

        public List<string> ValidateParameters(Network network, Dictionary<string, string> parameters)
        {
            var errors = new List<string>();

            return errors;
        }
    }
}
