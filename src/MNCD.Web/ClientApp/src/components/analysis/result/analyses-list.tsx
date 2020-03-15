import React, { Component } from "react";
import { RootState } from "../../../store";
import { connect, ConnectedProps } from "react-redux";
import { Stack, List, Checkbox } from "office-ui-fabric-react";
import {
  approachToString,
  analysisToString,
  flatteningToString
} from "../../../utils";
import { AnalysisRequestViewModel, AnalysisApproach } from "../../../types";
import { toggleVisibility } from "../../../slices/AnalysisSlice";

export class AnalysesList extends Component<ReduxProps> {
  toggleAnalysis = (id: number) => {
    this.props.toggleVisibility(id);
  };

  handleRenderCell = (item?: {
    id: number;
    isOpen: boolean;
    req: AnalysisRequestViewModel;
  }) => {
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
              cursor: "pointer"
            }
          }}
          onClick={() => this.toggleAnalysis(item.id)}
        >
          <Stack.Item align="center">
            <Checkbox checked={item.isOpen} />
          </Stack.Item>
          <Stack.Item grow={2}>
            <Stack>
              <Stack>
                <Stack.Item>
                  <b>Analysis {item.id} 123</b>
                </Stack.Item>
              </Stack>
              <Stack horizontal horizontalAlign="space-between">
                {item.req.approach !== AnalysisApproach.SingleLayerFlattening ?
                  null : //<Stack.Item>{approachToString(item.req.approach)}</Stack.Item> :
                  <Stack.Item>Single Layer <br /> Flattening</Stack.Item>
                }
                <Stack.Item>
                  {flatteningToString(item.req.flatteningAlgorithm)}
                </Stack.Item>
                <Stack.Item>
                  {analysisToString(item.req.analysisAlgorithm)}
                </Stack.Item>
              </Stack>
            </Stack>
          </Stack.Item>
        </Stack >
      );
    }
    return "";
  };

  render() {
    console.log("test");
    return (
      <Stack tokens={{ childrenGap: 10, padding: 10 }}>
        <List
          items={this.props.items.map(i => ({
            id: i.id,
            isOpen: i.isOpen,
            req: i.request
          }))}
          onRenderCell={this.handleRenderCell}
        />
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

export default connector(AnalysesList);
