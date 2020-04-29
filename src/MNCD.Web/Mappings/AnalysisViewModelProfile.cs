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
                        CommunitySizes = MapCommunitySizes(src),
                    })
                );
        }

        private List<AnalysisVisualizationItemViewModel> MapMultiLayer(Analysis analysis)
        {
            var types = new List<VisualizationType>
            {
                VisualizationType.MultiLayer_Diagonal,
                VisualizationType.MultiLayer_Slices,
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.Visualizations.FirstOrDefault(v => v.Type == type);
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
                VisualizationType.MultiLayer_Hairball,
                VisualizationType.MultiLayer_Slices_Communities
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.Visualizations.FirstOrDefault(v => v.Type == type);
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
                VisualizationType.SingleLayer_Spring,
                VisualizationType.SingleLayer_Circular,
                VisualizationType.SingleLayer_Spiral
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.Visualizations.FirstOrDefault(v => v.Type == type);
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
                VisualizationType.SingleLayer_Communities_Spring,
                VisualizationType.SingleLayer_Communities_Circular,
                VisualizationType.SingleLayer_Communities_Spiral
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.Visualizations.FirstOrDefault(v => v.Type == type);
                items.Add(new AnalysisVisualizationItemViewModel
                {
                    Title = visualization?.Title ?? type.ToTitle(),
                    Url = GetUrl(analysis, type)
                });
            }

            return items;
        }

        private List<AnalysisVisualizationItemViewModel> MapCommunitySizes(Analysis analysis)
        {
            var types = new List<VisualizationType>
            {
                VisualizationType.Barplot,
                VisualizationType.Treemap,
            };
            var items = new List<AnalysisVisualizationItemViewModel>();
            foreach (var type in types)
            {
                var visualization = analysis.Visualizations.FirstOrDefault(v => v.Type == type);
                items.Add(new AnalysisVisualizationItemViewModel
                {
                    Title = visualization?.Title ?? type.ToTitle(),
                    Url = GetUrl(analysis, type)
                });
            }

            return items;
        }

        private string GetUrl(Analysis analysis, VisualizationType type)
        {
            return $"/api/visualization/analysis/{analysis.Id}/{type}";
        }
    }
}
