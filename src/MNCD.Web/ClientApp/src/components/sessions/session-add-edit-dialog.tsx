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
  render() {
    const { isOpen, isSaving, error, name } = this.props;

    return (
      <Dialog
        hidden={!isOpen}
        dialogContentProps={{ title: "Analysis Session" }}
        onDismiss={this.handleCancel}
      >
        {error ? (
          <MessageBar
            styles={{ root: { marginBottom: 10 } }}
            messageBarType={MessageBarType.error}
            onDismiss={this.handleErrorMessageDismiss}
          >
            {error}
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

  private handleNameChange = (_: any, value: string | undefined) => {
    this.props.updateAddEditDialogName(value || "");
  };

  private handleCancel = () => {
    this.props.closeAddEditDialog();
  };

  private handleSave = (e: React.FormEvent<any>) => {
    if (this.props.isEditing) {
      this.props.editSession(this.props.id, this.props.name);
    } else {
      this.props.saveSession(this.props.name);
    }
    e.preventDefault();
  };

  private handleNameGetErrorMessage = (value: string) => {
    if (value === "") {
      return "Name must not be empty.";
    }

    return "";
  };

  private handleErrorMessageDismiss = () => {
    this.props.clearAddEditEdialogError();
  };
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
