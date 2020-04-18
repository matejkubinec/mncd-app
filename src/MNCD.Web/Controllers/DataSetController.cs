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
            var data = _mapper.Map<List<DataSetRowViewModel>>(datasets);
            var response = new ApiResponse<List<DataSetRowViewModel>>("Data sets returned.", data);

            return new OkObjectResult(response);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> Details(int id)
        {
            var dataSet = await _dataSetService.GetDataSet(id);
            var data = _mapper.Map<DataSetRowViewModel>(dataSet);
            var response = new ApiResponse<DataSetRowViewModel>("Data set was found.", data);

            return new OkObjectResult(response);
        }

        [HttpPost]
        public async Task<IActionResult> Insert([FromForm]DataSetAddViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult(new Response("Name is required."));
            }

            if (model.File is null)
            {
                return new BadRequestObjectResult(new Response("File is required."));
            }

            var name = model.Name;
            var content = await ReadFileContent(model.File);

            var dataSet = await _dataSetService.AddDataSet(name, content, model.format);
            var data = _mapper.Map<DataSetRowViewModel>(dataSet);
            var response = new ApiResponse<DataSetRowViewModel>("Dataset was added.", data);

            return new OkObjectResult(response);
        }

        [HttpPatch]
        public async Task<IActionResult> Update(DataSetEditViewModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult(new Response("Name must not be empty."));
            }

            if (model.Id <= 0)
            {
                return new BadRequestObjectResult(new Response("Id must be greater than zero."));
            }

            var dataSet = await _dataSetService.UpdateDataSet(model.Id, model.Name);
            var data = _mapper.Map<DataSetRowViewModel>(dataSet);
            var response = new ApiResponse<DataSetRowViewModel>("Dataset was updated.", data);

            return new OkObjectResult(response);
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
            var response = new ApiResponse<int>("Data set was deleted.", id);

            return new OkObjectResult(response);
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
