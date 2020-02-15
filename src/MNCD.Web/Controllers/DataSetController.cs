using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models.DataSet;
using System.Linq;
using System;
using System.IO;
using Microsoft.AspNetCore.Http;
using MNCD.Domain.Entities;
using System.Collections.Generic;

namespace MNCD.Web.Controllers
{
    [Route("api/[Controller]/[Action]")]
    public class DataSetController : ControllerBase
    {
        private readonly INetworkDataSetService _dataSetService;

        public DataSetController(INetworkDataSetService dataSetService)
        {
            _dataSetService = dataSetService;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var datasets = _dataSetService.GetDataSets();
            var result = datasets.Select(d => new DataSetRowViewModel
            {
                Id = d.Id,
                Name = d.Name,
                EdgeCount = d.Info.EdgeCount,
                NodeCount = d.Info.NodeCount,
                LayerCount = d.Info.LayerCount
            });
            return new JsonResult(result);
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Details(int id)
        {
            var dataSet = _dataSetService.GetDataSet(id);
            var result = new DataSetRowViewModel
            {
                Id = dataSet.Id,
                Name = dataSet.Name,
                EdgeCount = dataSet.Info.EdgeCount,
                NodeCount = dataSet.Info.NodeCount,
                LayerCount = dataSet.Info.LayerCount
            };
            return new JsonResult(result);
        }

        [HttpPost]
        public IActionResult Insert(DataSetAddViewModel model)
        {
            if (String.IsNullOrWhiteSpace(model.Name))
            {
                return new BadRequestObjectResult("Name is required.");
            }

            if (model.File == null)
            {
                return new BadRequestObjectResult("File is required.");
            }

            if (!HasSupportedFileType(model.File))
            {
                return new BadRequestObjectResult("File type is not supported.");
            }

            var name = model.Name;
            var content = ReadFileContent(model.File);
            var fileType = GetFileType(model.File);

            _dataSetService.AddDataSet(name, content, fileType);

            return new OkObjectResult("Dataset was saved.");
        }

        [HttpPatch]
        public IActionResult Update()
        {
            throw new NotImplementedException();
        }

        [HttpPatch]
        [Route("{id}")]
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }

        private string ReadFileContent(IFormFile file)
        {
            var content = "";
            using (var reader = new StreamReader(file.OpenReadStream()))
            {
                // TODO: change to async
                content = reader.ReadToEnd();
            }
            return content;
        }

        private bool HasSupportedFileType(IFormFile file)
        {
            var extension = GetExtension(file);
            return SupportedFileTypes.Any(sft => sft == extension);
        }

        private FileType GetFileType(IFormFile file)
        {
            var extension = GetExtension(file);
            switch (extension)
            {
                case "mpx":
                    return FileType.MPX;
                default:
                    throw new ArgumentException("Unsupported file type");
            }
        }

        private string GetExtension(IFormFile file)
        {
            return file.FileName.Split(".").Last().ToLower();
        }

        private static List<string> SupportedFileTypes = new List<string>
        {
            "mpx"
        };

    }
}
