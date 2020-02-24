using MNCD.Data;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using System;
using System.Net.Http;

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

            var client = new HttpClient();
            var content = new StringContent(edgeList);
            var uri = _baseUrl + "multilayer/diagonal";

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
    }
}
