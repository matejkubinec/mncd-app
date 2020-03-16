import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import {
  Dialog,
  DialogFooter,
  DefaultButton,
  Stack,
  MessageBar,
  MessageBarType,
  Text,
  Spinner,
  SpinnerSize
} from "office-ui-fabric-react";
import {
  closeDeleteModal,
  deleteAnalysis
} from "../../../slices/analysis-slice";
import { DeleteButton } from "../../common";

class DeleteAnalysisDialog extends React.Component<ReduxProps> {
  handleDismiss = () => {
    this.props.closeDeleteModal();
  };

  handleDelete = () => {
    this.props.deleteAnalysis(this.props.analysisId);
  };

  render() {
    return (
      <Dialog
        isOpen={this.props.isOpen}
        dialogContentProps={{ title: "Analysis " + this.props.analysisId }}
        onDismiss={this.handleDismiss}
      >
        <Stack>
          <Stack.Item>
            {this.props.error ? (
              <MessageBar messageBarType={MessageBarType.error}>
                {this.props.error}
              </MessageBar>
            ) : null}
          </Stack.Item>
          <Stack.Item>
            Are you sure that you want to delete this analysis?
          </Stack.Item>
        </Stack>
        <DialogFooter>
          <DefaultButton onClick={this.handleDismiss}>Cancel</DefaultButton>
          <DeleteButton buttonProps={{ onClick: this.handleDelete }}>
            <Stack>
              {this.props.isDeleting || true ? (
                <Spinner size={SpinnerSize.xSmall} />
              ) : null}
              Delete
            </Stack>
          </DeleteButton>
        </DialogFooter>
      </Dialog>
    );
  }
}

const mapProps = (state: RootState) => ({
  ...state.analysis.deleteModal
});

const mapDispatch = { closeDeleteModal, deleteAnalysis };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DeleteAnalysisDialog);
