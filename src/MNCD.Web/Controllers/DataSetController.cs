using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Services;
using MNCD.Web.Models.DataSet;
using System.Linq;
using System;

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
        public IActionResult Insert()
        {
            throw new NotImplementedException();
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
    }
}
