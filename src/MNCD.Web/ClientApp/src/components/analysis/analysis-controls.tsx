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
      <React.Fragment>
        <Stack
          horizontal
          styles={{
            root: {
              position: "relative",
              backgroundColor: NeutralColors.white,
              boxShadow: Depths.depth4,
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
              boxShadow: Depths.depth4,
              backgroundColor: NeutralColors.white
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
      </React.Fragment>
    );
  }
}

const mapProps = (rootState: RootState) => ({
  isAnalyzing: rootState.analysis.isAnalyzing,
  isRequestValid: rootState.analysis.isRequestValid,
  areControlsVisible: rootState.analysis.areControlsVisible
});

const mapDispatch = { analyzeDataSet, toggleControlsVisiblity };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisControls);
