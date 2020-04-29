import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { Stack } from "office-ui-fabric-react";
import {
  toggleVisibility,
  AnalysesLayout,
  openDeleteDialog,
} from "../../slices/analysis-slice";
import {
  AnalysisResultItem,
  AnalysisResultControls,
  AnalysisSideBySide,
} from "./index";

class AnalysisResult extends React.Component<ReduxProps> {
  render() {
    const { items, isSideBySide, hasItems, theme } = this.props;

    if (!hasItems) {
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
          {isSideBySide ? (
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
              {items.map((item) => (
                <AnalysisResultItem
                  key={item.id}
                  analysis={item}
                  theme={theme}
                  onDelete={this.handleAnalysisDelete}
                  onMinimize={this.handleAnalysisMinimize}
                />
              ))}
            </Stack>
          )}
        </Stack.Item>
      </Stack>
    );
  }

  private handleAnalysisMinimize = (id: number) => {
    this.props.toggleVisibility(id);
  };

  private handleAnalysisDelete = (id: number) => {
    this.props.openDeleteDialog(id);
  };
}

const mapProps = (rootState: RootState) => {
  const { session, layout } = rootState.analysis;
  const theme = rootState.theme.current;
  const items = session ? session.analyses.filter((a) => a.isOpen) : [];
  const hasItems = session && session.analyses.length > 0;
  const isSideBySide = layout === AnalysesLayout.SideBySide;

  return {
    theme,
    items,
    hasItems,
    isSideBySide,
  };
};

const mapDispatch = { toggleVisibility, openDeleteDialog };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResult);
