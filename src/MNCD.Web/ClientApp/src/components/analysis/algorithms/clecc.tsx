import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import {
  Stack,
  TextField,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import { updateAnalysisParameters } from "../../../slices/analysis-slice";

class CLECC extends React.Component<ReduxProps> {
  render = () => {
    if (!this.props.hasDataSet) {
      return (
        <MessageBar messageBarType={MessageBarType.warning}>
          Please select dataset first.
        </MessageBar>
      );
    }

    return (
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
            onGetErrorMessage={this.handleGetAlphaErrorMessage}
            onChange={this.handleAlphaChange}
          />
        </Stack.Item>
      </Stack>
    );
  };

  private handleAlphaChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ alpha: value });
    }
  };

  private handleGetAlphaErrorMessage = (value: string) => {
    const { maxAlpha } = this.props;
    const alpha = Number(value);

    if (alpha < 0) {
      return "Alpha must be greater or equal than zero.";
    }

    if (alpha > maxAlpha) {
      return `Alpha must be less or equal than number of layers in network. (${maxAlpha})`;
    }

    return "";
  };

  private handleKChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ k: value });
    }
  };

  private handleGetKErrorMessage = (value: string) => {
    const { maxK } = this.props;
    const k = Number(value);

    if (k <= 0) {
      return "K must be greater than zero.";
    }

    if (k > maxK) {
      return `K must be less or equal than number of actors in network. (${maxK})`;
    }

    return "";
  };
}

const mapProps = (state: RootState) => {
  const { request, dataSet } = state.analysis;
  const { k, alpha } = request.analysisAlgorithmParameters;
  const hasDataSet = !!dataSet;
  const maxK = dataSet ? dataSet.nodeCount : 2;
  const maxAlpha = dataSet ? dataSet.layerCount : 1;

  return {
    k,
    maxK,
    alpha,
    maxAlpha,
    hasDataSet,
  };
};

const mapDispatch = { updateAnalysisParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CLECC);
