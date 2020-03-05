import React, { Component } from "react";
import {
  saveSession,
  editSession,
  updateAddEditDialogName,
  closeAddEditDialog,
  SessionAddEditDialog
} from "../../slices/SessionSlice";
import { connect } from "react-redux";
import {
  Stack,
  TextField,
  DefaultButton,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  Dialog,
  DialogFooter
} from "office-ui-fabric-react";
import { RootState } from "../../store";

interface IProps extends SessionAddEditDialog {
  saveSession: Function;
  editSession: Function;
  closeAddEditDialog: Function;
  updateAddEditDialogName: Function;
}

interface IState {}

class SessionListAddEditDialog extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onNameGetErrorMessage = this.onNameGetErrorMessage.bind(this);
  }

  onNameChange(_: any, value: string | undefined) {
    this.props.updateAddEditDialogName(value || "");
  }

  onCancel() {
    this.props.closeAddEditDialog();
  }

  onSave(e: React.FormEvent<any>) {
    if (this.props.isEditing) {
      this.props.editSession();
    } else {
      this.props.saveSession();
    }
    e.preventDefault();
  }

  onNameGetErrorMessage(value: string) {
    if (value === "") {
      return "Name must not be empty.";
    }

    return "";
  }

  render() {
    const { isOpen, isSaving, name } = this.props;

    return (
      <Dialog
        isOpen={isOpen}
        dialogContentProps={{ title: "Analysis Session" }}
        onDismiss={this.onCancel}
      >
        <form onSubmit={this.onSave}>
          <TextField
            value={name}
            label="Name"
            onGetErrorMessage={this.onNameGetErrorMessage}
            validateOnLoad={false}
            required
            onChange={this.onNameChange}
          ></TextField>
          <DialogFooter>
            <DefaultButton onClick={this.onCancel}>Cancel</DefaultButton>
            <PrimaryButton onClick={this.onSave}>
              {isSaving ? (
                <Stack padding={5}>
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
  updateAddEditDialogName
};

export default connect(mapState, mapDisptach)(SessionListAddEditDialog);
