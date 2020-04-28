import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { RouteComponentProps } from "react-router";
import {
  Stack,
  Separator,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
} from "office-ui-fabric-react";
import {
  fetchAnalysisDetailById,
  setVisualizationType,
  VisualizationType,
  downloadAnalysisById,
} from "../../slices/analysis-detail-slice";
import { AnalysisApproach, AnalysisViewModel } from "../../types";
import { Request, Evaluation, CommunitiesDetails } from "./result";
import { ImageGallery } from "../common";

interface MatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<MatchParams>, ReduxProps {}

class AnalysisDetail extends React.Component<IProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAnalysisDetailById(id);
  }

  render() {
    const { theme, isLoading } = this.props;
    const { id } = this.props.match.params;

    return (
      <Stack tokens={{ padding: 25 }}>
        <Stack
          tokens={{ padding: 25 }}
          style={{
            borderRadius: theme.effects.roundedCorner2,
            boxShadow: theme.effects.elevation16,
            background: theme.palette.white,
          }}
        >
          <Stack.Item styles={{ root: { paddingBottom: 10 } }}>
            <h1>Analysis {id}</h1>
          </Stack.Item>
          <Separator />
          {isLoading ? this.renderLoading() : this.renderBody()}
        </Stack>
      </Stack>
    );
  }

  private renderLoading = () => {
    return "Loading...";
  };

  private renderError = () => {
    const { error, theme } = this.props;
    return (
      <Stack
        style={{
          padding: 10,
          borderRadius: theme.effects.roundedCorner2,
          backgroundColor: theme.semanticColors.errorBackground,
        }}
      >
        {error}
      </Stack>
    );
  };

  private renderBody = () => {
    if (this.props.error) {
      return this.renderError();
    }

    const { analysis } = this.props;

    if (!analysis) {
      return null;
    }

    return (
      <Stack horizontal>
        <Stack grow={3}>
          <Stack>
            <Request
              request={analysis.request}
              showHeader={true}
              showDepth={false}
            />
          </Stack>
          <Stack>
            <Evaluation result={analysis.result} />
          </Stack>
          <Stack>
            <CommunitiesDetails result={analysis.result} />
          </Stack>
          <Stack.Item align="stretch" verticalFill>
            <Stack verticalAlign="end" verticalFill>
              <Separator />
              <PrimaryButton onClick={this.handleDownload}>
                Download
              </PrimaryButton>
            </Stack>
          </Stack.Item>
        </Stack>
        <Stack grow={3} style={{ paddingTop: 10 }}>
          <h2>Visualizations</h2>
          <Stack>{this.renderVisualizations(analysis)}</Stack>
        </Stack>
      </Stack>
    );
  };

  private renderVisualizations = (analysis: AnalysisViewModel) => {
    const {
      multiLayer,
      multiLayerCommunities,
      singleLayer,
      singleLayerCommunities,
      slices,
      slicesCommunities,
    } = analysis.visualization;

    const options: IDropdownOption[] = [
      {
        key: VisualizationType.MultiLayer,
        text: "Multi Layer",
      },
      {
        key: VisualizationType.MultiLayerCommunities,
        text: "Multi Layer Communities",
      },
    ];

    if (analysis.request.approach !== AnalysisApproach.MultiLayer) {
      options.push({
        key: VisualizationType.SingleLayer,
        text: "Single Layer",
      });
      options.push({
        key: VisualizationType.SingleLayerCommunities,
        text: "Single Layer Communities",
      });
    }

    let titles: string[] = [];
    let urls: string[] = [];

    switch (this.props.visualization) {
      case VisualizationType.MultiLayer:
        titles = multiLayer.map((m) => m.title).concat(slices.title);
        urls = multiLayer.map((m) => m.url).concat(slices.url);
        break;
      case VisualizationType.MultiLayerCommunities:
        titles = multiLayerCommunities
          .map((m) => m.title)
          .concat(slicesCommunities.title);
        urls = multiLayerCommunities
          .map((m) => m.url)
          .concat(slicesCommunities.url);
        break;
      case VisualizationType.SingleLayer:
        titles = singleLayer.map((m) => m.title);
        urls = singleLayer.map((m) => m.url);
        break;
      case VisualizationType.SingleLayerCommunities:
        titles = singleLayerCommunities.map((m) => m.title);
        urls = singleLayerCommunities.map((m) => m.url);
        break;
    }

    return (
      <Stack tokens={{ padding: 25 }}>
        <Dropdown
          options={options}
          selectedKey={this.props.visualization}
          onChange={this.handleVisualizationTypeChange}
        />
        <Stack.Item styles={{ root: { padding: 10 } }}>
          <ImageGallery titles={titles} urls={urls} />
        </Stack.Item>
      </Stack>
    );
  };

  private handleDownload = () => {
    const { analysis } = this.props;
    if (analysis) {
      const { id } = analysis;
      this.props.downloadAnalysisById(id);
    }
  };

  private handleVisualizationTypeChange = (_: any, opt?: IDropdownOption) => {
    if (opt) {
      const type = opt.key as VisualizationType;
      this.props.setVisualizationType(type);
    }
  };
}

const mapProps = (rootState: RootState) => ({
  theme: rootState.theme.current,
  ...rootState.analysisDetail,
});

const mapDispatch = {
  fetchAnalysisDetailById,
  setVisualizationType,
  downloadAnalysisById,
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisDetail);
