import React from "react";
import {
  closeDataSetsModal,
  fetchDataSetsList,
  saveDataSet,
  updateItemToAdd,
  openAddDataSetForm,
  closeAddDataSetForm,
  selectDataSet,
} from "../../slices/dataset-slice";
import { RootState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import {
  Stack,
  Separator,
  ProgressIndicator,
  PrimaryButton,
  StackItem,
  Modal,
  MessageBar,
  MessageBarType,
  DefaultButton,
} from "office-ui-fabric-react";
import DataSetsList from "./list-dataset";
import { AddDataSet, RemoveDataSet, EditDataSet } from ".";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import {
  MotionAnimations,
  MotionDurations,
} from "@uifabric/fluent-theme/lib/fluent/FluentMotion";
import { DataSetRowViewModel } from "../../types";

interface IProps extends ReduxProps {
  onDataSetChosen: (dataSet: DataSetRowViewModel) => void;
}

class DataSetsModal extends React.Component<IProps> {
  componentDidMount() {
    this.props.fetchDataSetsList();
  }

  onDismiss = () => {
    this.props.closeDataSetsModal();
  };

  onAddNetwork = () => {
    this.props.openAddDataSetForm();
  };

  handleSelectDataSet = (dataSet: DataSetRowViewModel) => {
    this.props.selectDataSet(dataSet);
  };

  handleChooseDataSet = () => {
    if (this.props.dataSet) {
      this.props.closeDataSetsModal();
      this.props.onDataSetChosen(this.props.dataSet);
    }
  };

  renderSidebar = () => {
    if (this.props.add.isOpen) {
      return <AddDataSet />;
    }

    if (this.props.edit.isOpen) {
      return <EditDataSet />;
    }

    return <RemoveDataSet />;
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        isBlocking={false}
        onDismiss={this.onDismiss}
        styles={{ main: { overflow: "hidden", minHeight: 400 } }}
      >
        <Stack horizontal>
          <Stack tokens={{ padding: "50px 20px" }}>
            <Stack horizontal verticalAlign="end">
              <Stack.Item align="start" grow={5}>
                <h2>Datasets</h2>
              </Stack.Item>
              <Stack.Item align="end">
                <DefaultButton
                  size={5}
                  iconProps={{ iconName: "Add" }}
                  onClick={this.onAddNetwork}
                >
                  Add
                </DefaultButton>
              </Stack.Item>
            </Stack>
            <Separator></Separator>
            {this.props.successMessage ? (
              <MessageBar messageBarType={MessageBarType.success}>
                {this.props.successMessage}
              </MessageBar>
            ) : null}
            {this.props.errorMessage ? (
              <MessageBar messageBarType={MessageBarType.error}>
                {this.props.errorMessage}
              </MessageBar>
            ) : null}
            <Stack>
              <Stack styles={{ root: { minWidth: 640 } }}>
                <StackItem align="stretch">
                  {this.props.isLoading ? (
                    <ProgressIndicator />
                  ) : (
                    <DataSetsList />
                  )}
                </StackItem>
              </Stack>
              <Separator />
              <Stack horizontal horizontalAlign="end">
                <Stack.Item>
                  <PrimaryButton
                    disabled={this.props.dataSet === null}
                    onClick={this.handleChooseDataSet}
                  >
                    Choose
                  </PrimaryButton>
                </Stack.Item>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            tokens={{ padding: 10 }}
            styles={{
              root: {
                backgroundColor: this.props.theme.palette.white,
                width: 250,
                height: "100%",
                position: "absolute",
                right: this.props.isSidebarOpen ? 0 : -250,
                boxShadow: Depths.depth8,
                transitionDuration: MotionDurations.duration2,
                transition: "all " + MotionAnimations.slideRightIn,
              },
            }}
          >
            {this.renderSidebar()}
          </Stack>
        </Stack>
      </Modal>
    );
  }
}

const mapState = (state: RootState) => {
  const { dataset } = state;
  const { add, edit, remove } = dataset;
  return {
    ...dataset,
    isSidebarOpen: add.isOpen || edit.isOpen || remove.isOpen,
    theme: state.theme.current,
  };
};

const mapDispatch = {
  closeDataSetsModal,
  fetchDataSetsList,
  saveDataSet,
  updateItemToAdd,
  openAddDataSetForm,
  closeAddDataSetForm,
  selectDataSet,
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DataSetsModal);
