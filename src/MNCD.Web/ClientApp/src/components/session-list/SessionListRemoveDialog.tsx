import React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import {
  Dialog,
  DialogFooter,
  DefaultButton,
  getTheme,
  Text,
  Stack,
  Spinner,
  SpinnerSize
} from "office-ui-fabric-react";
import {
  removeSession,
  closeRemoveDialog,
  SessionRemoveDialogState
} from "../../slices/SessionSlice";
const theme = getTheme();

interface IProps extends SessionRemoveDialogState {
  closeRemoveDialog: typeof closeRemoveDialog;
  removeSession: Function;
}

interface IState {}

class SessionListRemoveDialog extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSubmit(ev: React.FormEvent | React.MouseEvent<any>) {
    this.props.removeSession();
    ev.preventDefault();
  }

  onDismiss() {
    this.props.closeRemoveDialog();
  }

  render() {
    return (
      <Dialog
        isOpen={this.props.isOpen}
        dialogContentProps={{ title: "Analysis Session" }}
        onDismiss={this.onDismiss}
      >
        <form onSubmit={this.onSubmit}>
          <Text>
            Dou you really want to delete "<b>{this.props.session.name}</b>"
            session?
          </Text>
          <DialogFooter>
            <DefaultButton onClick={this.onDismiss}>Cancel</DefaultButton>
            <DefaultButton
              styles={{
                root: {
                  backgroundColor: theme.palette.red,
                  color: theme.palette.white
                },
                rootHovered: {
                  backgroundColor: theme.palette.redDark,
                  color: theme.palette.white
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

const mapProps = (rootState: RootState) => rootState.session.removeDialog;

const mapDispatch = { removeSession, closeRemoveDialog };

export default connect(mapProps, mapDispatch)(SessionListRemoveDialog);
