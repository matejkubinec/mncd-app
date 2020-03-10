import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Stack, TextField } from "office-ui-fabric-react";
import { RootState } from "../../../store";
import { updateAnalysisParameters } from "../../../slices/AnalysisSlice"

class LocalSimplification extends React.Component<ReduxProps> {

  onTresholdChange(_: any, value?: string) {
    if (value === undefined) return;

    const treshold = Number(value);
    if (0.0 <= treshold && treshold <= 1.0) {
      this.props.updateAnalysisParameters({ treshold });
    }
  }

  render() {
    return <Stack>
      <TextField
        styles={{ fieldGroup: { width: 250 } }}
        label="Threshold"
        type="number"
        value={String(this.props.treshold)}
        onChange={this.onTresholdChange}
      />
      TODO: local simplification layer relevances
      </Stack>
  }
}

const mapProps = (rootState: RootState) => ({
  treshold: rootState.analysis.request.flatteningAlgorithmParameters["treshold"]
});

const mapDispatch = { updateAnalysisParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LocalSimplification);