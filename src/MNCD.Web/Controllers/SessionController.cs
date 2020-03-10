using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models;
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

            var session = await _analysisSessionService.AddAnalysisSession(model.Name);
            var data = _mapper.Map<SessionRowViewModel>(session);
            return new JsonResult(new ApiResponse<SessionRowViewModel>
            {
                Message = $"Session was created.",
                Data = data
            });
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

            var session = await _analysisSessionService.UpdateAnalysisSession(model.Id, model.Name);
            var data = _mapper.Map<SessionRowViewModel>(session);
            return new JsonResult(new ApiResponse<SessionRowViewModel>
            {
                Message = $"Session was updated.",
                Data = data
            });
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

            return new JsonResult(new ApiResponse<int>
            {
                Message = $"Session was deleted.",
                Data = id
            });
        }
    }
}