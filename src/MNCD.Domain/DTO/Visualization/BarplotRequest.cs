using Newtonsoft.Json;
using System.Collections.Generic;

namespace MNCD.Domain.DTO.Visualization
{
    public class BarplotRequest<R, T>
    {
        [JsonProperty("x")]
        public IEnumerable<R> X { get; set; }

        [JsonProperty("y")]
        public IEnumerable<T> Y { get; set; }

        [JsonProperty("labels")]
        public IEnumerable<string> Labels { get; set; }

        [JsonProperty("xlabel")]
        public string XLabel { get; set; }

        [JsonProperty("ylabel")]
        public string YLabel { get; set; }

        [JsonProperty("params")]
        public BarplotRequestParameters Params { get; set; }
    }
}