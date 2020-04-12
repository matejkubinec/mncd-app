using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using System;
using System.Threading.Tasks;

namespace MNCD.Web.Controllers
{
    [Route("api/visualization")]
    public class VisualizationController : ControllerBase
    {
        private readonly IVisualizationService _visualizationService;
        private readonly IAnalysisService _analysisService;

        public VisualizationController(IVisualizationService visualizationService, IAnalysisService analysisService)
        {
            _visualizationService = visualizationService;
            _analysisService = analysisService;
        }

        [HttpGet]
        [Route("analysis/{analysisId}/{type}")]
        public async Task<IActionResult> Get(int analysisId, VisualizationType type)
        {
            try
            {
                var analysis = await _analysisService.GetAnalysis(analysisId);
                var visualization = await _visualizationService.GetVisualization(analysis, type);
                return new ContentResult()
                {
                    Content = visualization.SvgImage,
                    ContentType = "image/svg+xml",
                    StatusCode = 200
                };
            }
            catch (ArgumentException e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }
    }
}
