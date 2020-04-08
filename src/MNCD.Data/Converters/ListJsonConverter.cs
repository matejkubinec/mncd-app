using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MNCD.Data.Converters
{
    public class ListJsonConverter<T> : ValueConverter<List<T>, string>
    {
        public ListJsonConverter()
         : base(m => JsonConvert.SerializeObject(m),
                v => JsonConvert.DeserializeObject<List<T>>(v))
        {
        }
    }
}