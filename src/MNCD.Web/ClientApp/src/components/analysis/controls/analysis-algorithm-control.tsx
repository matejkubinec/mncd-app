import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Stack, IDropdownOption, Dropdown } from "office-ui-fabric-react";
import { AnalysisAlgorithm } from "../../../types";
import { setAnalysisAlgorithm } from "../../../slices/analysis-slice";
import { FluidC, Louvain, KClique } from "../algorithms";

class AnalysisAlgorithmControl extends React.Component<ReduxProps> {
  private singleLayer: IDropdownOption[] = [
    { key: AnalysisAlgorithm.FluidC, text: "FluidC" },
    { key: AnalysisAlgorithm.Louvain, text: "Louvain" },
    { key: AnalysisAlgorithm.KClique, text: "KClique" }
  ];

  handleAlgorithmChange = (_: any, option?: IDropdownOption) => {
    if (option) {
      const algorithm = Number(option.key) as AnalysisAlgorithm;
      this.props.setAnalysisAlgorithm(algorithm);
    }
  };

  renderBody = () => {
    switch (this.props.algorithm) {
      case AnalysisAlgorithm.FluidC:
        return <FluidC />;
      case AnalysisAlgorithm.Louvain:
        return <Louvain />;
      case AnalysisAlgorithm.KClique:
        return <KClique />;
    }
  };

  render() {
    return (
      <Stack tokens={{ childrenGap: 10 }}>
        <Stack.Item>
          <Dropdown
            label="Analysis Algorithm"
            styles={{ dropdown: { minWidth: 315 } }}
            options={this.singleLayer}
            selectedKey={this.props.algorithm}
            onChange={this.handleAlgorithmChange}
          />
        </Stack.Item>
        <Stack.Item>{this.renderBody()}</Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => ({
  aproach: rootState.analysis.request.approach,
  algorithm: rootState.analysis.request.analysisAlgorithm
});

const mapDispatch = { setAnalysisAlgorithm };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisAlgorithmControl);
