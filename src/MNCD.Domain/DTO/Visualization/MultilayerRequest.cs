using MNCD.Domain.Entities;
using Newtonsoft.Json;

namespace MNCD.Domain.DTO.Visualization
{
    public class MultilayerRequest
    {
        [JsonProperty("edge_list")]
        public string EdgeList { get; set; }

        [JsonIgnore]
        public VisualizationType Type { get; set; }
    }
}