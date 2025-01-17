using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models.System;

namespace MNCD.Web.Controllers;

[Route("/api/system")]
public class SystemController(
    IVisualizationService visualizationService
) : ControllerBase
{
    [HttpGet("status")]
    public async Task<IActionResult> Status()
    {
        var status = new SystemStatus
        {
            Visualization = new VisualizationStatus
            {
                Url = visualizationService.GetUrl(),
                Available = await visualizationService.IsAvailable()
            }
        };
        return Ok(status);
    }
}
