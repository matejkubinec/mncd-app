import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Stack, Toggle, List, Checkbox, VerticalDivider, ScrollablePane } from "office-ui-fabric-react";
import { updateFlatteningParameters } from "../../../slices/AnalysisSlice";

interface Row {
  name: string;
  checked: boolean;
}

class MergeFlattening extends React.Component<ReduxProps> {
  handleToggleIncludeWeights = (_: any, checked: boolean | undefined) => {
    if (checked === undefined) return;

    this.props.updateFlatteningParameters({
      includeWeights: checked ? "true" : "false"
    });
  }

  handleToggleLayer = (checked: boolean | undefined, index: number | undefined) => {
    if (checked === undefined || index === undefined) return;

    if (checked) {
      this.props.layerIndices.push(index);
      const json = JSON.stringify(this.props.layerIndices);
      this.props.updateFlatteningParameters({ layerIndices: json });

    } else if (!checked) {
      const layerIndices = this.props.layerIndices.filter(l => l !== index);
      const json = JSON.stringify(layerIndices);
      this.props.updateFlatteningParameters({ layerIndices: json });
    }
  }

  renderRow = (item: Row | undefined, index: number | undefined): JSX.Element | null => {
    if (index === undefined || item === undefined) return null;

    const tokens = { childrenGap: 5, padding: 5 };
    const onChange = (_: any, checked: boolean | undefined) => this.handleToggleLayer(checked, index);
    return <Stack horizontal tokens={tokens}>
      <Checkbox checked={item.checked} label={item.name} onChange={onChange} />
    </Stack>
  }

  render() {
    return <Stack horizontal>
      <Stack grow={1}>
        <Stack.Item>
          <Toggle
            label="Include Weights"
            checked={this.props.includeWeights}
            onChange={this.handleToggleIncludeWeights}
          />
        </Stack.Item>
      </Stack>
      <Stack grow={2}>
        <Stack.Item styles={{ root: { padding: "5px 0px" } }} >
          <label style={{ fontWeight: 600 }}>Included Layers</label>
        </Stack.Item>
        <Stack.Item styles={{ root: { position: "relative", width: "100%", height: 200 } }}>
          <ScrollablePane>
            <List
              items={this.props.layers}
              onRenderCell={this.renderRow}
            />
          </ScrollablePane>
        </Stack.Item>
      </Stack>
    </Stack>;
  }
}

const mapProps = (state: RootState) => {
  const { dataSet, request } = state.analysis;
  const { layerIndices, includeWeights } = request.flatteningAlgorithmParameters;
  const names = dataSet ? dataSet.layerNames : [];
  const indices = JSON.parse(layerIndices) as number[];
  const layers = names.map((n, i) => ({
    name: n,
    checked: indices.includes(i)
  }));
  return {
    theme: state.theme.current,
    includeWeights: includeWeights === "true",
    layers: layers,
    layerIndices: indices
  };
};

const mapDispatch = { updateFlatteningParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(MergeFlattening);
