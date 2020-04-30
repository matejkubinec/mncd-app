import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import {
  Stack,
  DefaultButton,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import {
  removeDataSet,
  closeRemoveDataSetForm,
} from "../../../slices/dataset-slice";

class RemoveDataSetForm extends React.Component<ReduxProps> {
  handleCancel = () => {
    this.props.closeRemoveDataSetForm();
  };

  handleSave = (ev: React.FormEvent | React.MouseEvent<any>) => {
    if (this.props.item) {
      this.props.removeDataSet(this.props.item.id);
    }

    if (ev) {
      ev.preventDefault();
    }
  };

  render() {
    if (!this.props.item) {
      return null;
    }

    return (
      <form onSubmit={this.handleCancel}>
        <Stack tokens={{ childrenGap: 10 }}>
          {this.props.error ? (
            <MessageBar messageBarType={MessageBarType.error}>
              {this.props.error}
            </MessageBar>
          ) : null}
          <Stack.Item>
            Are you sure you want to remove "<b>{this.props.item.name}</b>"
            dataset?
          </Stack.Item>
          <Stack
            horizontal
            horizontalAlign="space-between"
            tokens={{ childrenGap: 5 }}
          >
            <DefaultButton
              styles={{ root: { width: "100%" } }}
              onClick={this.handleCancel}
            >
              Cancel
            </DefaultButton>
            <DefaultButton
              styles={{ root: { width: "100%" } }}
              onClick={this.handleSave}
            >
              Remove
            </DefaultButton>
          </Stack>
        </Stack>
      </form>
    );
  }
}

const mapProps = (state: RootState) => {
  const { item, isRemoving, error } = state.dataset.remove;
  return {
    item,
    isRemoving,
    error,
  };
};

const mapDispatch = { removeDataSet, closeRemoveDataSetForm };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(RemoveDataSetForm);
