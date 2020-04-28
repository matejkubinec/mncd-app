import React, { Component } from "react";
import { RootState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import {
  Stack,
  Checkbox,
  List,
  VerticalDivider,
  IconButton,
  Toggle,
} from "office-ui-fabric-react";
import {
  approachToString,
  analysisToString,
  flatteningToString,
} from "../../utils";
import { AnalysisRequestViewModel, AnalysisApproach } from "../../types";
import {
  toggleVisibility,
  toggleResultControls,
  setLayout,
} from "../../slices/analysis-slice";

interface IListItem {
  id: number;
  isOpen: boolean;
  req: AnalysisRequestViewModel;
}

export class AnalysisResultControls extends Component<ReduxProps> {
  toggleAnalysis = (id: number) => {
    this.props.toggleVisibility(id);
  };

  handleToggleControls = () => {
    this.props.toggleResultControls();
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
            },
          }}
        >
          <Stack.Item align="center">
            <Checkbox
              checked={item.isOpen}
              onChange={() => this.toggleAnalysis(item.id)}
            />
          </Stack.Item>
          <Stack.Item>
            <VerticalDivider />
          </Stack.Item>
          <Stack.Item grow={2}>
            <Stack>
              <Stack.Item styles={{ root: { marginBottom: 5 } }}>
                <b>Analysis {item.id}</b>
              </Stack.Item>
              <Stack
                horizontal
                horizontalAlign="space-between"
                tokens={{ childrenGap: 10 }}
              >
                <Stack.Item>{approachToString(item.req.approach)}</Stack.Item>
                {item.req.approach === AnalysisApproach.SingleLayerOnly ? (
                  <Stack.Item>{item.req.selectedLayerName}</Stack.Item>
                ) : null}
                {item.req.approach ===
                AnalysisApproach.SingleLayerFlattening ? (
                  <Stack.Item>
                    {flatteningToString(item.req.flatteningAlgorithm)}
                  </Stack.Item>
                ) : null}
              </Stack>
              <Stack
                horizontal
                horizontalAlign="space-between"
                tokens={{ childrenGap: 10 }}
              >
                <Stack.Item>{item.req.dataSetName}</Stack.Item>
                <Stack.Item>
                  {analysisToString(item.req.analysisAlgorithm)}
                </Stack.Item>
              </Stack>
            </Stack>
          </Stack.Item>
        </Stack>
      );
      // TODO: add delete analysis
      //<Stack.Item>
      //  <VerticalDivider />
      //</Stack.Item>
      //<Stack.Item align="center">
      //<IconButton iconProps={{ iconName: "Delete" }} />
      //</Stack.Item>
    }
    return "";
  };

  render() {
    const listItems = this.props.items.map((i) => {
      return { id: i.id, isOpen: i.isOpen, req: i.request } as IListItem;
    });

    return (
      <Stack>
        <Stack.Item
          styles={{
            root: {
              padding: 10,
              marginBottom: 10,
              backgroundColor: this.props.theme.palette.white,
              boxShadow: this.props.theme.effects.elevation4,
            },
          }}
        >
          <h4>Options</h4>
          <Toggle
            label="Layout"
            inlineLabel
            onText="Side-by-Side"
            offText="All"
            checked={this.props.isSideBySide}
            onChange={this.handleLayoutChange}
          />
        </Stack.Item>
        {!this.props.isSideBySide ? (
          <Stack
            horizontal
            tokens={{ childrenGap: 5 }}
            styles={{ root: { minHeight: 250 } }}
          >
            <Stack.Item
              styles={{
                root: {
                  marginBottom: 15,
                  borderRadius: this.props.theme.effects.roundedCorner2,
                  backgroundColor: this.props.theme.palette.white,
                  boxShadow: this.props.theme.effects.elevation4,
                  cursor: "pointer",
                  userSelect: "none",
                },
              }}
            >
              <IconButton
                style={{ height: "100%" }}
                iconProps={{
                  iconName: this.props.showControls
                    ? "ChevronLeft"
                    : "ChevronRight",
                }}
                onClick={this.handleToggleControls}
              />
            </Stack.Item>
            {this.props.showControls ? (
              <Stack.Item>
                <Stack tokens={{ childrenGap: 10 }}>
                  <List
                    items={listItems}
                    onRenderCell={this.handleRenderCell}
                  />
                </Stack>
              </Stack.Item>
            ) : null}
          </Stack>
        ) : null}
      </Stack>
    );
  }

  private handleLayoutChange = (_: any, checked?: boolean) => {
    if (checked !== undefined) {
      this.props.setLayout(checked ? "side-by-side" : "all");
    }
  };
}

const mapStateToProps = (state: RootState) => {
  const { session, areResultControlsVisible, layout } = state.analysis;
  return {
    showControls: areResultControlsVisible,
    items: session ? session.analyses : [],
    theme: state.theme.current,
    isSideBySide: layout === "side-by-side",
  };
};

const mapDispatchToProps = {
  toggleVisibility,
  toggleResultControls,
  setLayout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResultControls);
