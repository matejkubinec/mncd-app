import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Stack, DefaultButton, Label } from "office-ui-fabric-react";
import { DataSetsModal } from "../../dataset";
import { DataSetRowViewModel } from "../../../types";
import { updateAnalysisDataSet } from "../../../slices/AnalysisSlice";
import { openDataSetsModal } from "../../../slices/DataSetSlice";

class AnalysisDataSetControl extends React.Component<ReduxProps> {
  handleDataSetChosen = (dataSet: DataSetRowViewModel) => {
    this.props.updateAnalysisDataSet(dataSet);
  };

  handleChooseData = () => {
    this.props.openDataSetsModal();
  };

  render() {
    return (
      <React.Fragment>
        <DataSetsModal onDataSetChosen={this.handleDataSetChosen} />
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack.Item align="center">
            <Label>Dataset</Label>
          </Stack.Item>
          <Stack.Item>
            <DefaultButton onClick={this.handleChooseData}>
              Choose data
            </DefaultButton>
          </Stack.Item>
          <Stack.Item align="center">{this.props.name}</Stack.Item>
        </Stack>
      </React.Fragment>
    );
  }
}

const mapProps = (rootState: RootState) => {
  const { dataSet } = rootState.analysis;
  return {
    name: dataSet ? dataSet.name : ""
  };
};

const mapDispatch = { openDataSetsModal, updateAnalysisDataSet };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisDataSetControl);
