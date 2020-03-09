import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import {
  Stack,
  PrimaryButton,
  ProgressIndicator,
  Separator,
  IconButton
} from "office-ui-fabric-react";
import {
  AnalysisDataSetControl,
  AnalysisApproachControl,
  AnalysisChooseLayerControl,
  AnalysisAlgorithmControl,
  AnalysisFlatteningControl
} from "./controls";
import {
  analyzeDataSet,
  toggleControlsVisiblity
} from "../../slices/AnalysisSlice";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import {
  MotionDurations,
  MotionAnimations
} from "@uifabric/fluent-theme/lib/fluent/FluentMotion";

class AnalysisControls extends React.Component<ReduxProps> {
  toggleControlsVisiblity = () => {
    this.props.toggleControlsVisiblity();
  };

  handleAnalyzeDatasetClick = () => {
    this.props.analyzeDataSet();
  };

  render() {
    return (
      <Stack.Item
        styles={{
          root: { height: this.props.areControlsVisible ? "100%" : "50px" }
        }}
      >
        <Stack
          horizontal
          styles={{
            root: {
              position: "relative",
              backgroundColor: this.props.theme.palette.white,
              boxShadow: this.props.theme.effects.elevation4,
              zIndex: 10
            }
          }}
          horizontalAlign="center"
        >
          <IconButton
            iconProps={{
              iconName: this.props.areControlsVisible
                ? "ChevronUp"
                : "ChevronDown"
            }}
            style={{ width: "100%" }}
            onClick={this.toggleControlsVisiblity}
          />
        </Stack>
        <Stack
          tokens={{ padding: 10 }}
          styles={{
            root: {
              position: "relative",
              width: "100%",
              top: this.props.areControlsVisible ? 0 : -330,
              transitionDuration: MotionDurations.duration2,
              transition: "all " + MotionAnimations.slideRightIn,
              boxShadow: this.props.theme.effects.elevation4,
              backgroundColor: this.props.theme.palette.white
            }
          }}
        >
          <Stack
            horizontal
            horizontalAlign="space-evenly"
            tokens={{ childrenGap: 10 }}
          >
            <Stack.Item>
              <AnalysisDataSetControl />
            </Stack.Item>
            <Stack.Item>
              <AnalysisApproachControl />
            </Stack.Item>
            <Stack.Item>
              <AnalysisChooseLayerControl />
            </Stack.Item>
            <Stack.Item>
              <AnalysisFlatteningControl />
            </Stack.Item>
            <Stack.Item>
              <AnalysisAlgorithmControl />
            </Stack.Item>
          </Stack>
          <Separator />
          <Stack horizontal tokens={{ childrenGap: 10 }} horizontalAlign="end">
            <Stack.Item grow={5} align="center">
              {this.props.isAnalyzing ? <ProgressIndicator /> : null}
            </Stack.Item>
            <Stack.Item>
              <PrimaryButton
                type="submit"
                disabled={!this.props.isRequestValid}
                onClick={this.handleAnalyzeDatasetClick}
              >
                Analyze
              </PrimaryButton>
            </Stack.Item>
          </Stack>
        </Stack>
      </Stack.Item>
    );
  }
}

const mapProps = (rootState: RootState) => ({
  theme: rootState.theme.current,
  isAnalyzing: rootState.analysis.isAnalyzing,
  isRequestValid: rootState.analysis.isRequestValid,
  areControlsVisible: rootState.analysis.areControlsVisible
});

const mapDispatch = { analyzeDataSet, toggleControlsVisiblity };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisControls);
