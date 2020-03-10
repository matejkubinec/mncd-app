using MNCD.Core;
using System;
using System.Collections.Generic;

namespace MNCD.Services.Algorithms.Flattening
{
    public class BasicFlattening : IFlatteningAlgorithm
    {
        private static MNCD.Flattening.BasicFlattening Algorithm = new MNCD.Flattening.BasicFlattening();

        public Network Flatten(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }
            var weightEdges = bool.Parse(parameters["weightEdges"]);
            return Algorithm.Flatten(network, weightEdges);
        }

        public List<string> ValidateParameters(Network network, Dictionary<string, string> parameters)
        {
            var errors = new List<string>();

            if (parameters.ContainsKey("weightEdges"))
            {
                var weightEdges = parameters["weightEdges"];

                if (!bool.TryParse(weightEdges, out var value))
                {
                    errors.Add("Paramter 'weightEdges' must be a boolean.");
                }
            }
            else
            {
                errors.Add("Paramter 'weightEdges' is required.");
            }

            return errors;
        }
    }
}
