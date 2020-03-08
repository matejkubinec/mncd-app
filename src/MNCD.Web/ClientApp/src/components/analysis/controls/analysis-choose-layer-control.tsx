import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { updateSelectedLayer } from "../../../slices/AnalysisSlice";
import { Stack, TextField } from "office-ui-fabric-react";
import Analysis from "../../Analysis";
import { AnalysisApproach } from "../../../types";

class AnalysisChooseLayerControl extends React.Component<ReduxProps> {
  handleSelectedLayerChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateSelectedLayer(Number(value));
    }
  };

  handleGetErrorMessage = (value?: string) => {
    if (this.props.layerCount === null || value === undefined) {
      return "";
    }

    const selectedLayer = Number(value);

    if (selectedLayer > this.props.layerCount) {
      return `Selected layer must be less than number of layers (${this.props.layerCount}).`;
    }

    if (selectedLayer < 0) {
      return "Selected layer must be a positive integer.";
    }

    return "";
  };

  getPlaceholder() {
    if (this.props.layerCount === null) {
      return "Select dataset first.";
    }
    return "";
  }

  render() {
    if (this.props.approach !== AnalysisApproach.SingleLayerOnly) {
      return null;
    }

    return (
      <Stack>
        <Stack.Item>
          <TextField
            label="Selected Layer"
            type="number"
            disabled={this.props.layerCount === null}
            placeholder={this.getPlaceholder()}
            value={
              this.props.layerCount
                ? this.props.selectedLayer.toString()
                : undefined
            }
            onChange={this.handleSelectedLayerChange}
            onGetErrorMessage={this.handleGetErrorMessage}
          />
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => {
  const { dataSet } = rootState.analysis;
  const { selectedLayer, approach } = rootState.analysis.request;
  return {
    approach: approach,
    selectedLayer: selectedLayer,
    layerCount: dataSet ? dataSet.layerCount : null
  };
};

const mapDispatch = { updateSelectedLayer };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisChooseLayerControl);
