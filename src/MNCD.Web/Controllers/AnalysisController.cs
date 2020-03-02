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
        public IActionResult Analyze([FromBody]AnalysisRequestViewModel model)
        {
            var request = _mapper.Map<AnalysisRequest>(model);
            request.Dataset = _dataSetService.GetDataSet(model.DatasetId);
            var analysis = _analysisService.Analyze(model.SessionId, request, true);
            var response = _mapper.Map<AnalysisViewModel>(analysis);
            return new JsonResult(response);
        }
    }
}