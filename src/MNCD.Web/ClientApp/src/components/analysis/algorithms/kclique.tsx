import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { updateAnalysisParameters } from "../../../slices/analysis-slice";
import { Stack, TextField } from "office-ui-fabric-react";

class KClique extends React.Component<ReduxProps> {
  handleKChange = (_: any, value?: string) => {
    if (value !== undefined) {
      this.props.updateAnalysisParameters({ k: value });
    }
  };

  handleGetErrorMessage = (value: string) => {
    if (Number(value) < 2) {
      return "K must be greater than 1.";
    }
  };

  render() {
    return (
      <Stack>
        <Stack.Item>
          <TextField
            label="K"
            type="number"
            description="Size of smallest clique"
            value={this.props.k}
            onGetErrorMessage={this.handleGetErrorMessage}
            onChange={this.handleKChange}
          />
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (state: RootState) => ({
  k: state.analysis.request.analysisAlgorithmParameters["k"]
});

const mapDispatch = { updateAnalysisParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(KClique);
