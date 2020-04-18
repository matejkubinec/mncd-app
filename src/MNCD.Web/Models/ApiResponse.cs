namespace MNCD.Web.Models
{
    public class ApiResponse<T> : Response
    {
        public T Data { get; set; }

        public ApiResponse(string message, T data) : base(message)
        {
            Message = message;
            Data = data;
        }
    }
}
