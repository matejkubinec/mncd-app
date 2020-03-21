using MNCD.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms.Flattening
{
    public class WeightedFlattening : IFlatteningAlgorithm
    {
        private readonly static MNCD.Flattening.WeightedFlattening Algorithm = new MNCD.Flattening.WeightedFlattening();

        public Network Flatten(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }
            var weights = JsonConvert.DeserializeObject<double[,]>(parameters["weights"]);
            return Algorithm.Flatten(network, weights);
        }

        public List<string> ValidateParameters(Network network, Dictionary<string, string> parameters)
        {
            var errors = new List<string>();

            if (parameters.ContainsKey("weights"))
            {
                try
                {
                    var weightsJson = parameters["weights"];
                    var weights = JsonConvert.DeserializeObject<double[,]>(weightsJson);
                    var rows = weights.GetLength(0);
                    var cols = weights.GetLength(1);

                    if (rows != network.LayerCount || cols != network.LayerCount)
                    {
                        errors.Add("Parameter 'weights' must be two dimensional array of floats of size layerCount x layerCount.");
                    }
                }
                catch (Exception)
                {
                    errors.Add("Parameter 'weights' must be two dimensional array of floats.");
                }
            }
            else
            {
                errors.Add("Parameter 'weights' is required.");
            }

            return errors;
        }
    }
}
