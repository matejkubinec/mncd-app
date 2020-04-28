import React from "react";
import {
  fetchSessionsList,
  openAddEditDialog,
  openRemoveDialog,
  dismissSesionsListSuccessMessage,
  dismissSesionsListErrorMessage
} from "../../slices/session-slice";
import { push } from "connected-react-router";
import { RootState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import {
  Stack,
  Separator,
  ProgressIndicator,
  StackItem,
  PrimaryButton,
  DefaultButton,
  IColumn,
  SelectionMode,
  DetailsList,
  Text,
  MessageBar,
  MessageBarType
} from "office-ui-fabric-react";
import { SessionRowViewModel } from "../../types";
import { SessionRemoveDialog, SessionAddEditDialog } from ".";

class SessionList extends React.Component<ReduxProps> {
  private columns: IColumn[] = [
    {
      key: "name",
      data: "string",
      fieldName: "name",
      name: "Name",
      isRowHeader: true,
      minWidth: 100
    },
    {
      key: "createDate",
      data: "date",
      fieldName: "createDate",
      name: "Create Date",
      minWidth: 120,
      onRender(item: SessionRowViewModel) {
        return new Date(item.createDate).toLocaleString();
      }
    },
    {
      key: "analysesCount",
      data: "number",
      fieldName: "analysesCount",
      name: "Analyses",
      styles: { root: { textAlign: "right" } },
      minWidth: 70
    },
    {
      key: "editSession",
      name: "",
      minWidth: 270,
      isRowHeader: false,
      onRender: (item: SessionRowViewModel) => {
        const onRemove = () => this.props.openRemoveDialog(item);
        const onEdit = () => this.props.openAddEditDialog(item);
        const onOpen = () => {
          this.props.dismissSesionsListSuccessMessage();
          this.props.dismissSesionsListErrorMessage();
          this.props.push(`/session/${item.id}`);
        };
        return (
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            <DefaultButton
              iconProps={{ iconName: "Cancel" }}
              onClick={onRemove}
              text="Remove"
            />
            <DefaultButton
              iconProps={{ iconName: "Edit" }}
              onClick={onEdit}
              text="Edit"
            />
            <DefaultButton
              iconProps={{ iconName: "Go" }}
              onClick={onOpen}
              text="Open"
            />
          </Stack>
        );
      }
    }
  ];

  componentDidMount() {
    this.props.fetchSessionsList();
  }

  onAddSession = () => {
    this.props.openAddEditDialog();
  };

  renderTable = () => {
    if (this.props.isLoading) {
      return <ProgressIndicator />;
    }

    if (this.props.items.length <= 0) {
      return <Text>No sessions to display.</Text>;
    }

    return (
      <DetailsList
        items={this.props.items}
        columns={this.columns}
        selectionMode={SelectionMode.none}
        isHeaderVisible={true}
      />
    );
  };

  handleSuccessDismiss = () => {
    this.props.dismissSesionsListSuccessMessage();
  };

  handleErrorDismiss = () => {
    this.props.dismissSesionsListErrorMessage();
  };

  render() {
    return (
      <Stack tokens={{ padding: 25 }}>
        <Stack
          style={{
            borderRadius: 4,
            boxShadow: this.props.theme.effects.elevation16,
            background: this.props.theme.palette.white
          }}
          tokens={{ padding: 25 }}
        >
          <SessionAddEditDialog />
          <SessionRemoveDialog />
          <h1>Sessions</h1>
          <Separator></Separator>
          {this.props.error ? (
            <MessageBar
              styles={{ root: { marginBottom: 10 } }}
              messageBarType={MessageBarType.error}
              onDismiss={this.handleErrorDismiss}
            >
              {this.props.error}
            </MessageBar>
          ) : null}
          {this.props.success ? (
            <MessageBar
              styles={{ root: { marginBottom: 10 } }}
              messageBarType={MessageBarType.success}
              onDismiss={this.handleSuccessDismiss}
            >
              {this.props.success}
            </MessageBar>
          ) : null}
          <Stack>
            {this.renderTable()}
            <Stack horizontalAlign="end" tokens={{ padding: "25px 0 0 0" }}>
              <StackItem>
                <PrimaryButton
                  iconProps={{ iconName: "Add" }}
                  color="primary"
                  onClick={this.onAddSession}
                >
                  Add session
                </PrimaryButton>
              </StackItem>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}

const mapState = (state: RootState) => ({
  ...state.session.list,
  theme: state.theme.current
});

const mapDispatch = {
  fetchSessionsList,
  openAddEditDialog,
  openRemoveDialog,
  dismissSesionsListSuccessMessage,
  dismissSesionsListErrorMessage,
  push
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SessionList);
