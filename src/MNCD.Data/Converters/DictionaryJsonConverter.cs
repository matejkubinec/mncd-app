using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MNCD.Data.Converters
{
    public class DictionaryJsonConverter<T, R> : ValueConverter<Dictionary<T, R>, string>
    {
        public DictionaryJsonConverter()
         : base(m => JsonConvert.SerializeObject(m),
                v => JsonConvert.DeserializeObject<Dictionary<T, R>>(v))
        {
        }
    }
}