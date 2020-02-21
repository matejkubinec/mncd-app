using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;

namespace MNCD.Data.Converters
{
    public class DictionaryConverter : ValueConverter<Dictionary<string, string>, string>
    {
        public DictionaryConverter() : base(m => JsonConvert.SerializeObject(m), v => JsonConvert.DeserializeObject<Dictionary<string, string>>(v))
        {
        }
    }
}