using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;
using MNCD.Web.Models;
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
        [Route("{id}")]
        public async Task<IActionResult> GetAnalysis(int id)
        {
            var analysis = await _analysisService.GetAnalysis(id);
            var data = _mapper.Map<AnalysisViewModel>(analysis);

            return new OkObjectResult(new ApiResponse<AnalysisViewModel>("Session was found.", data));
        }

        [HttpPost]
        public async Task<IActionResult> Analyze([FromBody]AnalysisRequestViewModel model)
        {
            var request = _mapper.Map<AnalysisRequest>(model);
            var analysis = await _analysisService.Analyze(model.SessionId, model.DatasetId, request);
            var data = _mapper.Map<AnalysisViewModel>(analysis);

            return new OkObjectResult(new ApiResponse<AnalysisViewModel>("Request was analyzed.", data));
        }

        [HttpPost]
        [Route("{id}/toggle-visibility")]
        public async Task<IActionResult> Toggle(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new Response("Id must be greater than zero."));
            }

            await _analysisService.ToggleVisibility(id);

            return new OkObjectResult(new Response("Visibility was toggled."));
        }
    }
}