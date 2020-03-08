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
  TextField
} from "office-ui-fabric-react";
import { DataSetAddViewModel, FileType } from "../../types";

interface IProps {
  isSaving: boolean;
  item: DataSetAddViewModel;
  onSave: () => void;
  onCancel: () => void;
  onFileChange: (file: File) => void;
  onFormatChange: (format: string) => void;
  onNameChange: (name: string) => void;
}

interface IState {}

export default class AddDataSet extends React.Component<IProps, IState> {
  private options: IDropdownOption[] = [
    { key: FileType.MPX, text: "MPX", selected: true },
    { key: FileType.EdgeList, text: "Edge List" }
  ];

  constructor(props: IProps) {
    super(props);

    this.onNameChange = this.onNameChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFormatChange = this.onFormatChange.bind(this);
  }

  onFileChange(file: File) {
    this.props.onFileChange(file);
  }

  onFormatChange(_: any, option: IDropdownOption | undefined) {
    if (option) {
      this.props.onFormatChange(option.key as string);
    }
  }

  onNameChange(_: any, newValue: string | undefined) {
    if (newValue !== undefined) {
      this.props.onNameChange(newValue);
    }
  }

  onNameGetErrorMessage(value: string | undefined) {
    if (!value) {
      return "Name is required.";
    }
    return "";
  }

  isValid(): boolean {
    const { file, name } = this.props.item;
    if (!file || !name) {
      return false;
    }
    return true;
  }

  handleSubmit = (e: React.FormEvent) => {
    if (this.isValid()) {
      this.props.onSave();
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
          <Stack.Item>
            <TextField
              label="Name"
              value={this.props.item.name}
              onChange={this.onNameChange}
              validateOnLoad={false}
              validateOnFocusIn={false}
              validateOnFocusOut={true}
              onGetErrorMessage={this.onNameGetErrorMessage}
            />
          </Stack.Item>
          <Stack.Item>
            <Dropdown
              label="Format"
              selectedKey={this.props.item.format}
              options={this.options}
              onChange={this.onFormatChange}
            />
          </Stack.Item>
          <Stack.Item>
            <FileInput
              text="Choose file"
              accept="mpx,txt"
              onFileChange={file => this.onFileChange(file)}
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
                  onClick={() => this.props.onCancel()}
                >
                  Cancel
                </DefaultButton>
              </Stack.Item>
              <Stack.Item styles={{ root: { width: "50%" } }}>
                <PrimaryButton
                  disabled={!this.isValid()}
                  styles={{ root: { width: "100%" } }}
                  onClick={() => this.props.onSave()}
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
