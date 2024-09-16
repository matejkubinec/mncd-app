using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MNCD.Data;
using MNCD.Domain.Services;
using MNCD.Services.Impl;
using MNCD.Web.Filters;
using System;
using System.Reflection;

namespace MNCD.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            RegisterMapper(services);
            RegisterServices(services);
            RegisterDbContext(services);

            services.AddApplicationInsightsTelemetry();

            services.AddControllersWithViews(config =>
            {
                config.Filters.Add<ExceptionFilter>();
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            using (var scope = app.ApplicationServices.CreateScope())
            {
                var ctx = scope.ServiceProvider.GetService<MNCDContext>();
                if (!ctx.Database.EnsureCreated())
                {
                    ctx.Database.Migrate();
                }
            }

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }

        private void RegisterMapper(IServiceCollection services)
        {
            var assembly = Assembly.GetExecutingAssembly();
            var mappingConfig = new MapperConfiguration(cfg =>
            {
                cfg.ShouldMapMethod = (m => false);
                cfg.AddMaps(assembly);
            });

            var mapper = mappingConfig.CreateMapper();

            services.AddSingleton(mapper);
        }

        private void RegisterDbContext(IServiceCollection services)
        {
            var connectionString = GetConnectionString();
            services.AddDbContext<MNCDContext>(opt => opt.UseSqlite(connectionString));
        }

        private void RegisterServices(IServiceCollection services)
        {
            services.AddSingleton<IReaderService, ReaderService>();
            services.AddSingleton<IHashService, HashService>();
            services.AddTransient<INetworkDataSetService, NetworkDataSetService>();
            services.AddTransient<IAnalysisSessionService, AnalysisSessionService>();
            services.AddTransient<IAnalysisService, AnalysisService>();

            services.AddTransient<IVisualizationService, VisualizationService>(x =>
                new VisualizationService(x.GetService<MNCDContext>(), GetVisualizationUrl()));
        }

        private string GetConnectionString() =>
            Environment.GetEnvironmentVariable("MNCD_CONNECTION_STRING") ?? Configuration.GetConnectionString("DefaultConnection");

        private string GetVisualizationUrl() =>
            Environment.GetEnvironmentVariable("MNCD_VISUALIZATION_URL") ?? Configuration.GetValue<string>("VisualizationApiUrl");
    }
}
