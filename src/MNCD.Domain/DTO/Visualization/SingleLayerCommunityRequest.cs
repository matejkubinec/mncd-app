using MNCD.Domain.Entities;
using MNCD.Domain.Extensions;
using Newtonsoft.Json;
using System;

namespace MNCD.Domain.DTO.Visualization
{
    public class SingleLayerCommunityRequest
    {
        [JsonProperty("edge_list")]
        public string EdgeList { get; set; }

        [JsonProperty("community_list")]
        public string CommunityList { get; set; }

        [JsonProperty("layout")]
        public string Layout => Type.ToLayout();

        [JsonIgnore]
        public VisualizationType Type { get; set; }
    }
}