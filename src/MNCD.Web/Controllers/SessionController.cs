using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models.Session;

namespace MNCD.Web.Controllers
{
    [Route("api/[Controller]/[Action]")]
    public class SessionController : ControllerBase
    {
        private readonly IAnalysisSessionService _analysisSessionService;

        public SessionController(IAnalysisSessionService analysisSessionService)
        {
            _analysisSessionService = analysisSessionService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var sessions = _analysisSessionService.GetAnalysisSessions();
            var response = sessions.Select(s => new SessionRowViewModel()
            {
                Id = s.Id,
                Guid = s.Guid,
                CreateDate = s.CreateDate,
                AnalysesCount = s.Analyses?.Count ?? 0,
                Name = s.Name
            });
            return new JsonResult(response);
        }

        [HttpPost]
        public IActionResult Insert([FromBody]SessionAddViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult("Name must note be empty.");
            }

            _analysisSessionService.AddAnalysisSession(model.Name);

            return new OkObjectResult("Analysis session created.");
        }
    }
}