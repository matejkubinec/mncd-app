import React, { Component } from "react";
import {
  AnalysisViewModel,
  AnalysisVisualizationItemViewModel,
  AnalysisApproach,
} from "../../types";
import { Stack, ITheme } from "office-ui-fabric-react";
import {
  Evaluation,
  Request,
  Visualization,
  CommunitiesDetails,
} from "./result";

interface IProps {
  analysis: AnalysisViewModel;
  theme: ITheme;
}

class AnalysisResultItem extends Component<IProps> {
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
    const slices = [analysis.visualization.slices];
    const slicesCommunities = [analysis.visualization.slicesCommunities];

    const itemStyles = {
      root: {
        border: "1px solid " + this.props.theme.palette.whiteTranslucent40,
        borderRadius: 4,
        boxShadow: this.props.theme.effects.elevation4,
        backgroundColor: this.props.theme.palette.white,
      },
    };

    const headerStyle = {
      root: {
        padding: 10,
        borderRadius: 4,
        backgroundColor: this.props.theme.palette.accent,
        color: this.props.theme.palette.white,
        textAlign: "center",
      },
    };

    return (
      <Stack
        tokens={{ padding: 10, childrenGap: 15 }}
        style={{
          borderRadius: 4,
          boxShadow: this.props.theme.effects.elevation16,
          backgroundColor: this.props.theme.palette.neutralLighterAlt,
        }}
      >
        <Stack.Item styles={headerStyle}>
          <h2>Analysis {analysis.id}</h2>
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <div style={{ textAlign: "center", padding: 5 }}>
            Click{" "}
            <a
              href={`/analysis/${analysis.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{" "}
            to view a more detailed version.
          </div>
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
            titles={multiLayerViz.map((v) => v.title)}
            urls={multiLayerViz.map((v) => v.url)}
          />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Visualization
            header="Layers"
            titles={slices.map((v) => v.title)}
            urls={slices.map((v) => v.url)}
          />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Visualization
            header="Communities in layers"
            titles={slicesCommunities.map((v) => v.title)}
            urls={slicesCommunities.map((v) => v.url)}
          />
        </Stack.Item>
        {approach !== AnalysisApproach.MultiLayer ? (
          <React.Fragment>
            <Stack.Item styles={itemStyles}>
              <Visualization
                header="Single Layer Visualization"
                titles={singleLayerViz.map((v) => v.title)}
                urls={singleLayerViz.map((v) => v.url)}
              />
            </Stack.Item>
            <Stack.Item styles={itemStyles}>
              <Visualization
                header="Single Layer Communities Visualization"
                titles={singleLayerCommunitiesViz.map((v) => v.title)}
                urls={singleLayerCommunitiesViz.map((v) => v.url)}
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

export default AnalysisResultItem;
