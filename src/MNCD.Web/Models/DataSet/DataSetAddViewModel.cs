using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MNCD.Domain.Entities;

namespace MNCD.Web.Models.DataSet
{
    public class DataSetAddViewModel
    {
        [FromForm]
        public string Name { get; set; }
        [FromForm]
        public FileType format { get; set; }
        public IFormFile File { get; set; }
    }
}