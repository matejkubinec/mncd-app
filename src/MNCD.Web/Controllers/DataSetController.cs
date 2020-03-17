using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models.DataSet;
using System.IO;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using AutoMapper;
using System.Threading.Tasks;
using MNCD.Web.Models;

namespace MNCD.Web.Controllers
{
    [Route("api/dataset")]
    [ApiController]
    public class DataSetController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly INetworkDataSetService _dataSetService;

        public DataSetController(
            IMapper mapper,
            INetworkDataSetService dataSetService)
        {
            _mapper = mapper;
            _dataSetService = dataSetService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var datasets = await _dataSetService.GetDataSets();
            var result = _mapper.Map<List<DataSetRowViewModel>>(datasets);
            return new JsonResult(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var dataSet = await _dataSetService.GetDataSet(id);
            var result = _mapper.Map<List<DataSetRowViewModel>>(dataSet);
            return new JsonResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromForm]DataSetAddViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult("Name is required.");
            }

            if (model.File == null)
            {
                return new BadRequestObjectResult("File is required.");
            }

            var name = model.Name;
            var content = await ReadFileContent(model.File);

            var dataSet = await _dataSetService.AddDataSet(name, content, model.format);
            var viewModel = _mapper.Map<DataSetRowViewModel>(dataSet);
            return new JsonResult(new ApiResponse<DataSetRowViewModel>
            {
                Data = viewModel,
                Message = "Dataset was added."
            });
        }

        [HttpPatch]
        public async Task<IActionResult> Update(DataSetEditViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult("Name must not be empty.");
            }

            if (model.Id <= 0)
            {
                return new BadRequestObjectResult("Invalid dataset id.");
            }

            var dataSet = await _dataSetService.UpdateDataSet(model.Id, model.Name);
            var viewModel = _mapper.Map<DataSetRowViewModel>(dataSet);
            return new JsonResult(new ApiResponse<DataSetRowViewModel>
            {
                Data = viewModel,
                Message = "Dataset was updated."
            });
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            if (id <= 0)
            {
                return new BadRequestObjectResult("Invalid dataset id.");
            }

            await _dataSetService.DeleteDataSet(id);

            return new JsonResult(new ApiResponse<int>
            {
                Data = id,
                Message = "Dataset was deleted."
            });
        }

        private async Task<string> ReadFileContent(IFormFile file)
        {
            var content = "";
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                content = await reader.ReadToEndAsync();
            }
            return content;
        }
    }
}
