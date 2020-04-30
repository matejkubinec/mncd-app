import React from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Stack,
  TextField,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import { RootState } from "../../../store";
import { updateAnalysisParameters } from "../../../slices/analysis-slice";

interface IProps extends ReduxProps {}

interface IState {}

class FluidC extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.onKChange = this.onKChange.bind(this);
    this.onMaxIterationsChange = this.onMaxIterationsChange.bind(this);
    this.onGetErrorMessageK = this.onGetErrorMessageK.bind(this);
    this.onGetErrorMessageMaxIterations = this.onGetErrorMessageMaxIterations.bind(
      this
    );
  }

  onKChange(_: any, value?: string) {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ k: value });
    }
  }

  onGetErrorMessageK(value: string) {
    if (Number(value) < 2) {
      return "K must be greater than 1.";
    }

    if (Number(value) > this.props.maxK) {
      return `K must be less than number of actors (${this.props.maxK}).`;
    }
  }

  onMaxIterationsChange(_: any, value?: string) {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ maxIterations: value });
    }
  }

  onGetErrorMessageMaxIterations(value: string) {
    if (Number(value) < 1) {
      return "MaxIterations must be greater than zero.";
    }
  }

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

const mapDispatch = { updateAnalysisParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(FluidC);
