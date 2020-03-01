import React, { Component } from "react";
import { AnalysisViewModel } from "../types";
import { Stack } from "office-ui-fabric-react";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import {
  AnalysisRequest,
  AnalysisNetworkVisualization,
  AnalysisCommunityDetectionEvaluation
} from "./analysis-components";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";

interface IProps {
  analysis: AnalysisViewModel;
}

interface IState {}

export default class Analysis extends Component<IProps, IState> {
  render() {
    const analysis = this.props.analysis;

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
            visualization={analysis.visualization}
          />
        </Stack.Item>
        <Stack.Item></Stack.Item>
      </Stack>
    );
  }
}
