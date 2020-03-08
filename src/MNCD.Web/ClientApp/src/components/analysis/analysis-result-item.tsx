import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  AnalysisViewModel,
  AnalysisVisualizationItemViewModel
} from "../../types";
import { Stack } from "office-ui-fabric-react";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { Evaluation, CommunitiesSize, Request, Visualization } from "./result";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { RootState } from "../../store";
import { addVisualizations } from "../../slices/AnalysisSlice";

interface IProps {
  analysis: AnalysisViewModel;
}

interface IState {}

class AnalysisResultItem extends Component<IProps & ReduxProps, IState> {
  getSingleLayerCommuntiesViz(): AnalysisVisualizationItemViewModel[] {
    const viz = this.props.analysis.visualization;
    return viz ? viz.singleLayerCommunities : [];
  }

  getSingleLayerViz(): AnalysisVisualizationItemViewModel[] {
    const viz = this.props.analysis.visualization;
    return viz ? viz.singleLayer : [];
  }

  getMultiLayerViz(): AnalysisVisualizationItemViewModel[] {
    const viz = this.props.analysis.visualization;
    return viz ? viz.multiLayer.concat(viz.multiLayerCommunities) : [];
  }

  componentDidMount() {
    if (!this.props.visualizing && !this.props.analysis.visualization) {
      this.props.addVisualizations(this.props.analysis);
    }
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
          <Request request={analysis.request} />
        </Stack.Item>
        <Stack.Item>
          <Evaluation result={analysis.result} />
        </Stack.Item>
        <Stack.Item>
          <Visualization
            header="Multi Layer Visualization"
            titles={multiLayerViz.map(v => v.title)}
            urls={multiLayerViz.map(v => v.url)}
            isLoading={this.props.visualizing}
          />
        </Stack.Item>
        <Stack.Item>
          <Visualization
            header="Single Layer Visualization"
            titles={singleLayerViz.map(v => v.title)}
            urls={singleLayerViz.map(v => v.url)}
            isLoading={this.props.visualizing}
          />
        </Stack.Item>
        <Stack.Item>
          <Visualization
            header="Single Layer Communities Visualization"
            titles={singleLayerCommunitiesViz.map(v => v.title)}
            urls={singleLayerCommunitiesViz.map(v => v.url)}
            isLoading={this.props.visualizing}
          />
        </Stack.Item>
        <Stack.Item>
          <CommunitiesSize visualization={analysis.visualization} />
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState, props: IProps) => {
  const { analysis } = props;
  const { visualizing } = rootState.analysis;
  return {
    visualizing: !!visualizing[analysis.id]
  };
};

const mapDispatch = { addVisualizations };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResultItem);
