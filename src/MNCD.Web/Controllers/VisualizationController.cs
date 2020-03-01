﻿using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using System;
using System.Collections.Generic;
using System.Linq;
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
