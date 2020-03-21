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
} from "../../slices/analysis-slice";

class AnalysisControls extends React.Component<ReduxProps> {
  toggleControlsVisiblity = () => {
    this.props.toggleControlsVisiblity();
  };

  handleAnalyzeDatasetClick = () => {
    this.props.analyzeDataSet();
  };

  render() {
    return (
      <Stack.Item>
        <Stack
          horizontal
          styles={{
            root: {
              backgroundColor: this.props.theme.palette.white,
              boxShadow: this.props.theme.effects.elevation4,
              borderBottom: "1px solid " + this.props.theme.palette.neutralLight
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
              display: this.props.areControlsVisible ? "flex" : "none",
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
