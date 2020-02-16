using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models.Analysis;

namespace MNCD.Web.Controllers
{
    [Route("api/analysis")]
    public class AnalysisController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAnalysisService _analysisService;

        public AnalysisController(
            IMapper mapper,
            IAnalysisService analysisService)
        {
            _mapper = mapper;
            _analysisService = analysisService;
        }

        [HttpPost]
        public IActionResult Analyze([FromBody]AnalysisRequestViewModel model)
        {
            return new JsonResult(new { });
        }
    }
}