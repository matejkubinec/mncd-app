import {
  saveDataSet,
  updateDataSetsDetailItem,
  DataSetsDetailState
} from "../slices/DataSetSlice";
import { connect } from "react-redux";
import React, { Ref, FormEvent, Fragment } from "react";
import {
  TextField,
  Stack,
  PrimaryButton,
  DefaultButton,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import { RootState } from "../store";
import { DataSetAddViewModel } from "../types";

interface IProps extends DataSetsDetailState {
  updateDataSetsDetailItem: ({}) => void;
  saveDataSet: (file: File) => void;
}

interface IState {
  file: File | null;
}

class DataSetAdd extends React.Component<IProps, IState> {
  private fileInput: Ref<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);

    this.state = {
      file: null
    };

    this.fileInput = React.createRef();
    this.onFileChangeButtonClick = this.onFileChangeButtonClick.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  onFileChangeButtonClick() {
    const fileInput = (this.fileInput as any).current as HTMLInputElement;
    fileInput.click();
  }

  onNameChange(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const name = (e.target as HTMLInputElement).value;
    this.props.updateDataSetsDetailItem({ name });
  }

  onFileChange() {
    const fileInput = (this.fileInput as any).current as HTMLInputElement;
    const files = fileInput.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (!this.props.item.name) {
        const item = {
          file: file.name,
          name: file.name
        };
        this.props.updateDataSetsDetailItem(item);
      } else {
        const item = {
          file: file.name
        };
        this.props.updateDataSetsDetailItem(item);
      }

      this.setState({ file });
    }
  }

  onSave() {
    if (!this.props.item || !this.state.file) {
      return;
    }

    this.props.saveDataSet(this.state.file);
  }

  renderMessageBar(successMessage: string, errorMessage: string) {
    if (successMessage) {
      return (
        <MessageBar messageBarType={MessageBarType.success}>
          {successMessage}
        </MessageBar>
      );
    }

    if (errorMessage) {
      return (
        <MessageBar messageBarType={MessageBarType.error}>
          {errorMessage}
        </MessageBar>
      );
    }

    return null;
  }

  render() {
    const { isSaving, successMessage, errorMessage } = this.props;
    const { name } = this.props.item;

    return (
      <div>
        <form onSubmit={() => {}}>
          <Stack gap="10">
            <h2>Network</h2>
            <p>Supported formats: MPX</p>
            {this.renderMessageBar(successMessage, errorMessage)}
            <TextField
              label="Name"
              required
              value={name}
              onChange={e => this.onNameChange(e)}
            ></TextField>
            <DefaultButton
              label="Network File"
              iconProps={{ iconName: "Upload" }}
              onClick={() => this.onFileChangeButtonClick()}
            >
              Choose file
              <input
                ref={this.fileInput}
                onChange={() => this.onFileChange()}
                type="file"
                accept=".mpx"
                style={{ display: "none" }}
              />
            </DefaultButton>
            <PrimaryButton onClick={() => this.onSave()}>
              {isSaving ? (
                <Stack padding={5}>
                  <Spinner size={SpinnerSize.xSmall} />
                </Stack>
              ) : (
                <Fragment></Fragment>
              )}
              Save
            </PrimaryButton>
          </Stack>
        </form>
      </div>
    );
  }
}

const mapState = (state: RootState) => state.dataset.detail;

const mapDisptach = { saveDataSet, updateDataSetsDetailItem };

export default connect(mapState, mapDisptach)(DataSetAdd);
