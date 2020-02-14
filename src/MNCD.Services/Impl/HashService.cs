using MNCD.Domain.Services;
using System.Security.Cryptography;
using System.Text;

namespace MNCD.Services.Impl
{
    public class HashService : IHashService
    {
        public string GetHashFor(string input)
        {
            string hash = "";
            using (var md5Hash = MD5.Create())
            {
                hash = ComputeHash(md5Hash, input);
            }
            return hash;
        }

        public string ComputeHash(MD5 md5, string input)
        {
            var data = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
            var builder = new StringBuilder();
            for (int i = 0; i < data.Length; i++)
            {
                builder.Append(data[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }
}
