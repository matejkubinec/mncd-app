using MNCD.Domain.Entities;
using Newtonsoft.Json;

namespace MNCD.Domain.DTO.Visualization
{
    public class MultilayerCommunitiesRequest
    {
        [JsonProperty("edge_list")]
        public string EdgeList { get; set; }

        [JsonProperty("community_list")]
        public string CommunityList { get; set; }

        [JsonIgnore]
        public VisualizationType Type { get; set; }
    }
}