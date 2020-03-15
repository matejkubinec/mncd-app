import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { updateSelectedLayer } from "../../../slices/analysis-slice";
import { Stack, Dropdown, IDropdownOption } from "office-ui-fabric-react";
import { AnalysisApproach } from "../../../types";

class AnalysisChooseLayerControl extends React.Component<ReduxProps> {
  handleSelectedLayerChange = (_: any, option?: IDropdownOption) => {
    if (option !== undefined) {
      this.props.updateSelectedLayer(Number(option.key));
    }
  };

  getPlaceholder() {
    if (this.props.layerNames === null) {
      return "Select dataset first.";
    }
    return "";
  }

  getItems = (): IDropdownOption[] => {
    if (this.props.layerNames === null) {
      return [];
    }

    return this.props.layerNames.map((l, i) => ({
      key: i,
      text: l
    } as IDropdownOption));
  }

  render() {
    if (this.props.approach !== AnalysisApproach.SingleLayerOnly) {
      return null;
    }

    return (
      <Stack>
        <Stack.Item>
          <Dropdown
            styles={{ dropdown: { width: 250 } }}
            label="Selected Layer"
            placeholder={this.getPlaceholder()}
            options={this.getItems()}
            selectedKey={this.props.selectedLayer}
            onChange={this.handleSelectedLayerChange}
            disabled={this.props.isDisabled}
          />
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => {
  const { dataSet } = rootState.analysis;
  const { selectedLayer, approach } = rootState.analysis.request;
  return {
    approach: approach,
    selectedLayer: selectedLayer,
    layerNames: dataSet ? dataSet.layerNames : null,
    isDisabled: dataSet ? false : true
  };
};

const mapDispatch = { updateSelectedLayer };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisChooseLayerControl);
