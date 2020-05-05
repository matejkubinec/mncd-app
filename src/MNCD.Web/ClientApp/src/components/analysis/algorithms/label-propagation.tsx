import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import {
  Stack,
  TextField,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import {
  updateAnalysisParameters,
  setHasAnalysisError,
} from "../../../slices/analysis-slice";

class LabelPropagation extends React.Component<ReduxProps> {
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

  private onMaxIterationsChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ maxIterations: value });
      this.validate(value);
    }
  };

  private onGetErrorMessageMaxIterations = (value: string) => {
    if (Number(value) < 1) {
      return "MaxIterations must be greater than zero.";
    }
  };

  private validate = (maxIterations: string) => {
    const hasError = !!this.onGetErrorMessageMaxIterations(maxIterations);

    this.props.setHasAnalysisError(hasError);
  };
}

const mapProps = (state: RootState) => {
  const { request, dataSet } = state.analysis;
  const { maxIterations } = request.analysisAlgorithmParameters;
  const hasDataSet = !!dataSet;

  return {
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

export default connector(LabelPropagation);
