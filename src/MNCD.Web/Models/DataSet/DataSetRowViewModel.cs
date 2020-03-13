using System.Collections.Generic;

namespace MNCD.Web.Models.DataSet
{
    public class DataSetRowViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int NodeCount { get; set; }
        public int EdgeCount { get; set; }
        public int LayerCount { get; set; }
        public List<string> LayerNames { get; set; }
    }
}
