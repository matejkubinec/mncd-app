import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { AnalysisResultItem, AnalysisResultControls } from "./index";
import { Stack } from "office-ui-fabric-react";

class AnalysisResult extends React.Component<ReduxProps> {
  render() {
    return (
      <Stack horizontal tokens={{ childrenGap: 20, padding: 20 }}>
        <Stack.Item styles={{ root: { maxWidth: 600 } }} align="start">
          <AnalysisResultControls />
        </Stack.Item>
        <Stack.Item grow={2}>
          <Stack
            horizontal
            horizontalAlign="space-evenly"
            tokens={{ childrenGap: 20 }}
          >
            {this.props.items.map(item => (
              <Stack.Item key={item.id} grow={1}>
                <AnalysisResultItem analysis={item} />
              </Stack.Item>
            ))}
          </Stack>
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => {
  const { session } = rootState.analysis;
  return {
    items: session ? session.analyses.filter(i => i.isOpen) : []
  };
};

const mapDispatch = {};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResult);
