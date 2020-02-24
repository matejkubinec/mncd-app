namespace MNCD.Web.Helpers
{
    public static class ConnectionStringParser
    {
        public static string ParseToMySql(string conn)
        {
            // https://www.eliostruyf.com/moving-your-database-to-the-mysql-in-app-option-in-azure/
            // https://stackoverflow.com/questions/13607334/when-storing-a-mysql-connection-string-in-app-config-what-value-should-the-prov
            // https://social.msdn.microsoft.com/Forums/en-US/7e577b74-bbc8-41ea-a5e4-075b0eaa8622/aspnet-core-mvc-and-mysql-in-app

            var db = GetPart("Database=", conn);
            var server = GetPart("Data Source=", conn).Split(":")[0];
            var port = GetPart("Data Source=", conn).Split(":")[1];
            var user = GetPart("User Id=", conn);
            var password = GetPart("Password=", conn);
            var parsed = $"server={server};userid={user};password={password};database={db};Port={port}";
            return parsed;
        }

        private static string GetPart(string part, string connection)
        {
            var startIdx = connection.IndexOf(part);
            var endIdx = connection.IndexOf(';', startIdx);
            var start = startIdx + part.Length;
            var end = endIdx - startIdx - part.Length;
            return connection.Substring(start, end);
        }
    }
}