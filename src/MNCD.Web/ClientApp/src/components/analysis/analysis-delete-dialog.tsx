import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import {
  Dialog,
  DialogFooter,
  DefaultButton,
  MessageBar,
  MessageBarType,
  SpinnerSize,
  Spinner,
} from "office-ui-fabric-react";
import {
  deleteAnalysisById,
  closeDeleteDialog,
  dismissDeleteDialogError,
} from "../../slices/analysis-slice";

class AnalysisDeleteDialog extends React.Component<ReduxProps> {
  render() {
    const { id, isOpen, isDeleting, error, theme } = this.props;
    const removeStyle = {
      root: {
        backgroundColor: theme.palette.red,
        color: theme.palette.white,
      },
      rootHovered: {
        backgroundColor: theme.palette.redDark,
        color: theme.palette.white,
      },
    };

    return (
      <Dialog
        dialogContentProps={{ title: "Analysis" }}
        isOpen={isOpen}
        onDismiss={this.handleCancel}
      >
        <form onSubmit={this.handleDelete}>
          {this.renderError(error)}
          Are you sure that you want to delete analysis with name "Analysis {id}
          "?
          <DialogFooter>
            <DefaultButton onClick={this.handleCancel}>Cancel</DefaultButton>
            <DefaultButton styles={removeStyle} onClick={this.handleDelete}>
              {this.renderSpinner(isDeleting)}
              Delete
            </DefaultButton>
          </DialogFooter>
        </form>
      </Dialog>
    );
  }

  private renderSpinner = (isDeleting: boolean) => {
    if (isDeleting) {
      return (
        <div style={{ padding: 5 }}>
          <Spinner size={SpinnerSize.xSmall} />
        </div>
      );
    } else {
      return null;
    }
  };

  private renderError = (error: string) => {
    if (error === "") {
      return null;
    }

    return (
      <MessageBar
        messageBarType={MessageBarType.error}
        onDismiss={this.handleErrorDismiss}
      >
        {error}
      </MessageBar>
    );
  };

  private handleCancel = () => {
    this.props.closeDeleteDialog();
  };

  private handleDelete = () => {
    const { id } = this.props;
    this.props.deleteAnalysisById(id);
  };

  private handleErrorDismiss = () => {
    this.props.dismissDeleteDialogError();
  };
}

const mapProps = (state: RootState) => ({
  theme: state.theme.current,
  ...state.analysis.deleteDialog,
});

const mapDispatch = {
  deleteAnalysisById,
  closeDeleteDialog,
  dismissDeleteDialogError,
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisDeleteDialog);
