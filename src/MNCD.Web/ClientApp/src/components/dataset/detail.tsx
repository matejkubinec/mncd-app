import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { RouteComponentProps } from "react-router";
import {
  fetchDataSetDetailById,
  downloadDataSetById,
} from "../../slices/dataset-detail-slice";
import {
  Stack,
  Separator,
  List,
  PrimaryButton,
  ProgressIndicator,
} from "office-ui-fabric-react";
import { ImageGallery } from "../common";

interface MatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<MatchParams>, ReduxProps {}

class DataSetDetail extends Component<IProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchDataSetDetailById(id);
  }

  render() {
    const { isLoading, dataSet, theme } = this.props;

    if (isLoading) {
      return "Loading...";
    }

    return (
      <Stack tokens={{ padding: 25 }}>
        <Stack
          tokens={{ padding: "10px 25px 25px 25px" }}
          style={{
            borderRadius: theme.effects.roundedCorner2,
            boxShadow: theme.effects.elevation16,
            background: theme.palette.white,
          }}
        >
          <Stack.Item>
            <h1>{dataSet ? dataSet.name : "Dataset"}</h1>
          </Stack.Item>
          <Stack.Item>
            <Separator />
            {this.renderBody()}
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }

  private handleDownload = () => {
    if (this.props.dataSet) {
      const { id } = this.props.dataSet;
      this.props.downloadDataSetById(id);
    }
  };

  private renderBody = () => {
    const { dataSet, error, isLoading, theme } = this.props;

    if (isLoading) {
      return <ProgressIndicator />;
    }

    if (error) {
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
    }

    if (!dataSet) {
      return null;
    }

    const { diagonalUrl, slicesUrl } = dataSet;
    const titles = ["", ""];
    const urls = [diagonalUrl, slicesUrl];
    const colsActors = Math.round(dataSet.nodeCount / 20);
    const colsLayers = Math.round(dataSet.layerCount / 5);

    return (
      <Stack horizontal>
        <Stack grow={2} tokens={{ padding: "25px 25px 0 25px" }}>
          <h2 style={{ textAlign: "center" }}>Information</h2>
          <table style={{ width: 250 }}>
            <tbody>
              {this.renderItem("Node Count", dataSet.nodeCount)}
              {this.renderItem("Edge Count", dataSet.edgeCount)}
              {this.renderItem("Layer Count", dataSet.layerCount)}
              {this.renderItem("File Type", dataSet.fileType)}
            </tbody>
          </table>
          <Separator />
          <h3>Layers</h3>
          <ol style={{ columns: colsLayers > 1 ? colsLayers : 1 }}>
            <List
              items={dataSet.layerNames}
              onRenderCell={this.renderListItem}
            />
          </ol>
          <Separator />
          <h3>Actors</h3>
          <ol style={{ columns: colsActors > 1 ? colsActors : 1 }}>
            <List
              items={dataSet.actorNames}
              onRenderCell={this.renderListItem}
            />
          </ol>
          <Stack.Item verticalFill>
            <Stack verticalAlign="end" verticalFill>
              <Separator />
              <PrimaryButton onClick={this.handleDownload}>
                Download
              </PrimaryButton>
            </Stack>
          </Stack.Item>
        </Stack>
        <Stack grow={3} maxWidth={1000}>
          <h2 style={{ textAlign: "center" }}>Visualization</h2>
          <ImageGallery titles={titles} urls={urls} useMaxHeight />
        </Stack>
      </Stack>
    );
  };

  private renderListItem = (item?: string) => <li>{item || ""}</li>;

  private renderItem = (label: string, value: string | number) => (
    <tr>
      <td>
        <strong>{label}:</strong>
      </td>
      <td>
        <span style={{ paddingLeft: 5 }}>{value}</span>
      </td>
    </tr>
  );
}

const mapProps = (rootState: RootState) => ({
  ...rootState.datasetDetail,
  theme: rootState.theme.current,
});

const mapDispatch = { fetchDataSetDetailById, downloadDataSetById };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DataSetDetail);
