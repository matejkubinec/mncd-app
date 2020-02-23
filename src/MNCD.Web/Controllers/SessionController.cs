using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models.Analysis;
using MNCD.Web.Models.Session;

namespace MNCD.Web.Controllers
{
    [Route("api/session")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAnalysisService _analysisService;
        private readonly IAnalysisSessionService _analysisSessionService;


        public SessionController(
            IMapper mapper,
            IAnalysisSessionService analysisSessionService,
            IAnalysisService analysisService)
        {
            _mapper = mapper;
            _analysisSessionService = analysisSessionService;
            _analysisService = analysisService;
        }

        [HttpGet]
        public IActionResult GetAllSessions()
        {
            var sessions = _analysisSessionService.GetAnalysisSessions();
            var response = _mapper.Map<List<SessionRowViewModel>>(sessions);
            return new JsonResult(response);
        }

        [HttpPost]
        public IActionResult AddSession([FromBody]SessionAddViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult("Name must note be empty.");
            }

            _analysisSessionService.AddAnalysisSession(model.Name);

            return new OkObjectResult("Analysis session created.");
        }

        [Route("{id}/analyses")]
        public IActionResult GetAnalyses(int id)
        {
            var analyses = _analysisService.GetAnalysesForSession(id);
            var response = _mapper.Map<List<AnalysisRequestViewModel>>(analyses);
            return new JsonResult(response);
        }
    }
}