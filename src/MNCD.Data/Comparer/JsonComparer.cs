using Microsoft.EntityFrameworkCore.ChangeTracking;
using Newtonsoft.Json;

namespace MNCD.Data.Comparer
{
    public class JsonComparer<T> : ValueComparer<T>
    {
        public JsonComparer() : base(
            (l, r) => JsonConvert.SerializeObject(l) == JsonConvert.SerializeObject(r),
            v => v == null ? 0 : JsonConvert.SerializeObject(v).GetHashCode(),
            v => JsonConvert.DeserializeObject<T>(JsonConvert.SerializeObject(v)))
        {
        }
    }
}
