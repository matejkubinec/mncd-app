import React from "react";
import {
  closeDataSetsModal,
  fetchDataSetsList,
  saveDataSet,
  updateItemToAdd,
  openAddDataSetForm,
  closeAddDataSetForm
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
  MessageBarType
} from "office-ui-fabric-react";
import DataSetsList from "./list-dataset";
import { AddDataSet } from ".";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import {
  MotionAnimations,
  MotionDurations
} from "@uifabric/fluent-theme/lib/fluent/FluentMotion";
import { DataSetRowViewModel } from "../../types";

interface IProps extends ReduxProps {
  onDataSetChosen: (dataSet: DataSetRowViewModel) => void;
}

interface IState {
  file: File | null;
}

class DataSetsModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      file: null
    };

    this.onAddNetwork = this.onAddNetwork.bind(this);
    this.onAddNetworkFormCancel = this.onAddNetworkFormCancel.bind(this);
    this.onAddNetworkFormSave = this.onAddNetworkFormSave.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onChooseDataSet = this.onChooseDataSet.bind(this);
  }

  componentDidMount() {
    this.props.fetchDataSetsList();
  }

  onDismiss() {
    this.props.closeDataSetsModal();
  }

  onAddNetwork() {
    this.props.openAddDataSetForm();
  }

  onItemToAddChange(value: object) {
    const item = { ...this.props.itemToAdd, ...value };
    this.props.updateItemToAdd(item);
  }

  onAddNetworkFormCancel() {
    this.props.closeAddDataSetForm();
  }

  onAddNetworkFormSave() {
    if (this.state.file) {
      this.props.saveDataSet(this.state.file);
    }
  }

  onChooseDataSet(dataSet: DataSetRowViewModel) {
    this.props.closeDataSetsModal();
    this.props.onDataSetChosen(dataSet);
  }

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
            <h2>Datasets</h2>
            <Separator></Separator>
            {this.props.successMessage ?
              <MessageBar messageBarType={MessageBarType.success}>
                {this.props.successMessage}
              </MessageBar>
              : null
            }
            {this.props.errorMessage ?
              <MessageBar messageBarType={MessageBarType.error}>
                {this.props.errorMessage}
              </MessageBar>
              : null
            }
            <Stack>
              <Stack styles={{ root: { minWidth: 640 } }}>
                <StackItem align="stretch">
                  {this.props.isLoading ? (
                    <ProgressIndicator />
                  ) : (
                      <DataSetsList
                        items={this.props.items}
                        onChooseDataSet={this.onChooseDataSet}
                      />
                    )}
                </StackItem>
              </Stack>
              <Separator />
              <Stack horizontalAlign="end">
                <StackItem>
                  <PrimaryButton onClick={this.onAddNetwork}>
                    Add network
                  </PrimaryButton>
                </StackItem>
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
                right: this.props.isAdding ? 0 : -250,
                boxShadow: Depths.depth8,
                transitionDuration: MotionDurations.duration2,
                transition: "all " + MotionAnimations.slideRightIn
              }
            }}
          >
            <AddDataSet />
          </Stack>
        </Stack>
      </Modal>
    );
  }
}

const mapState = (state: RootState) => ({
  ...state.dataset,
  theme: state.theme.current
});

const mapDispatch = {
  closeDataSetsModal,
  fetchDataSetsList,
  saveDataSet,
  updateItemToAdd,
  openAddDataSetForm,
  closeAddDataSetForm
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DataSetsModal);
