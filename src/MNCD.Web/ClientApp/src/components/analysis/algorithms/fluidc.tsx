import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Stack,
  TextField,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import { RootState } from "../../../store";
import {
  updateAnalysisParameters,
  setHasAnalysisError,
} from "../../../slices/analysis-slice";

class FluidC extends React.Component<ReduxProps> {
  render() {
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
            label="K"
            type="number"
            description="Number of communities"
            value={this.props.k}
            onGetErrorMessage={this.onGetErrorMessageK}
            onChange={this.onKChange}
          />
        </Stack.Item>
        <Stack.Item>
          <TextField
            label="Max Iterations"
            type="number"
            description="Number of iterations"
            value={this.props.maxIterations}
            onGetErrorMessage={this.onGetErrorMessageMaxIterations}
            onChange={this.onMaxIterationsChange}
          />
        </Stack.Item>
      </Stack>
    );
  }

  private onKChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ k: value });
      this.validate(value, this.props.maxIterations);
    }
  };

  private onGetErrorMessageK = (value: string) => {
    if (Number(value) < 2) {
      return "K must be greater than 1.";
    }

    if (Number(value) > this.props.maxK) {
      return `K must be less than number of actors (${this.props.maxK}).`;
    }
  };

  private onMaxIterationsChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ maxIterations: value });
      this.validate(this.props.k, value);
    }
  };

  private onGetErrorMessageMaxIterations = (value: string) => {
    if (Number(value) < 1) {
      return "MaxIterations must be greater than zero.";
    }
  };

  private validate = (k: string, maxIterations: string) => {
    const hasError =
      !!this.onGetErrorMessageK(k) ||
      !!this.onGetErrorMessageMaxIterations(maxIterations);

    this.props.setHasAnalysisError(hasError);
  };
}

const mapProps = (state: RootState) => {
  const { request, dataSet } = state.analysis;
  const { k, maxIterations } = request.analysisAlgorithmParameters;
  const hasDataSet = !!dataSet;
  const maxK = dataSet ? dataSet.nodeCount : 2;

  return {
    k,
    maxK,
    maxIterations,
    hasDataSet,
  };
};

const mapDispatch = {
  updateAnalysisParameters,
  setHasAnalysisError,
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(FluidC);
