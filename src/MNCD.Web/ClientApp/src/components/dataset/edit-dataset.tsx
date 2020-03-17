import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import {
  Stack,
  TextField,
  DefaultButton,
  PrimaryButton,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import {
  editDataSet,
  editDataSetItemName,
  closeEditDataSetForm
} from "../../slices/dataset-slice";
import { DataSetRowViewModel } from "../../types";

class EditDataSet extends React.Component<ReduxProps> {
  get isValid(): boolean {
    return this.props.id >= 0 && !!this.props.name;
  }

  handleGetNameErrorMessage = (value: string) => {
    if (value === "") {
      return "Name must not be empty.";
    }

    return "";
  };

  handleNameChange = (ev: any, value?: string) => {
    if (value !== undefined) {
      this.props.editDataSetItemName(value);
    }
  };

  handleCancel = () => {
    this.props.closeEditDataSetForm();
  };

  handleSave = (ev: React.FormEvent | React.MouseEvent<any> | undefined) => {
    if (this.isValid) {
      this.props.editDataSet({
        id: this.props.id,
        name: this.props.name
      } as DataSetRowViewModel);
    }

    if (ev) {
      ev.preventDefault();
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSave}>
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack.Item>
            <h2>Edit</h2>
          </Stack.Item>
          {this.props.error ? (
            <MessageBar messageBarType={MessageBarType.error}>
              {this.props.error}
            </MessageBar>
          ) : null}
          <Stack.Item>
            <TextField
              label="Name"
              validateOnLoad={false}
              validateOnFocusIn={false}
              validateOnFocusOut={true}
              value={this.props.name}
              onChange={this.handleNameChange}
              onGetErrorMessage={this.handleGetNameErrorMessage}
            />
          </Stack.Item>
          <Stack.Item>
            <Stack
              horizontal
              tokens={{ childrenGap: 5 }}
              horizontalAlign="space-between"
            >
              <Stack.Item styles={{ root: { width: "50%" } }}>
                <DefaultButton
                  styles={{ root: { width: "100%" } }}
                  onClick={this.handleCancel}
                >
                  Cancel
                </DefaultButton>
              </Stack.Item>
              <Stack.Item styles={{ root: { width: "50%" } }}>
                <PrimaryButton
                  disabled={!this.isValid}
                  styles={{ root: { width: "100%" } }}
                  onClick={this.handleSave}
                >
                  Save
                </PrimaryButton>
              </Stack.Item>
            </Stack>
          </Stack.Item>
        </Stack>
      </form>
    );
  }
}

const mapProps = (state: RootState) => {
  const { item, error } = state.dataset.edit;
  return {
    id: item ? item.id : 0,
    name: item ? item.name : "",
    error
  };
};

const mapDispatch = { editDataSet, editDataSetItemName, closeEditDataSetForm };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(EditDataSet);
