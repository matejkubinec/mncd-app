import React from "react";
import { Stack } from "office-ui-fabric-react";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { AnalysisVisualizationViewModel } from "../../types";

interface IProps {
  visualization: AnalysisVisualizationViewModel;
}

interface IState {}

export default class AnalysisNetworkVisualization extends React.Component<
  IProps,
  IState
> {
  render() {
    return (
      <Stack
        style={{
          backgroundColor: NeutralColors.white,
          boxShadow: Depths.depth4
        }}
      >
        <img height="250" src={this.props.visualization.multiLayer[0].url} />
        <img
          height="250"
          src={this.props.visualization.multiLayerCommunities[0].url}
        />
      </Stack>
    );
  }
}
