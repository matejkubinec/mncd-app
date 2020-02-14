namespace MNCD.Domain.Entities
{
    public class NetworkDataSet
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Hash { get; set; }
        public string Content { get; set; }
        public FileType FileType { get; set; }
        public NetworkInfo Info { get; set; }
    }
}