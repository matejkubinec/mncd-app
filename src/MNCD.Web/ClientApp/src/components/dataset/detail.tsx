import React, { Component } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { RouteComponentProps } from "react-router";
import { fetchDataSetDetailById } from "../../slices/dataset-detail-slice";
import { Stack, Separator, List } from "office-ui-fabric-react";
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

    if (!dataSet) {
      return "";
    }

    const { diagonalUrl, slicesUrl } = dataSet;
    const titles = ["", ""];
    const urls = [diagonalUrl, slicesUrl];

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
            <h1 style={{ textAlign: "center" }}>{dataSet.name}</h1>
          </Stack.Item>
          <Stack.Item>
            <Separator />
          </Stack.Item>
          <Stack horizontal>
            <Stack grow={2} tokens={{ padding: "25px 25px 0 25px" }}>
              <h3 style={{ textAlign: "center" }}>Information</h3>
              <table style={{ width: 250 }}>
                <tbody>
                  {this.renderItem("Node Count", dataSet.nodeCount)}
                  {this.renderItem("Edge Count", dataSet.edgeCount)}
                  {this.renderItem("Layer Count", dataSet.layerCount)}
                  {this.renderItem("File Type", dataSet.fileType)}
                </tbody>
              </table>
              <Separator />
              <h4>Layers</h4>
              <ol>
                <List
                  items={dataSet.layerNames}
                  onRenderCell={this.renderListItem}
                />
              </ol>
              <Separator />
              <h4>Actors</h4>
              <ol>
                <List
                  items={dataSet.actorNames}
                  onRenderCell={this.renderListItem}
                />
              </ol>
            </Stack>
            <Stack grow={3} maxWidth={1000}>
              <h3 style={{ textAlign: "center" }}>Visualization</h3>
              <ImageGallery titles={titles} urls={urls} useMaxHeight />
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }

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

const mapDispatch = { fetchDataSetDetailById };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DataSetDetail);
