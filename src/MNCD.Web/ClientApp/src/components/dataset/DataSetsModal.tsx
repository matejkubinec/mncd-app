import React from "react";
import {
  closeDataSetsModal,
  fetchDataSetsList,
  saveDataSet,
  updateItemToAdd,
  openAddDataSetForm,
  closeAddDataSetForm,
  DataSetsState
} from "../../slices/DataSetSlice";
import { RootState } from "../../store";
import { connect } from "react-redux";
import {
  Stack,
  Separator,
  ProgressIndicator,
  PrimaryButton,
  StackItem,
  Modal
} from "office-ui-fabric-react";
import DataSetsList from "./DataSetsList";
import { AddDataSet } from ".";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import {
  MotionAnimations,
  MotionDurations
} from "@uifabric/fluent-theme/lib/fluent/FluentMotion";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { DataSetAddViewModel, DataSetRowViewModel } from "../../types";

interface IProps extends DataSetsState {
  onDataSetChosen: (dataSet: DataSetRowViewModel) => void;
  closeDataSetsModal: () => void;
  openAddDataSetForm: () => void;
  updateItemToAdd: (item: DataSetAddViewModel) => void;
  closeAddDataSetForm: () => void;
  fetchDataSetsList: () => void;
  saveDataSet: (file: File) => void;
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

    this.onFileChange = this.onFileChange.bind(this);
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

  onFileChange(file: File) {
    if (file) {
      this.setState({ file });
      this.onItemToAddChange({ file: file.name });
    }
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
        styles={{ main: { overflow: "hidden", minHeight: 350 } }}
      >
        <Stack horizontal>
          <Stack tokens={{ padding: "50px 20px" }}>
            <h2>Datasets</h2>
            <Separator></Separator>
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
                backgroundColor: NeutralColors.white,
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
            <AddDataSet
              item={this.props.itemToAdd}
              isSaving={this.props.isSaving}
              onCancel={this.onAddNetworkFormCancel}
              onSave={this.onAddNetworkFormSave}
              onFileChange={file => this.onFileChange(file)}
              onNameChange={name => this.onItemToAddChange({ name })}
              onFormatChange={format => this.onItemToAddChange({ format })}
            />
          </Stack>
        </Stack>
      </Modal>
    );
  }
}

const mapState = (state: RootState) => state.dataset;

const mapDispatch = {
  closeDataSetsModal,
  fetchDataSetsList,
  saveDataSet,
  updateItemToAdd,
  openAddDataSetForm,
  closeAddDataSetForm
};

export default connect(mapState, mapDispatch)(DataSetsModal);
