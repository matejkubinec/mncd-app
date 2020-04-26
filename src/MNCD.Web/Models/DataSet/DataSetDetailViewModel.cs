using System.Collections.Generic;

namespace MNCD.Web.Models.DataSet
{
    public class DataSetDetailViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int NodeCount { get; set; }

        public int EdgeCount { get; set; }

        public int LayerCount { get; set; }

        public string FileType { get; set; }

        public string DiagonalUrl { get; set; }

        public string SlicesUrl { get; set; }

        public ICollection<string> LayerNames { get; set; }

        public ICollection<string> ActorNames { get; set; }
    }
}
