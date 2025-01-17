using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using MNCD.Domain.Entities;
using MNCD.Domain.Services;

namespace MNCD.Services.Workers;

public class VisualizationBackgroundService(
    IVisualizationQueue taskQueue,
    IServiceScopeFactory scopeFactory,
    ILogger<VisualizationBackgroundService> logger
) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Visualization Background Service is running.");

        await BackgroundProcessing(stoppingToken);
    }

    private async Task BackgroundProcessing(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var analysis = await taskQueue.DequeAsync(stoppingToken);

            await using var scope = scopeFactory.CreateAsyncScope();
            var visualizationService = scope.ServiceProvider.GetRequiredService<IVisualizationService>();

            var types = new List<VisualizationType>
            {
                // Multi Layer
                VisualizationType.MultiLayer_Diagonal,
                VisualizationType.MultiLayer_Slices,
                // Multi Layer Communities
                VisualizationType.MultiLayer_Hairball,
                VisualizationType.MultiLayer_Slices_Communities,
                // Single Layer
                VisualizationType.SingleLayer_Spring,
                VisualizationType.SingleLayer_Circular,
                VisualizationType.SingleLayer_Spiral,
                // Single Layer Communities
                VisualizationType.SingleLayer_Communities_Spring,
                VisualizationType.SingleLayer_Communities_Circular,
                VisualizationType.SingleLayer_Communities_Spiral,
                // Community Sizes
                VisualizationType.Barplot,
                VisualizationType.Treemap,
            };

            foreach (var visType in types)
            {
                try
                {
                    logger.LogInformation($"Processing '{visType}' for analysis '{analysis.Id}'.");

                    await visualizationService.GetAnalysisVisualization(analysis.Id, visType);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Error occurred visualizing '{visualization}' graph analysis with '{id}'.", visType, analysis.Id);
                }
            }
        }
    }

    public override async Task StopAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Visualization Background Service is stopping.");

        await base.StopAsync(stoppingToken);
    }
}
