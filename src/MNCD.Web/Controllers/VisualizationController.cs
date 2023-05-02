using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Web.Models;
using System;
using System.Threading.Tasks;

namespace MNCD.Web.Controllers
{
    [Route("api/visualization")]
    public class VisualizationController : ControllerBase
    {
        private readonly IVisualizationService _visualizationService;

        public VisualizationController(IVisualizationService visualizationService)
        {
            _visualizationService = visualizationService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var visualization = await _visualizationService.GetVisualization(id);
                return GetSvgResult(visualization.SvgImage);
            }
            catch (Exception e)
            {
                return new BadRequestObjectResult(new Response(e.Message));
            }
        }

        [HttpGet]
        [Route("dataset/{dataSetId}/{type}")]
        public async Task<IActionResult> GetDataSetVisualization(int dataSetId, VisualizationType type)
        {
            try
            {
                var visualization = await _visualizationService.GetDataSetVisualization(dataSetId, type);
                return GetSvgResult(visualization.SvgImage);
            }
            catch (ArgumentException e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        [HttpGet]
        [Route("analysis/{analysisId}/{type}")]
        public async Task<IActionResult> GetAnalysisVisualization(int analysisId, VisualizationType type)
        {
            try
            {
                var visualization = await _visualizationService.GetAnalysisVisualization(analysisId, type);
                return GetSvgResult(visualization.SvgImage);
            }
            catch (ArgumentException e)
            {
                return new BadRequestObjectResult(e.Message);
            }
        }

        private IActionResult GetSvgResult(string svg)
        {
            return new Microsoft.AspNetCore.Mvc.ContentResult()
            {
                Content = svg,
                ContentType = "image/svg+xml",
                StatusCode = 200
            };
        }
    }
}
