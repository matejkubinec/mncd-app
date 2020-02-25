using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;

namespace MNCD.Services.Impl
{
    public class VisualisationService : IVisualizationService
    {
        private readonly MNCDContext _ctx;
        private readonly string _baseUrl;

        public VisualisationService(MNCDContext ctx, string baseUrl)
        {
            _ctx = ctx;
            _baseUrl = baseUrl;
        }

        public Visualization VisualiseMultilayer(string edgeList, VisualizationType type)
        {
            if (string.IsNullOrWhiteSpace(edgeList))
            {
                throw new ArgumentException("EdgeList must not be empty or null.");
            }

            var body = new VisualisationRequest
            {
                EdgeList = edgeList
            };

            var client = new HttpClient();
            var content = new StringContent(JsonConvert.SerializeObject(body), Encoding.UTF8, "application/json");
            var uri = _baseUrl + "multilayer/diagonal";
            
            return null;
            // TODO: switch to async
            var response = client.PostAsync(uri, content).Result;

            if (response.IsSuccessStatusCode)
            {
                // TODO: switch to async
                var image = response.Content.ReadAsStringAsync().Result;
                var visualization = new Visualization
                {
                    Type = type,
                    SvgImage = image
                };
                return visualization;
            }
            else
            {
                throw new ApplicationException(response.ReasonPhrase);
            }
        }

        public Visualization VisualiseSingleLayer(string edgeList, VisualizationType type)
        {
            throw new NotImplementedException();
        }

        private class VisualisationRequest
        {
            public string EdgeList { get; set; }
            public string ActorCommunityList { get; set; }
        }
    }
}
