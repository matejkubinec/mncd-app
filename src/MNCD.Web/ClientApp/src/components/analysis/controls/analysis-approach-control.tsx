import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Stack, IChoiceGroupOption, ChoiceGroup } from "office-ui-fabric-react";
import { AnalysisApproach } from "../../../types";
import { setAnalysisApproach } from "../../../slices/analysis-slice";

class AnalysisApproachControl extends React.Component<ReduxProps> {
  private options: IChoiceGroupOption[] = [
    {
      key: AnalysisApproach.MultiLayer.toString(),
      text: "Multilayer"
    },
    {
      key: AnalysisApproach.SingleLayerFlattening.toString(),
      text: "Single Layer - Flattening"
    },
    {
      key: AnalysisApproach.SingleLayerOnly.toString(),
      text: "Single Layer"
    }
  ];

  handleApproachChange = (_: any, option?: IChoiceGroupOption) => {
    if (option) {
      const approach = Number(option.key) as AnalysisApproach;
      this.props.setAnalysisApproach(approach);
    }
  };

  render() {
    return (
      <Stack>
        <Stack.Item>
          <ChoiceGroup
            label="Approach"
            options={this.options}
            selectedKey={this.props.approach.toString()}
            onChange={this.handleApproachChange}
          />
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => ({
  approach: rootState.analysis.request.approach
});

const mapDispatch = { setAnalysisApproach };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisApproachControl);
