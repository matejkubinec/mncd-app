using MNCD.Domain.Entities;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MNCD.Domain.DTO.Visualization
{
    public class TreemapRequest<T>
    {
        [JsonProperty("sizes")]
        public IEnumerable<T> Sizes { get; set; }

        [JsonProperty("label")]
        public IEnumerable<string> Label { get; set; }

        [JsonIgnore]
        public VisualizationType Type { get; set; }
    }
}