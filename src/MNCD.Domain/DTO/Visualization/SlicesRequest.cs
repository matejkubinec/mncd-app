using MNCD.Domain.Entities;
using MNCD.Domain.Extensions;
using Newtonsoft.Json;

namespace MNCD.Domain.DTO.Visualization
{
    public class SlicesRequest
    {
        [JsonProperty("edge_list")]
        public string EdgeList { get; set; }

        [JsonIgnore]
        public VisualizationType Type { get; set; }
    }
}