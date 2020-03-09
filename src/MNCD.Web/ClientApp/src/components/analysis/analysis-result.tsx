import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { AnalysisResultItem, AnalysisResultControls } from "./index";
import { Stack, ScrollablePane } from "office-ui-fabric-react";
import { addVisualizations } from "../../slices/AnalysisSlice";

class AnalysisResult extends React.Component<ReduxProps> {
  renderAnalyses = () => {
    return this.props.items
      .filter(i => i.isOpen)
      .map((item, i) => (
        <Stack.Item key={i} grow={1}>
          <AnalysisResultItem analysis={item} />
        </Stack.Item>
      ));
  };

  render() {
    return (
      <Stack horizontal tokens={{ childrenGap: 20, padding: 20 }}>
        <Stack.Item styles={{ root: { width: 400 } }} align="start" grow={1}>
          <AnalysisResultControls />
        </Stack.Item>
        <Stack.Item grow={2}>
          <Stack
            horizontal
            horizontalAlign="space-evenly"
            tokens={{ childrenGap: 20 }}
          >
            {this.renderAnalyses()}
          </Stack>
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => {
  const { session, visualizing } = rootState.analysis;
  return {
    items: session ? session.analyses : [],
    visualizing: visualizing
  };
};

const mapDispatch = { addVisualizations };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResult);
