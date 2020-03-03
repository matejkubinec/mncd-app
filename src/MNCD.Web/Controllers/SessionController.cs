using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
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
        public async Task<IActionResult> GetAllSessions()
        {
            var sessions = await _analysisSessionService.GetAnalysisSessions();
            var response = _mapper.Map<List<SessionRowViewModel>>(sessions);
            return new JsonResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> AddSession(SessionAddEditViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult("Name must not be empty.");
            }

            await _analysisSessionService.AddAnalysisSession(model.Name);

            return new OkObjectResult("Analysis session created.");
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateSession(SessionAddEditViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult("Name must not be empty.");
            }

            if (model.Id <= 0)
            {
                return new BadRequestObjectResult("Invalid session id.");
            }

            await _analysisSessionService.UpdateAnalysisSession(model.Id, model.Name);

            return new OkObjectResult("Analysis session updated.");
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult("Invalid session id.");
            }

            await _analysisSessionService.RemoveAnalysisSession(id);

            return new OkObjectResult("Analysis session removed.");
        }
    }
}