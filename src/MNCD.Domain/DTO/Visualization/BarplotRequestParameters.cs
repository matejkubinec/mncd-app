using Newtonsoft.Json;

namespace MNCD.Domain.DTO.Visualization
{
    public class BarplotRequestParameters
    {
        [JsonProperty("color_communities")]
        public bool ColorCommunities { get; set; }
    }
}