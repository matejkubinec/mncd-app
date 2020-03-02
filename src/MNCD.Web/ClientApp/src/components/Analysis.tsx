import React, { Component } from "react";
import {
  AnalysisViewModel,
  AnalysisVisualizationItemViewModel
} from "../types";
import { Stack } from "office-ui-fabric-react";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import {
  AnalysisRequest,
  AnalysisNetworkVisualization,
  AnalysisCommunityDetectionEvaluation,
  CommunityCount
} from "./analysis-components";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";

interface IProps {
  analysis: AnalysisViewModel;
}

interface IState {}

export default class Analysis extends Component<IProps, IState> {
  getSingleLayerCommuntiesViz(): AnalysisVisualizationItemViewModel[] {
    return this.props.analysis.visualization.singleLayerCommunities;
  }

  getSingleLayerViz(): AnalysisVisualizationItemViewModel[] {
    return this.props.analysis.visualization.singleLayer;
  }

  getMultiLayerViz(): AnalysisVisualizationItemViewModel[] {
    const viz = this.props.analysis.visualization;
    const items = viz.multiLayer.concat(viz.multiLayerCommunities);
    return items;
  }

  render() {
    const analysis = this.props.analysis;
    const multiLayerViz = this.getMultiLayerViz();
    const singleLayerViz = this.getSingleLayerViz();
    const singleLayerCommunitiesViz = this.getSingleLayerCommuntiesViz();

    return (
      <Stack
        tokens={{ padding: 10, childrenGap: 15 }}
        style={{
          boxShadow: Depths.depth16,
          backgroundColor: NeutralColors.gray10
        }}
      >
        <Stack.Item>
          <AnalysisRequest request={analysis.request} />
        </Stack.Item>
        <Stack.Item>
          <AnalysisCommunityDetectionEvaluation result={analysis.result} />
        </Stack.Item>
        <Stack.Item>
          <AnalysisNetworkVisualization
            header="Multi Layer Visualization"
            titles={multiLayerViz.map(v => v.title)}
            urls={multiLayerViz.map(v => v.url)}
          />
        </Stack.Item>
        <Stack.Item>
          <AnalysisNetworkVisualization
            header="Single Layer Visualization"
            titles={singleLayerViz.map(v => v.title)}
            urls={singleLayerViz.map(v => v.url)}
          />
        </Stack.Item>
        <Stack.Item>
          <AnalysisNetworkVisualization
            header="Single Layer Communities Visualization"
            titles={singleLayerCommunitiesViz.map(v => v.title)}
            urls={singleLayerCommunitiesViz.map(v => v.url)}
          />
        </Stack.Item>
        <Stack.Item>
          <CommunityCount visualization={analysis.visualization} />
        </Stack.Item>
      </Stack>
    );
  }
}
