import React, { Component } from "react";
import {
  saveSession,
  editSession,
  updateAddEditDialogName,
  closeAddEditDialog,
  clearAddEditEdialogError,
} from "../../slices/session-slice";
import { connect, ConnectedProps } from "react-redux";
import {
  Stack,
  TextField,
  DefaultButton,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Dialog,
  DialogFooter,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import { RootState } from "../../store";

class SessionListAddEditDialog extends Component<ReduxProps> {
  handleNameChange = (_: any, value: string | undefined) => {
    this.props.updateAddEditDialogName(value || "");
  };

  handleCancel = () => {
    this.props.closeAddEditDialog();
  };

  handleSave = (e: React.FormEvent<any>) => {
    if (this.props.isEditing) {
      this.props.editSession(this.props.id, this.props.name);
    } else {
      this.props.saveSession(this.props.name);
    }
    e.preventDefault();
  };

  handleNameGetErrorMessage = (value: string) => {
    if (value === "") {
      return "Name must not be empty.";
    }

    return "";
  };

  handleErrorMessageDismiss = () => {
    this.props.clearAddEditEdialogError();
  };

  render() {
    const { isOpen, isSaving, name } = this.props;

    return (
      <Dialog
        isOpen={isOpen}
        dialogContentProps={{ title: "Analysis Session" }}
        onDismiss={this.handleCancel}
      >
        {this.props.error ? (
          <MessageBar
            styles={{ root: { marginBottom: 10 } }}
            messageBarType={MessageBarType.error}
            onDismiss={this.handleErrorMessageDismiss}
          >
            {this.props.error}
          </MessageBar>
        ) : null}
        <form onSubmit={this.handleSave}>
          <TextField
            value={name}
            label="Name"
            onGetErrorMessage={this.handleNameGetErrorMessage}
            validateOnLoad={false}
            required
            onChange={this.handleNameChange}
          ></TextField>
          <DialogFooter>
            <DefaultButton onClick={this.handleCancel}>Cancel</DefaultButton>
            <PrimaryButton onClick={this.handleSave}>
              {isSaving ? (
                <Stack tokens={{ padding: 5 }}>
                  <Spinner size={SpinnerSize.xSmall} />
                </Stack>
              ) : null}
              Save
            </PrimaryButton>
          </DialogFooter>
        </form>
      </Dialog>
    );
  }
}

const mapState = (state: RootState) => state.session.addEditDialog;

const mapDisptach = {
  saveSession,
  editSession,
  closeAddEditDialog,
  updateAddEditDialogName,
  clearAddEditEdialogError,
};

const connector = connect(mapState, mapDisptach);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SessionListAddEditDialog);
