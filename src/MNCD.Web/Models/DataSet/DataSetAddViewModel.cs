using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MNCD.Web.Models.DataSet
{
    public class DataSetAddViewModel
    {
        [FromForm]
        public string Name { get; set; }
        public IFormFile File { get; set; }
    }
}