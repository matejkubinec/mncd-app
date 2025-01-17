using System;
using System.Threading;
using System.Threading.Channels;
using System.Threading.Tasks;
using MNCD.Domain.Entities;

namespace MNCD.Services.Workers;

public interface IVisualizationQueue
{
    Task QueueAsync(Analysis item);
    Task<Analysis> DequeAsync(CancellationToken token);
}

public class VisualizationQueue : IVisualizationQueue
{
    private readonly Channel<Analysis> _queue;

    public VisualizationQueue() : this(5)
    {
    }

    public VisualizationQueue(int capacity)
    {
        var options = new BoundedChannelOptions(capacity)
        {
            FullMode = BoundedChannelFullMode.Wait,
        };
        _queue = Channel.CreateBounded<Analysis>(options);
    }

    public async Task QueueAsync(Analysis item)
    {
        ArgumentNullException.ThrowIfNull(item);

        await _queue.Writer.WriteAsync(item);
    }

    public async Task<Analysis> DequeAsync(CancellationToken token)
    {
        return await _queue.Reader.ReadAsync(token);
    }
}
