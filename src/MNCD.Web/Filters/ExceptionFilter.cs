using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using MNCD.Domain.Exceptions;
using MNCD.Web.Models;
using Newtonsoft.Json;

namespace MNCD.Web.Filters
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var value = new Response(context.Exception.Message);

            if (context.Exception is NotFoundException)
            {
                context.Result = new NotFoundObjectResult(value);
            }
            else if (context.Exception is ArgumentException ||
                     context.Exception is NetworkDataSetExistsException)
            {
                context.Result = new BadRequestObjectResult(value);
            }
        }
    }
}