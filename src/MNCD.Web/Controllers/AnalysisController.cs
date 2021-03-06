using System.IO;
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

        public AnalysisController(IMapper mapper, IAnalysisService analysisService)
        {
            _mapper = mapper;
            _analysisService = analysisService;
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetAnalysis(int id)
        {
            var analysis = await _analysisService.GetAnalysis(id);
            var data = _mapper.Map<AnalysisViewModel>(analysis);

            return new OkObjectResult(new ApiResponse<AnalysisViewModel>("Analysis was found.", data));
        }

        [HttpPost]
        public async Task<IActionResult> Analyze([FromBody] AnalysisRequestViewModel model)
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
                return new BadRequestObjectResult(new Response("Invalid analysis id."));
            }

            await _analysisService.ToggleVisibility(id);

            return new OkObjectResult(new Response("Visibility was toggled."));
        }

        [HttpGet]
        [Route("download/{id}")]
        public async Task<IActionResult> Download(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new Response("Invalid analysis id."));
            }

            var stream = new MemoryStream();

            await _analysisService.ArchiveAnalysis(id, stream);

            return File(stream, "application/zip", $"Analysis {id}.zip");
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new Response("Invalid analysis id."));
            }

            await _analysisService.Delete(id);

            var message = $"Analysis with id '{id}' deleted.";
            return new OkObjectResult(new ApiResponse<int>(message, id));
        }

        [HttpPatch]
        [Route("{id}")]
        public async Task<IActionResult> Edit(int id, [FromBody] AnalysisEditViewModel model)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult(new Response("Invalid analysis id."));
            }

            await _analysisService.EditNotes(id, model.Notes);

            return new OkObjectResult(new Response("Notes edited."));
        }
    }
}