using MNCD.Core;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace MNCD.Services.Algorithms.Flattening
{
    public class LocalSimplification : IFlatteningAlgorithm
    {
        private static MNCD.Flattening.LocalSimplification Algorithm = new MNCD.Flattening.LocalSimplification();

        public Network Flatten(Network network, Dictionary<string, string> parameters)
        {
            var errors = ValidateParameters(network, parameters);
            if (errors.Count > 0)
            {
                // TODO: custom exception
                throw new ArgumentException(string.Join('\n', errors));
            }
            var weightEdges = bool.Parse(parameters["weightEdges"]);
            var treshold = double.Parse(parameters["treshold"], NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture);
            var relevances = JsonConvert.DeserializeObject<double[]>(parameters["relevances"], new JsonSerializerSettings
            {
                Culture = CultureInfo.InvariantCulture,
            });

            return Algorithm.BasedOnLayerRelevance(network, relevances, treshold, weightEdges);
        }
        public List<string> ValidateParameters(Network network, Dictionary<string, string> parameters)
        {
            var errors = new List<string>();

            if (parameters.ContainsKey("weightEdges"))
            {
                if (!bool.TryParse(parameters["weightEdges"], out var _))
                {
                    errors.Add("Parameter 'weightEdges' must be a valid boolean.");
                }
            }
            else
            {
                errors.Add("Parameter 'weightEdges' is required.");
            }

            if (parameters.ContainsKey("treshold"))
            {
                if (double.TryParse(parameters["treshold"], NumberStyles.AllowDecimalPoint, CultureInfo.InvariantCulture, out var treshold))
                {
                    if (treshold > 1.0 || treshold < 0.0)
                    {
                        errors.Add("Parameter 'treshold' must be a floating point number between 0.0 and 1.0.");
                    }
                }
                else
                {
                    errors.Add("Parameter 'treshold' must be a valid floating point number.");
                }
            }
            else
            {
                errors.Add("Parameter 'weightEdges' is required.");
            }

            if (parameters.ContainsKey("relevances"))
            {
                try
                {
                    var relevances = JsonConvert.DeserializeObject<double[]>(parameters["relevances"]);
                    if (relevances.Any(r => r > 1.0 || r < 0.0))
                    {
                        errors.Add("Parameter 'relevances' must be an array of floating point numbers between 0.0 and 1.0.");
                    }
                }
                catch (Exception)
                {
                    errors.Add("Parameter 'relevances' must be an array of floating point numbers.");
                }
            }
            else
            {
                errors.Add("Parameter 'relevances' is required.");
            }

            return errors;
        }
    }
}
