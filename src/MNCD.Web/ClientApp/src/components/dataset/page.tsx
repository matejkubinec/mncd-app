import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import {
  Stack,
  Separator,
  DefaultButton,
  Dialog,
  StackItem,
  PrimaryButton,
  MessageBarType,
  MessageBar,
} from "office-ui-fabric-react";
import {
  fetchDataSetsList,
  openAddDataSetForm,
  closeAddDataSetForm,
  openEditDataSetForm,
  closeEditDataSetForm,
  openRemoveDataSetForm,
  closeRemoveDataSetForm,
} from "../../slices/dataset-slice";
import { DataSetRowViewModel } from "../../types";
import {
  AddDataSetForm,
  RemoveDataSetForm,
  EditDataSetForm,
  DataSetsList,
} from "./forms";

class DataSetPage extends React.Component<ReduxProps> {
  componentDidMount() {
    this.props.fetchDataSetsList();
  }

  render() {
    const { theme, isLoading, items } = this.props;
    const { s1, m } = theme.spacing;

    return (
      <Stack
        tokens={{ padding: m, childrenGap: s1 }}
        styles={{
          root: {
            margin: m,
            background: theme.semanticColors.bodyBackground,
            boxShadow: theme.effects.elevation4,
          },
        }}
      >
        {this.renderDialogs()}
        <Stack>
          <h1>Datasets</h1>
        </Stack>
        <Separator />
        <Stack>{isLoading ? "Loading..." : ""}</Stack>
        <Stack>
          {this.renderMessages()}
          <DataSetsList enableSelection={false} biggerControls />
          <Stack horizontalAlign="end" tokens={{ padding: s1 }}>
            <StackItem>
              <PrimaryButton
                iconProps={{ iconName: "Add" }}
                onClick={this.handleOpenAddDialog}
              >
                Add dataset
              </PrimaryButton>
            </StackItem>
          </Stack>
        </Stack>
      </Stack>
    );
  }

  renderMessages = () => {
    const { errorMessage, successMessage } = this.props;
    const { s1 } = this.props.theme.spacing;
    const styles = { root: { marginBottom: s1 } };

    if (errorMessage) {
      return (
        <MessageBar styles={styles} messageBarType={MessageBarType.error}>
          {errorMessage}
        </MessageBar>
      );
    }

    if (successMessage) {
      return (
        <MessageBar styles={styles} messageBarType={MessageBarType.success}>
          {successMessage}
        </MessageBar>
      );
    }

    return null;
  };

  renderDialogs = () => {
    const {
      isAddDialogOpen,
      isEditDialogOpen,
      isRemoveDialogOpen,
    } = this.props;
    const minWidth = 500;
    return (
      <React.Fragment>
        <Dialog
          dialogContentProps={{ title: "Add dataset" }}
          hidden={!isAddDialogOpen}
          minWidth={minWidth}
          onDismiss={this.handleCloseAddDialog}
        >
          <AddDataSetForm />
        </Dialog>
        <Dialog
          dialogContentProps={{ title: "Edit dataset" }}
          hidden={!isEditDialogOpen}
          minWidth={minWidth}
          onDismiss={this.handleCloseEditDialog}
        >
          <EditDataSetForm />
        </Dialog>
        <Dialog
          dialogContentProps={{ title: "Remove dataset" }}
          hidden={!isRemoveDialogOpen}
          minWidth={minWidth}
          onDismiss={this.handleCloseRemoveDialog}
        >
          <RemoveDataSetForm />
        </Dialog>
      </React.Fragment>
    );
  };

  handleOpenAddDialog = () => {
    this.props.openAddDataSetForm();
  };

  handleCloseAddDialog = () => {
    this.props.closeAddDataSetForm();
  };

  handleOpenEditDialog = (item: DataSetRowViewModel) => {
    this.props.openEditDataSetForm(item);
  };

  handleCloseEditDialog = () => {
    this.props.closeEditDataSetForm();
  };

  handleOpenRemoveDialog = (item: DataSetRowViewModel) => {
    this.props.openRemoveDataSetForm(item);
  };

  handleCloseRemoveDialog = () => {
    this.props.closeRemoveDataSetForm();
  };
}

const mapProps = (state: RootState) => ({
  theme: state.theme.current,
  items: state.dataset.items,
  successMessage: state.dataset.successMessage,
  errorMessage: state.dataset.errorMessage,
  isLoading: state.dataset.isLoading,
  isAddDialogOpen: state.dataset.add.isOpen,
  isEditDialogOpen: state.dataset.edit.isOpen,
  isRemoveDialogOpen: state.dataset.remove.isOpen,
});

const mapDispatch = {
  fetchDataSetsList,
  openAddDataSetForm,
  closeAddDataSetForm,
  openEditDataSetForm,
  closeEditDataSetForm,
  openRemoveDataSetForm,
  closeRemoveDataSetForm,
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DataSetPage);
