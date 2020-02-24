import { connect } from "react-redux";
import React from "react";
import { RootState } from "../store";
import { Modal, Stack, IconButton } from "office-ui-fabric-react";
import DataSetList from "./DataSetList";
import DataSetAdd from "./DataSetAdd";
import {
  updateAnalysisDataSet,
  openDataSetModal
} from "../slices/AnalysisSlice";
import { DataSetRowViewModel } from "../types";

interface IProps {
  isOpen: boolean;
  updateAnalysisDataSet: typeof updateAnalysisDataSet;
}

interface IState {
  isAdding: boolean;
}

class AnalysisDataSetModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isAdding: false
    };

    this.onAddNetwork = this.onAddNetwork.bind(this);
    this.onBackLinkClick = this.onBackLinkClick.bind(this);
    this.onChooseDataSet = this.onChooseDataSet.bind(this);
  }

  onAddNetwork() {
    this.setState({ isAdding: true });
  }

  onBackLinkClick() {
    this.setState({ isAdding: false });
  }

  onChooseDataSet(item: DataSetRowViewModel) {
    this.props.updateAnalysisDataSet(item);
    this.setState({ isAdding: false });
  }

  render() {
    const { isOpen } = this.props;

    return (
      <Modal isOpen={isOpen}>
        {this.state.isAdding ? (
          <Stack padding={25}>
            <DataSetAdd showBackLink onBackLinkClick={this.onBackLinkClick} />
          </Stack>
        ) : (
          <Stack padding={25}>
            <DataSetList
              onAddNetwork={this.onAddNetwork}
              onChooseDataSet={this.onChooseDataSet}
            />
          </Stack>
        )}
      </Modal>
    );
  }
}

const mapState = (state: RootState) => ({
  isOpen: state.analysis.isDataSetModalOpen
});

const mapDisptach = { updateAnalysisDataSet };

export default connect(mapState, mapDisptach)(AnalysisDataSetModal);
