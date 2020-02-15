using System;

namespace MNCD.Web.Models.Session
{
    public class SessionRowViewModel
    {
        public int Id { get; set; }
        public string Guid { get; set; }
        public string Name { get; set; }
        public int AnalysesCount { get; set; }
        public DateTime CreateDate { get; set; }
    }
}