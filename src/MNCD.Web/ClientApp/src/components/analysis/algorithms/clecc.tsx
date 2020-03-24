import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Stack, TextField } from "office-ui-fabric-react";
import { updateAnalysisParameters } from "../../../slices/analysis-slice";

class CLECC extends React.Component<ReduxProps> {
  handleAlphaChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ alpha: value });
    }
  };

  handleGetAlphaErrorMessage = (value: string) => {
    const alpha = Number(value);

    if (alpha < 0) {
      return "Alpha must be greater or equal than zero.";
    }

    if (this.props.maxAlpha && alpha > this.props.maxAlpha) {
      return "Alpha must be less or equal than number of layers in network.";
    }

    return "";
  };

  handleKChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ k: value });
    }
  };

  handleGetKErrorMessage = (value: string) => {
    const k = Number(value);

    if (k <= 0) {
      return "K must be greater than zero.";
    }

    if (this.props.maxK && k > this.props.maxK) {
      return "K must be less or equal than number of actors in network.";
    }

    return "";
  };

  render = () => (
    <Stack>
      <Stack.Item>
        <TextField
          type="number"
          label="K"
          description="Number of communities"
          value={this.props.k}
          onGetErrorMessage={this.handleGetKErrorMessage}
          onChange={this.handleKChange}
        />
      </Stack.Item>
      <Stack.Item>
        <TextField
          type="number"
          label="Alpha"
          description="Minumum number of layers on which node must be nieghbour"
          value={this.props.alpha}
          onChange={this.handleAlphaChange}
        />
      </Stack.Item>
    </Stack>
  );
}

const mapProps = (state: RootState) => {
  const { request, dataSet } = state.analysis;
  const { k, alpha } = request.analysisAlgorithmParameters;
  return {
    k: k,
    maxK: dataSet ? dataSet.nodeCount : null,
    alpha: alpha,
    maxAlpha: dataSet ? dataSet.layerCount : null
  };
};

const mapDispatch = { updateAnalysisParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CLECC);
