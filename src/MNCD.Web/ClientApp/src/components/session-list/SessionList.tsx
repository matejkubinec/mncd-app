import React from "react";
import SessionListAddEditDialog from "./SessionListAddEditDialog";
import {
  fetchSessionsList,
  openAddEditDialog,
  SessionListState
} from "../../slices/SessionSlice";
import { push } from "connected-react-router";
import { RootState } from "../../store";
import { connect } from "react-redux";
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
  Icon
} from "office-ui-fabric-react";
import { SessionRowViewModel } from "../../types";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";

interface IProps extends SessionListState {
  fetchSessionsList: Function;
  openAddEditDialog: Function;
  push: typeof push;
}

class SessionList extends React.Component<IProps> {
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
      minWidth: 80,
      isRowHeader: false,
      onRender: (item: SessionRowViewModel) => {
        const onClick = () => this.props.openAddEditDialog(item);
        return (
          <DefaultButton iconProps={{ iconName: "Edit" }} onClick={onClick}>
            Edit
          </DefaultButton>
        );
      }
    },
    {
      key: "openSession",
      name: "",
      minWidth: 80,
      isRowHeader: false,
      onRender: (item: SessionRowViewModel) => {
        const onClick = () => this.props.push(`/session/${item.guid}`);
        return (
          <DefaultButton iconProps={{ iconName: "Go" }} onClick={onClick}>
            Open
          </DefaultButton>
        );
      }
    }
  ];

  constructor(props: IProps) {
    super(props);

    this.onAddSession = this.onAddSession.bind(this);
  }

  componentDidMount() {
    this.props.fetchSessionsList();
  }

  onAddSession() {
    this.props.openAddEditDialog();
  }

  renderTable() {
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
  }

  render() {
    return (
      <Stack tokens={{ padding: 50 }}>
        <Stack
          style={{ boxShadow: Depths.depth16, background: NeutralColors.white }}
          tokens={{ padding: 25 }}
        >
          <SessionListAddEditDialog />
          <h2>Sessions</h2>
          <Separator></Separator>
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

const mapState = (state: RootState) => state.session.list;

const mapDispatch = { fetchSessionsList, openAddEditDialog, push };

export default connect(mapState, mapDispatch)(SessionList);
