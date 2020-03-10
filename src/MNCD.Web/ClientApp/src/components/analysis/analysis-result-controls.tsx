import React, { Component } from "react";
import { RootState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import { Stack, Checkbox, List, VerticalDivider } from "office-ui-fabric-react";
import {
  approachToString,
  analysisToString,
  flatteningToString
} from "../../utils";
import { AnalysisRequestViewModel } from "../../types";
import { toggleVisibility } from "../../slices/AnalysisSlice";

interface IListItem {
  id: number;
  isOpen: boolean;
  req: AnalysisRequestViewModel;
}

export class AnalysisResultControls extends Component<ReduxProps> {
  toggleAnalysis = (id: number) => {
    this.props.toggleVisibility(id);
  };

  handleRenderCell = (item?: IListItem) => {
    if (item) {
      return (
        <Stack
          horizontal
          tokens={{ padding: 15, childrenGap: 5 }}
          styles={{
            root: {
              boxShadow: this.props.theme.effects.elevation4,
              marginBottom: 15,
              backgroundColor: this.props.theme.palette.white,
              borderRadius: this.props.theme.effects.roundedCorner2,
              cursor: "pointer",
              userSelect: "none"
            }
          }}
          onClick={() => this.toggleAnalysis(item.id)}
        >
          <Stack.Item align="center">
            <Checkbox checked={item.isOpen} />
          </Stack.Item>
          <Stack.Item>
            <VerticalDivider />
          </Stack.Item>
          <Stack.Item grow={2}>
            <Stack>
              <Stack>
                <Stack.Item>
                  <b>Analysis {item.id}</b>
                </Stack.Item>
              </Stack>
              <Stack horizontal horizontalAlign="space-between">
                <Stack.Item>{approachToString(item.req.approach)}</Stack.Item>
                <Stack.Item>
                  {flatteningToString(item.req.flatteningAlgorithm)}
                </Stack.Item>
                <Stack.Item>
                  {analysisToString(item.req.analysisAlgorithm)}
                </Stack.Item>
              </Stack>
            </Stack>
          </Stack.Item>
        </Stack>
      );
    }
    return "";
  };

  render() {
    const listItems = this.props.items.map(i => {
      return { id: i.id, isOpen: i.isOpen, req: i.request } as IListItem;
    });

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <List items={listItems} onRenderCell={this.handleRenderCell} />
      </Stack>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const { session } = state.analysis;
  return {
    items: session ? session.analyses : [],
    theme: state.theme.current
  };
};

const mapDispatchToProps = { toggleVisibility };

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResultControls);
