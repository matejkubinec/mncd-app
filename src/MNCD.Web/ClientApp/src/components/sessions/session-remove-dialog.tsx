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
  MessageBarType,
} from "office-ui-fabric-react";
import {
  removeSession,
  closeRemoveDialog,
  clearRemoveDialogError,
} from "../../slices/session-slice";

class SessionListRemoveDialog extends React.Component<ReduxProps> {
  render() {
    const { error, isOpen, session, theme } = this.props;
    const { s1, m } = theme.spacing;
    return (
      <Dialog
        hidden={!isOpen}
        dialogContentProps={{ title: "Analysis Session" }}
        onDismiss={this.handleDismiss}
      >
        <form onSubmit={this.handleSubmit}>
          {error ? (
            <MessageBar
              styles={{ root: { marginBottom: m } }}
              messageBarType={MessageBarType.error}
              onDismiss={this.handleErrorMessageDismiss}
            >
              {error}
            </MessageBar>
          ) : null}
          <Text>
            Dou you really want to delete "<b>{session.name}</b>" session, along
            with all
            {session.analysesCount > 0 ? <b> {session.analysesCount} </b> : " "}
            analyses?
          </Text>
          <DialogFooter>
            <DefaultButton onClick={this.handleDismiss}>Cancel</DefaultButton>
            <DefaultButton
              styles={{
                root: {
                  backgroundColor: theme.palette.red,
                  color: theme.palette.white,
                },
                rootHovered: {
                  backgroundColor: theme.palette.redDark,
                  color: theme.palette.white,
                },
              }}
              onClick={this.handleSubmit}
            >
              {this.props.isRemoving ? (
                <Stack tokens={{ padding: s1 }}>
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

  private handleSubmit = (ev: React.FormEvent | React.MouseEvent<any>) => {
    this.props.removeSession(this.props.session.id);
    ev.preventDefault();
  };

  private handleDismiss = () => {
    this.props.closeRemoveDialog();
  };

  private handleErrorMessageDismiss = () => {
    this.props.clearRemoveDialogError();
  };
}

const mapProps = (state: RootState) => ({
  ...state.session.removeDialog,
  theme: state.theme.current,
});

const mapDispatch = {
  removeSession,
  closeRemoveDialog,
  clearRemoveDialogError,
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SessionListRemoveDialog);
