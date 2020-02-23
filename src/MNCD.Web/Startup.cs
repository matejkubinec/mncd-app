using System;
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
using MNCD.Web.Mappings;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Pomelo.EntityFrameworkCore.MySql.Storage;

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

            services.AddControllersWithViews();

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
                ctx.Database.EnsureCreated();
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
            var mappingConfig = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<DataSetRowViewModelProfile>();
                cfg.AddProfile<SessionRowViewModelProfile>();
                cfg.AddProfile<AnalysisRequestViewModelProfile>();
            });
            var mapper = mappingConfig.CreateMapper();

            services.AddSingleton<IMapper>(mapper);
        }

        private void RegisterDbContext(IServiceCollection services)
        {
            var connectionString = GetConnectionString();
            var serverVersion = new ServerVersion(new Version(8, 0, 18), ServerType.MySql);
            services.AddDbContext<MNCDContext>(opt => opt.UseMySql(connectionString, opt => opt.ServerVersion(serverVersion)));
        }

        private string GetConnectionString()
        {
            var connectionString = Environment.GetEnvironmentVariable("MYSQLCONNSTR_localdb");

            if (connectionString != null)
            {
                return connectionString;
            }

            return Configuration.GetConnectionString("DefaultConnection");
        }

        private void RegisterServices(IServiceCollection services)
        {
            services.AddSingleton<IReaderService, ReaderService>();
            services.AddSingleton<IHashService, HashService>();

            var vizUrl = Configuration.GetValue<string>("VisualizationApiUrl");
            services.AddTransient<IVisualizationService, VisualisationService>(x =>
                new VisualisationService(x.GetService<MNCDContext>(), vizUrl));

            services.AddTransient<INetworkDataSetService, NetworkDataSetService>();
            services.AddTransient<IAnalysisSessionService, AnalysisSessionService>();
            services.AddTransient<IAnalysisService, AnalysisService>();
        }
    }
}
