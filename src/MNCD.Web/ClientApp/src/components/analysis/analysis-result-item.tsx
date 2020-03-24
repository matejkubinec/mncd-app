import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  AnalysisViewModel,
  AnalysisVisualizationItemViewModel,
  AnalysisApproach
} from "../../types";
import { Stack } from "office-ui-fabric-react";
import {
  Evaluation,
  Request,
  Visualization,
  CommunitiesDetails
} from "./result";
import { RootState } from "../../store";

interface IProps {
  analysis: AnalysisViewModel;
}

class AnalysisResultItem extends Component<IProps & ReduxProps> {
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

  renderCommunitySizesVisualization() {
    const header = "Community Count Visualization";
    const titles = ["Barplot", "Treemap"];
    const viz = this.props.analysis.visualization;
    const urls = viz
      ? [viz.communitiesBarplot.url, viz.communitiesTreemap.url]
      : [];
    return <Visualization header={header} titles={titles} urls={urls} />;
  }

  render() {
    const analysis = this.props.analysis;
    const { approach } = analysis.request;
    const multiLayerViz = this.getMultiLayerViz();
    const singleLayerViz = this.getSingleLayerViz();
    const singleLayerCommunitiesViz = this.getSingleLayerCommuntiesViz();

    const itemStyles = {
      root: {
        border: "1px solid " + this.props.theme.palette.whiteTranslucent40,
        borderRadius: this.props.theme.effects.roundedCorner2,
        boxShadow: this.props.theme.effects.elevation4,
        backgroundColor: this.props.theme.palette.white
      }
    };

    const headerStyle = {
      root: {
        padding: 10,
        border: "1px solid " + this.props.theme.palette.whiteTranslucent40,
        borderRadius: this.props.theme.effects.roundedCorner2,
        //boxShadow: this.props.theme.effects.elevation4,
        backgroundColor: this.props.theme.palette.accent,
        color: this.props.theme.palette.white,
        textAlign: "center"
      }
    };

    return (
      <Stack
        tokens={{ padding: 10, childrenGap: 15 }}
        style={{
          boxShadow: this.props.theme.effects.elevation16,
          backgroundColor: this.props.theme.palette.neutralLighterAlt
        }}
      >
        <Stack.Item styles={headerStyle}>
          <h2>Analysis {analysis.id}</h2>
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Request
            request={analysis.request}
            showHeader={true}
            showDepth={true}
          />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Evaluation result={analysis.result} />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <CommunitiesDetails result={analysis.result} />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Visualization
            header="Multi Layer Visualization"
            titles={multiLayerViz.map(v => v.title)}
            urls={multiLayerViz.map(v => v.url)}
          />
        </Stack.Item>
        {approach !== AnalysisApproach.MultiLayer ? (
          <React.Fragment>
            <Stack.Item styles={itemStyles}>
              <Visualization
                header="Single Layer Visualization"
                titles={singleLayerViz.map(v => v.title)}
                urls={singleLayerViz.map(v => v.url)}
              />
            </Stack.Item>
            <Stack.Item styles={itemStyles}>
              <Visualization
                header="Single Layer Communities Visualization"
                titles={singleLayerCommunitiesViz.map(v => v.title)}
                urls={singleLayerCommunitiesViz.map(v => v.url)}
              />
            </Stack.Item>
          </React.Fragment>
        ) : null}
        <Stack.Item styles={itemStyles}>
          {this.renderCommunitySizesVisualization()}
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => {
  return {
    theme: rootState.theme.current
  };
};

const mapDispatch = {};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResultItem);
