import React from "react";
import {
  fetchSessionsList,
  openAddEditDialog,
  openRemoveDialog,
  dismissSesionsListSuccessMessage,
  dismissSesionsListErrorMessage,
} from "../../slices/session-slice";
import { RootState, history } from "../../store";
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
  MessageBarType,
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
      minWidth: 100,
    },
    {
      key: "createDate",
      data: "date",
      fieldName: "createDate",
      name: "Create Date",
      minWidth: 120,
      onRender(item: SessionRowViewModel) {
        return new Date(item.createDate).toLocaleString();
      },
    },
    {
      key: "analysesCount",
      data: "number",
      fieldName: "analysesCount",
      name: "Analyses",
      styles: { root: { textAlign: "right" } },
      minWidth: 70,
    },
    {
      key: "editSession",
      name: "",
      minWidth: 270,
      isRowHeader: false,
      onRender: (item: SessionRowViewModel) => {
        const { s1 } = this.props.theme.spacing;
        const onRemove = () => this.props.openRemoveDialog(item);
        const onEdit = () => this.props.openAddEditDialog(item);
        const onOpen = () => {
          this.props.dismissSesionsListSuccessMessage();
          this.props.dismissSesionsListErrorMessage();
          history.push(`/session/${item.id}`);
        };
        return (
          <Stack horizontal tokens={{ childrenGap: s1 }}>
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
      },
    },
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
      return (
        <div style={{ padding: this.props.theme.spacing.m }}>
          <Text>No sessions to display.</Text>
        </div>
      );
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
    const { error, success, theme } = this.props;
    const { s1, m } = theme.spacing;

    return (
      <Stack tokens={{ padding: m }}>
        <Stack
          style={{
            borderRadius: theme.effects.roundedCorner2,
            boxShadow: theme.effects.elevation16,
            background: theme.palette.white,
          }}
          tokens={{ padding: m }}
        >
          <SessionAddEditDialog />
          <SessionRemoveDialog />
          <h1>Sessions</h1>
          <Separator></Separator>
          {error ? (
            <MessageBar
              styles={{ root: { marginBottom: s1 } }}
              messageBarType={MessageBarType.error}
              onDismiss={this.handleErrorDismiss}
            >
              {error}
            </MessageBar>
          ) : null}
          {this.props.success ? (
            <MessageBar
              styles={{ root: { marginBottom: s1 } }}
              messageBarType={MessageBarType.success}
              onDismiss={this.handleSuccessDismiss}
            >
              {success}
            </MessageBar>
          ) : null}
          <Stack>
            {this.renderTable()}
            <Stack horizontalAlign="end" tokens={{ padding: s1 }}>
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
  theme: state.theme.current,
});

const mapDispatch = {
  fetchSessionsList,
  openAddEditDialog,
  openRemoveDialog,
  dismissSesionsListSuccessMessage,
  dismissSesionsListErrorMessage,
};

const connector = connect(mapState, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SessionList);
