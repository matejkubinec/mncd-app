import React from "react";
import { FileInput } from "../common";
import {
  Stack,
  Dropdown,
  IDropdownOption,
  DefaultButton,
  PrimaryButton,
  Spinner,
  SpinnerSize,
  TextField,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import { FileType } from "../../types";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store";
import { updateItemToAdd, closeAddDataSetForm, saveDataSet } from "../../slices/dataset-slice";

class AddDataSet extends React.Component<ReduxProps, File> {
  private options: IDropdownOption[] = [
    { key: FileType.MPX.toString(), text: "MPX", selected: true },
    { key: FileType.EdgeList.toString(), text: "Edge List" }
  ];

  handleFileChange = (file: File) => {
    if (file) {
      this.setState(file);
      this.props.updateItemToAdd({ file: file.name });

      if (!this.props.item.name) {
        this.props.updateItemToAdd({ name: file.name })
      }
    }
  }
    
  handleFormatChange = (_: any, option: IDropdownOption | undefined) => {
    if (option) {
      this.props.updateItemToAdd({ format: String(option.key) });
    }
  }

  handleNameChange = (_: any, newValue: string | undefined) => {
    if (newValue !== undefined) {
      this.props.updateItemToAdd({ name: String(newValue) });
    }
  }

  handleNameGetErrorMessage = (value: string | undefined) => {
    if (!value) {
      return "Name is required.";
    }
    return "";
  }

  isValid = (): boolean => {
    const { file, name } = this.props.item;
    if (!file || !name) {
      return false;
    }
    return true;
  }

  handleCancel = () => {
    this.props.closeAddDataSetForm();
  }

  handleSubmit = (e: React.FormEvent | React.MouseEvent<any>) => {
    if (this.isValid()) {
      this.props.saveDataSet(this.state);
    }
    e.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Stack tokens={{ childrenGap: 10 }}>
          <Stack.Item>
            <h2>Add Dataset</h2>
          </Stack.Item>
          <Stack.Item>Supported formats</Stack.Item>
          {this.props.error ?
            <MessageBar messageBarType={MessageBarType.error}>
              {this.props.error}
            </MessageBar>
            :
            null
          }
          <Stack.Item>
            <TextField
              label="Name"
              value={this.props.item.name}
              onChange={this.handleNameChange}
              validateOnLoad={false}
              validateOnFocusIn={false}
              validateOnFocusOut={true}
              onGetErrorMessage={this.handleNameGetErrorMessage}
            />
          </Stack.Item>
          <Stack.Item>
            <Dropdown
              label="Format"
              selectedKey={this.props.item.format.toString()}
              options={this.options}
              onChange={this.handleFormatChange}
            />
          </Stack.Item>
          <Stack.Item>
            <FileInput
              text="Choose file"
              accept="mpx,txt"
              onFileChange={this.handleFileChange}
              buttonProps={{
                label: "Network File",
                style: { width: "100%" },
                iconProps: { iconName: "Upload" }
              }}
            />
          </Stack.Item>
          <Stack.Item>{this.props.item.file}</Stack.Item>
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
                  disabled={!this.isValid()}
                  styles={{ root: { width: "100%" } }}
                  onClick={this.handleSubmit}
                >
                  {this.props.isSaving ? (
                    <Spinner
                      style={{ marginRight: 10 }}
                      size={SpinnerSize.small}
                    />
                  ) : null}
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

const mapProps = (state: RootState) => ({
  isSaving: state.dataset.isSaving,
  item: state.dataset.itemToAdd,
  error: state.dataset.addErrorMessage
});

const mapDispatch = { updateItemToAdd, closeAddDataSetForm, saveDataSet };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AddDataSet);
