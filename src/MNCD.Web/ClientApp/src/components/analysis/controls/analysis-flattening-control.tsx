import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { AnalysisApproach, FlattenningAlgorithm } from "../../../types";
import { Stack, IDropdownOption, Dropdown } from "office-ui-fabric-react";
import { setFlatteningAlgorithm } from "../../../slices/analysis-slice";
import {
  LocalSimplification,
  BasicFlattening,
  MergeFlattening,
  WeightedFlattening
} from "../flattening";

class AnalysisFlatteningControl extends React.Component<ReduxProps> {
  private options: IDropdownOption[] = [
    {
      key: FlattenningAlgorithm.BasicFlattening,
      text: "Basic Flattening"
    },
    {
      key: FlattenningAlgorithm.LocalSimplification,
      text: "Local Simplification"
    },
    {
      key: FlattenningAlgorithm.MergeFlattening,
      text: "Merge Flattening"
    },
    {
      key: FlattenningAlgorithm.WeightedFlattening,
      text: "Weighted Flattening"
    }
  ];

  handleAlgorithmChange = (_: any, option?: IDropdownOption) => {
    if (option) {
      const algorithm = Number(option.key) as FlattenningAlgorithm;
      this.props.setFlatteningAlgorithm(algorithm);
    }
  };

  renderBody = () => {
    switch (this.props.algorithm) {
      case FlattenningAlgorithm.BasicFlattening:
        return <BasicFlattening />;
      case FlattenningAlgorithm.LocalSimplification:
        return <LocalSimplification />;
      case FlattenningAlgorithm.MergeFlattening:
        return <MergeFlattening />;
      case FlattenningAlgorithm.WeightedFlattening:
        return <WeightedFlattening />;
      default:
        return null;
    }
  };

  render() {
    if (this.props.approach !== AnalysisApproach.SingleLayerFlattening) {
      return null;
    }

    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <Dropdown
            label="Flattening Algorithm"
            options={this.options}
            selectedKey={this.props.algorithm}
            onChange={this.handleAlgorithmChange}
            styles={{ dropdown: { minWidth: 300 } }}
          />
        </Stack.Item>
        <Stack.Item>{this.renderBody()}</Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => ({
  approach: rootState.analysis.request.approach,
  algorithm: rootState.analysis.request.flatteningAlgorithm
});

const mapDispatch = { setFlatteningAlgorithm };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisFlatteningControl);
