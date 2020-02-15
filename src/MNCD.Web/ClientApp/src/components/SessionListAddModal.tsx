import {
  saveSession,
  updateAddModalName,
  closeAddModal,
  SessionAddModal
} from "../slices/SessionSlice";
import { connect } from "react-redux";
import React from "react";
import {
  Modal,
  Stack,
  StackItem,
  TextField,
  DefaultButton,
  PrimaryButton,
  Spinner,
  SpinnerSize
} from "office-ui-fabric-react";
import { RootState } from "../store";

interface IProps extends SessionAddModal {
  saveSession: Function;
  closeAddModal: Function;
  updateAddModalName: Function;
}

interface IState {}

class SessionListAddModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.onNameChange = this.onNameChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onNameChange(_: any, value: string | undefined) {
    if (!value) return;

    this.props.updateAddModalName(value);
  }

  onCancel() {
    this.props.closeAddModal();
  }

  onSave() {
    this.props.saveSession();
  }

  render() {
    const { isOpen, isSaving, name } = this.props;

    return (
      <Modal isOpen={isOpen}>
        <Stack padding={10} gap={5}>
          <StackItem align="center">
            <h1>Add Analysis Session</h1>
          </StackItem>
          <StackItem>
            <TextField
              value={name}
              label="Name"
              required
              onChange={this.onNameChange}
            ></TextField>
          </StackItem>
          <StackItem>
            <Stack
              horizontal
              gap={10}
              horizontalAlign="end"
              tokens={{ padding: "5px 0 0 0" }}
            >
              <DefaultButton onClick={this.onCancel}>Cancel</DefaultButton>
              <PrimaryButton onClick={this.onSave}>
                {isSaving ? (
                  <Stack padding={5}>
                    <Spinner size={SpinnerSize.xSmall} />
                  </Stack>
                ) : null}
                Save
              </PrimaryButton>
            </Stack>
          </StackItem>
        </Stack>
      </Modal>
    );
  }
}

const mapState = (state: RootState) => state.session.addModal;

const mapDisptach = { saveSession, closeAddModal, updateAddModalName };

export default connect(mapState, mapDisptach)(SessionListAddModal);
