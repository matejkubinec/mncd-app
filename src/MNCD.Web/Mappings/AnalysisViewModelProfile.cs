using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using MNCD.Domain.Entities;
using MNCD.Domain.Extensions;
using MNCD.Web.Models.Analysis;

namespace MNCD.Web.Mappings
{
    public class AnalysisViewModelProfile : Profile
    {
        public AnalysisViewModelProfile()
        {
            CreateMap<Analysis, AnalysisViewModel>()
                .ForMember(
                    dest => dest.Visualization,
                    opt => opt.MapFrom(src => new AnalysisVisualizationViewModel
                    {
                        MultiLayer = MapMultiLayer(src),
                        MultiLayerCommunities = MapMultiLayerCommunities(src),
                        SingleLayer = MapSingleLayer(src),
                        SingleLayerCommunities = MapSingleLayerCommunities(src),
                        CommunitiesBarplot = MapBarplot(src),
                        CommunitiesTreemap = MapTreemap(src)
                    })
                );
        }

        private List<AnalysisVisualizationItemViewModel> MapMultiLayer(Analysis analysis)
        {
            var types = new List<VisualizationType>
            {
                VisualizationType.MultiLayerDiagonal
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.MultiLayer.FirstOrDefault(v => v.Type == VisualizationType.MultiLayerDiagonal);
                items.Add(new AnalysisVisualizationItemViewModel
                {
                    Title = visualization?.Title ?? type.ToTitle(),
                    Url = GetUrl(analysis, type)
                });
            }
            return items;
        }

        private List<AnalysisVisualizationItemViewModel> MapMultiLayerCommunities(Analysis analysis)
        {
            var types = new List<VisualizationType>
            {
                VisualizationType.MultiLayerHairball
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.MultiLayerCommunities.FirstOrDefault(v => v.Type == type);
                items.Add(new AnalysisVisualizationItemViewModel
                {
                    Title = visualization?.Title ?? type.ToTitle(),
                    Url = GetUrl(analysis, type)
                });
            }
            return items;
        }

        private List<AnalysisVisualizationItemViewModel> MapSingleLayer(Analysis analysis)
        {
            var types = new List<VisualizationType>
            {
                VisualizationType.SingleLayerSpring,
                VisualizationType.SingleLayerCircular,
                VisualizationType.SingleLayerSpiral
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.SingleLayer.FirstOrDefault(v => v.Type == type);
                items.Add(new AnalysisVisualizationItemViewModel
                {
                    Title = visualization?.Title ?? type.ToTitle(),
                    Url = GetUrl(analysis, type)
                });
            }
            return items;
        }

        private List<AnalysisVisualizationItemViewModel> MapSingleLayerCommunities(Analysis analysis)
        {
            var types = new List<VisualizationType>
            {
                VisualizationType.SingleLayerCommunitiesSpring,
                VisualizationType.SingleLayerCommunitiesCircular,
                VisualizationType.SingleLayerCommunitiesSpiral
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.SingleLayerCommunities.FirstOrDefault(v => v.Type == type);
                items.Add(new AnalysisVisualizationItemViewModel
                {
                    Title = visualization?.Title ?? type.ToTitle(),
                    Url = GetUrl(analysis, type)
                });
            }
            return items;
        }

        private AnalysisVisualizationItemViewModel MapBarplot(Analysis analysis)
        {
            var type = VisualizationType.Barplot;
            var visualization = analysis.CommunitiesBarplot;
            return new AnalysisVisualizationItemViewModel
            {
                Title = visualization?.Title ?? type.ToTitle(),
                Url = GetUrl(analysis, type)
            };
        }

        private AnalysisVisualizationItemViewModel MapTreemap(Analysis analysis)
        {
            var type = VisualizationType.Treemap;
            var visualization = analysis.CommunitiesTreemap;
            return new AnalysisVisualizationItemViewModel
            {
                Title = visualization?.Title ?? type.ToTitle(),
                Url = GetUrl(analysis, type)
            };
        }

        private string GetUrl(Analysis analysis, VisualizationType type)
        {
            return $"/api/visualization/analysis/{analysis.Id}/{type}";
        }
    }
}
