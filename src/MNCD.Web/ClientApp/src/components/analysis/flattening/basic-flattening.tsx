import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Toggle, Stack } from "office-ui-fabric-react";
import { updateFlatteningParameters } from "../../../slices/analysis-slice";

class BasicFlattening extends React.Component<ReduxProps> {
  handleWeightEdgesChange = (_: any, checked?: boolean) => {
    if (checked !== undefined) {
      this.props.updateFlatteningParameters({ weightEdges: checked });
    }
  };

  render() {
    return (
      <Stack>
        <Stack.Item>
          <Toggle
            label="Weight Edges"
            checked={this.props.weightEdges}
            onChange={this.handleWeightEdgesChange}
          />
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => ({
  weightEdges: Boolean(
    rootState.analysis.request.flatteningAlgorithmParameters["weightEdges"]
  )
});

const mapDispatch = { updateFlatteningParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(BasicFlattening);
