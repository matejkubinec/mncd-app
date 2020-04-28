import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import {
  AnalysisResultItem,
  AnalysisResultControls,
  AnalysisSideBySide,
} from "./index";
import { Stack } from "office-ui-fabric-react";

class AnalysisResult extends React.Component<ReduxProps> {
  renderAnalyses = () => {
    return this.props.items
      .filter((i) => i.isOpen)
      .map((item, i) => (
        <Stack.Item key={i} grow={1}>
          <AnalysisResultItem analysis={item} theme={this.props.theme} />
        </Stack.Item>
      ));
  };

  render() {
    if (this.props.items.length === 0) {
      return null;
    }

    return (
      <Stack horizontal tokens={{ childrenGap: 20, padding: 20 }}>
        <Stack.Item
          styles={{ root: { maxWidth: 600, marginTop: 5 } }}
          align="start"
        >
          <AnalysisResultControls />
        </Stack.Item>
        <Stack.Item
          grow={2}
          styles={{
            root: { overflowX: "scroll", overflowY: "hidden" },
          }}
        >
          {this.props.isSideBySide ? (
            <AnalysisSideBySide />
          ) : (
            <Stack
              horizontal
              horizontalAlign="end"
              tokens={{ childrenGap: 20 }}
              styles={{
                root: { justifyContent: "initial", padding: 20, paddingTop: 5 },
              }}
            >
              {this.renderAnalyses()}
            </Stack>
          )}
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => {
  const { session, layout } = rootState.analysis;
  return {
    theme: rootState.theme.current,
    items: session ? session.analyses : [],
    isSideBySide: layout === "side-by-side",
  };
};

const mapDispatch = {};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResult);
