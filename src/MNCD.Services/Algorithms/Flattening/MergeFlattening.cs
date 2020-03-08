using MNCD.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MNCD.Services.Algorithms.Flattening
{
    public class MergeFlattening : IFlatteningAlgorithm
    {
        private readonly static MNCD.Flattening.MergeFlattening Algorithm = new MNCD.Flattening.MergeFlattening();

        public Network Flatten(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }
            var includeWeights = bool.Parse(parameters["includeWeights"]);
            var layerIndices = JsonConvert.DeserializeObject<int[]>(parameters["layerIndices"]);
            return Algorithm.Merge(network, layerIndices, includeWeights);
        }

        public List<string> ValidateParameters(Network network, Dictionary<string, string> parameters)
        {
            var errors = new List<string>();

            if (parameters.ContainsKey("includeWeights"))
            {
                var weightEdges = parameters["includeWeights"];

                if (!bool.TryParse(weightEdges, out var value))
                {
                    errors.Add("Paramter 'includeWeights' must be a boolean.");
                }
            }
            else
            {
                errors.Add("Paramter 'includeWeights' is required.");
            }

            if (parameters.ContainsKey("layerIndices"))
            {
                try
                {
                    var indices = JsonConvert.DeserializeObject<int[]>(parameters["layerIndices"]);
                    if (indices.Any(i => i < 0 || i > network.LayerCount))
                    {
                        errors.Add($"Parameter 'layerIndices' must be an array of integers between 0 and number of layers ({network.LayerCount}).");
                    }
                }
                catch (Exception)
                {
                    errors.Add("Parameter 'layerIndices' must be an array of integers.");
                }
            }
            else
            {
                errors.Add("Paramter 'layerIndices' is required.");
            }

            return errors;
        }
    }
}
