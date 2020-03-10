using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Web.Models.Analysis;

namespace MNCD.Web.Controllers
{
    [Route("api/analysis")]
    [ApiController]
    public class AnalysisController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IAnalysisService _analysisService;
        private readonly INetworkDataSetService _dataSetService;
        private readonly IAnalysisSessionService _analysisSessionService;

        public AnalysisController(
            IMapper mapper,
            IAnalysisService analysisService,
            INetworkDataSetService dataSetService,
            IAnalysisSessionService analysisSessionService)
        {
            _mapper = mapper;
            _analysisService = analysisService;
            _dataSetService = dataSetService;
            _analysisSessionService = analysisSessionService;
        }

        [HttpGet]
        [Route("{guid}")]
        public async Task<IActionResult> GetAnalysisSesion(string guid)
        {
            var session = await _analysisSessionService.GetAnalysisSession(guid);
            var viewModel = _mapper.Map<AnalysisSessionViewModel>(session);
            return new JsonResult(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Analyze([FromBody]AnalysisRequestViewModel model)
        {
            var request = _mapper.Map<AnalysisRequest>(model);
            var analysis = await _analysisService.Analyze(model.SessionId, model.DatasetId, request, false);
            var response = _mapper.Map<AnalysisViewModel>(analysis);
            return new JsonResult(response);
        }

        [HttpPost]
        [Route("visualize/{id}")]
        public async Task<IActionResult> Visualize(int id)
        {
            var analysis = await _analysisService.AddVisualizations(id);
            var response = _mapper.Map<AnalysisViewModel>(analysis);
            return new JsonResult(response);
        }

        [HttpPost]
        [Route("{id}/toggle-visibility")]
        public async Task<IActionResult> Toggle(int id)
        {
            await _analysisService.ToggleVisibility(id);
            return new OkResult();
        }
    }
}