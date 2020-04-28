using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models;
using MNCD.Web.Models.Analysis;
using MNCD.Web.Models.Session;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MNCD.Web.Controllers
{
    [Route("api/session")]
    [ApiController]
    public class SessionController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAnalysisSessionService _analysisSessionService;

        public SessionController(
            IMapper mapper,
            IAnalysisSessionService analysisSessionService)
        {
            _mapper = mapper;
            _analysisSessionService = analysisSessionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSessions()
        {
            var sessions = await _analysisSessionService.GetAnalysisSessions();
            var data = _mapper.Map<List<SessionRowViewModel>>(sessions);
            var response = new ApiResponse<List<SessionRowViewModel>>("Session list returned.", data);

            return new OkObjectResult(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetSession(int id)
        {
            var session = await _analysisSessionService.GetAnalysisSession(id);
            var data = _mapper.Map<AnalysisSessionViewModel>(session);

            return new OkObjectResult(new ApiResponse<AnalysisSessionViewModel>("Session was found.", data));
        }

        [HttpPost]
        public async Task<IActionResult> AddSession(SessionAddEditViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult(new Response("Name must not be empty."));
            }

            var session = await _analysisSessionService.AddAnalysisSession(model.Name);
            var data = _mapper.Map<SessionRowViewModel>(session);
            var response = new ApiResponse<SessionRowViewModel>("Session was created.", data);

            return new OkObjectResult(response);
        }

        [HttpPatch]
        public async Task<IActionResult> UpdateSession(SessionAddEditViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult(new Response("Name must not be empty."));
            }

            if (model.Id <= 0)
            {
                return new BadRequestObjectResult(new Response("Id must be greater than zero."));
            }

            var session = await _analysisSessionService.UpdateAnalysisSession(model.Id, model.Name);
            var data = _mapper.Map<SessionRowViewModel>(session);
            var response = new ApiResponse<SessionRowViewModel>("Session was updated.", data);

            return new OkObjectResult(response);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteSession(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new Response("Id must be greater than zero."));
            }

            await _analysisSessionService.RemoveAnalysisSession(id);
            var response = new ApiResponse<int>("Session was deleted.", id);

            return new OkObjectResult(response);
        }
    }
}