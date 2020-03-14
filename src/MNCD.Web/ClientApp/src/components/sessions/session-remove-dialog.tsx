import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import {
  Dialog,
  DialogFooter,
  DefaultButton,
  Text,
  Stack,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import {
  removeSession,
  closeRemoveDialog,
  clearRemoveDialogError
} from "../../slices/session-slice";

class SessionListRemoveDialog extends React.Component<ReduxProps> {
  onSubmit = (ev: React.FormEvent | React.MouseEvent<any>) => {
    this.props.removeSession();
    ev.preventDefault();
  };

  onDismiss = () => {
    this.props.closeRemoveDialog();
  };

  handleErrorMessageDismiss = () => {
    this.props.clearRemoveDialogError();
  };

  render() {
    return (
      <Dialog
        isOpen={this.props.isOpen}
        dialogContentProps={{ title: "Analysis Session" }}
        onDismiss={this.onDismiss}
      >
        <form onSubmit={this.onSubmit}>
          {this.props.error ? (
            <MessageBar
              styles={{ root: { marginBottom: 10 } }}
              messageBarType={MessageBarType.error}
              onDismiss={this.handleErrorMessageDismiss}
            >
              {this.props.error}
            </MessageBar>
          ) : null}
          <Text>
            Dou you really want to delete "<b>{this.props.session.name}</b>"
            session, along with all
            {this.props.session.analysesCount > 0 ? (
              <b> {this.props.session.analysesCount} </b>
            ) : (
              " "
            )}
            analyses?
          </Text>
          <DialogFooter>
            <DefaultButton onClick={this.onDismiss}>Cancel</DefaultButton>
            <DefaultButton
              styles={{
                root: {
                  backgroundColor: this.props.theme.palette.red,
                  color: this.props.theme.palette.white
                },
                rootHovered: {
                  backgroundColor: this.props.theme.palette.redDark,
                  color: this.props.theme.palette.white
                }
              }}
              onClick={this.onSubmit}
            >
              {this.props.isRemoving ? (
                <Stack padding={5}>
                  <Spinner size={SpinnerSize.xSmall} />
                </Stack>
              ) : null}
              Remove
            </DefaultButton>
          </DialogFooter>
        </form>
      </Dialog>
    );
  }
}

const mapProps = (state: RootState) => ({
  ...state.session.removeDialog,
  theme: state.theme.current
});

const mapDispatch = {
  removeSession,
  closeRemoveDialog,
  clearRemoveDialogError
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SessionListRemoveDialog);