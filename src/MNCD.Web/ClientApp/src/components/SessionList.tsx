import React from "react";
import {
  fetchSessionsList,
  openAddModal,
  SessionListState
} from "../slices/SessionSlice";
import { RootState } from "../store";
import { connect } from "react-redux";
import {
  Stack,
  Separator,
  ProgressIndicator,
  List,
  StackItem,
  PrimaryButton,
  DefaultButton,
  IColumn,
  SelectionMode,
  DetailsList
} from "office-ui-fabric-react";
import SessionListAddModal from "./SessionListAddModal";
import { SessionRowViewModel } from "../types";

interface IProps extends SessionListState {
  fetchSessionsList: Function;
  openAddModal: Function;
}

class SessionList extends React.Component<IProps> {
  private columns: IColumn[] = [
    {
      key: "name",
      data: "string",
      fieldName: "name",
      name: "Name",
      isRowHeader: true,
      isSorted: true,
      isSortedDescending: false,
      minWidth: 100
    },
    {
      key: "createDate",
      data: "date",
      fieldName: "createDate",
      name: "Create Date",
      minWidth: 150,
      onRender(item: SessionRowViewModel) {
        return new Date(item.createDate).toLocaleString();
      }
    },
    {
      key: "analysesCount",
      data: "number",
      fieldName: "analysesCount",
      name: "Analyses",
      minWidth: 150
    },
    {
      key: "chooseNetwork",
      name: "",
      minWidth: 90,
      onRender: (item: any) => {
        return <DefaultButton>Choose</DefaultButton>;
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
    this.props.openAddModal();
  }

  render() {
    const { items, isLoading } = this.props;

    return (
      <Stack>
        <SessionListAddModal />
        <h2>Sessions</h2>
        <Separator></Separator>
        <Stack>
          {isLoading ? (
            <ProgressIndicator />
          ) : (
            <DetailsList
              items={items}
              columns={this.columns}
              selectionMode={SelectionMode.none}
              isHeaderVisible={true}
            />
          )}
          <Separator />
          <Stack horizontalAlign="end">
            <StackItem>
              <PrimaryButton color="primary" onClick={this.onAddSession}>
                Add session
              </PrimaryButton>
            </StackItem>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}

const mapState = (state: RootState) => state.session.list;

const mapDispatch = { fetchSessionsList, openAddModal };

export default connect(mapState, mapDispatch)(SessionList);
