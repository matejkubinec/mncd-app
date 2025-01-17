using System.Linq;
using MNCD.Domain.DTO.Visualization;
using MNCD.Domain.Entities;

namespace MNCD.Services.Helpers;

public static class VisualizationHelper
{
    public static BarplotRequest<int, int> GetBarplotRequest(AnalysisResult res)
    {
        var communities = res.ActorToCommunity.Values
                    .Distinct()
                    .OrderBy(c => c);
        var communitiesCount = communities
            .Select(c => res.ActorToCommunity.Where(a => a.Value == c).Count());
        return new BarplotRequest<int, int>
        {
            X = communities,
            Y = communitiesCount,
            Labels = communities.Select(c => "C" + c),
            XLabel = "Community",
            YLabel = "Actor Count",
            Params = new BarplotRequestParameters
            {
                ColorCommunities = true
            },
        };
    }

    public static TreemapRequest<int> GetTreemapRequest(AnalysisResult res)
    {
        var communities = res.ActorToCommunity.Values
            .Distinct()
            .OrderByDescending(c => c);
        var communitiesCount = communities
            .Select(c => res.ActorToCommunity.Where(a => a.Value == c)
            .Count());
        var request = new TreemapRequest<int>
        {
            Label = communities.Select(c => "C" + c),
            Sizes = communitiesCount,
            Type = VisualizationType.Treemap
        };
        return request;
    }

    public static MultilayerRequest GetMultilayerRequest(string edgeList, VisualizationType type)
    {
        return new MultilayerRequest
        {
            EdgeList = edgeList,
            Type = type
        };
    }

    public static MultilayerCommunitiesRequest GetMultilayerCommunitiesRequest(string edgeList, string communityList, VisualizationType type)
    {
        return new MultilayerCommunitiesRequest
        {
            EdgeList = edgeList,
            CommunityList = communityList,
            Type = type
        };
    }

    public static SingleLayerRequest GetSingleLayerRequest(string edgeList, VisualizationType type)
    {
        return new SingleLayerRequest
        {
            EdgeList = edgeList,
            Type = type
        };
    }

    public static SingleLayerCommunityRequest GetSingleLayerCommunityRequest(string edgeList, string communityList, VisualizationType type)
    {
        return new SingleLayerCommunityRequest
        {
            EdgeList = edgeList,
            CommunityList = communityList,
            Type = type
        };
    }
};
