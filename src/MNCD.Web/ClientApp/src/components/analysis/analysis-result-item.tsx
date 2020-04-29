import React, { Component } from "react";
import {
  AnalysisViewModel,
  AnalysisVisualizationItemViewModel,
  AnalysisApproach,
} from "../../types";
import {
  Stack,
  ITheme,
  IconButton,
  Separator,
  TooltipHost,
} from "office-ui-fabric-react";
import {
  Evaluation,
  Request,
  Visualization,
  CommunitiesDetails,
} from "./result";

interface IProps {
  analysis: AnalysisViewModel;
  theme: ITheme;
  showControls: boolean;
  onMinimize: (id: number) => void;
  onDelete: (id: number) => void;
}

class AnalysisResultItem extends Component<IProps> {
  public static defaultProps = {
    showControls: true,
    onDelete: null,
    onMinimize: null,
  };

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
    const { showControls, analysis } = this.props;
    const { approach } = analysis.request;
    const multiLayerViz = this.getMultiLayerViz();
    const singleLayerViz = this.getSingleLayerViz();
    const singleLayerCommunitiesViz = this.getSingleLayerCommuntiesViz();
    const slices = [analysis.visualization.slices];
    const slicesCommunities = [analysis.visualization.slicesCommunities];

    const itemStyles = {
      root: {
        border: "1px solid " + this.props.theme.palette.whiteTranslucent40,
        borderRadius: this.props.theme.effects.roundedCorner2,
        boxShadow: this.props.theme.effects.elevation4,
        backgroundColor: this.props.theme.palette.white,
      },
    };

    return (
      <Stack
        tokens={{ padding: 10, childrenGap: 15 }}
        style={{ minWidth: 500 }}
      >
        <Stack.Item styles={itemStyles}>
          <Stack tokens={{ padding: 10 }}>
            <Stack horizontal>
              <Stack.Item grow={10}>
                <h1>Analysis {analysis.id}</h1>
              </Stack.Item>
              {showControls ? (
                <Stack.Item grow={2} align="end">
                  <Stack horizontal horizontalAlign="end">
                    <TooltipHost content="Minimize">
                      <IconButton
                        iconProps={{
                          iconName: "Remove",
                        }}
                        onClick={this.handleMinimize}
                      />
                    </TooltipHost>
                    <TooltipHost content="Delete">
                      <IconButton
                        iconProps={{
                          iconName: "Delete",
                        }}
                        onClick={this.handleDelete}
                      />
                    </TooltipHost>
                  </Stack>
                </Stack.Item>
              ) : null}
            </Stack>
            <Separator />
            <div>
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
          </Stack>
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Request
            request={analysis.request}
            useMinMaxHeight
            showHeader
            showDepth
          />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Evaluation result={analysis.result} useMinMaxHeight />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <CommunitiesDetails result={analysis.result} useMinMaxHeight />
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

  private handleMinimize = () => {
    this.props.onMinimize(this.props.analysis.id);
  };

  private handleDelete = () => {
    this.props.onDelete(this.props.analysis.id);
  };
}

export default AnalysisResultItem;
