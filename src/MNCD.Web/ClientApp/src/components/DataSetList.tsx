import React from "react";
import { fetchDataSetsList } from "../slices/DataSetSlice";
import { RootState } from "../store";
import { connect } from "react-redux";
import { DataSetRowViewModel } from "../types";
import {
  DefaultButton,
  IColumn,
  Stack,
  Separator,
  DetailsList,
  SelectionMode,
  ProgressIndicator,
  PrimaryButton,
  StackItem
} from "office-ui-fabric-react";
import DataSetAdd from "./DataSetAdd";

interface IProps {
  isLoading: boolean;
  items: DataSetRowViewModel[];
  fetchDataSetsList: Function;
}

class DataSetList extends React.Component<IProps> {
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
      key: "nodeCount",
      data: "number",
      fieldName: "nodeCount",
      name: "Number of Nodes",
      minWidth: 150
    },
    {
      key: "edgeCount",
      data: "number",
      fieldName: "edgeCount",
      name: "Number of Edges",
      minWidth: 150
    },
    {
      key: "layerCount",
      data: "number",
      fieldName: "layerCount",
      name: "Number of Layers",
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

  componentDidMount() {
    this.props.fetchDataSetsList();
  }

  render() {
    const { items, isLoading } = this.props;

    return (
      <Stack>
        <h2>Datasets</h2>
        <Separator></Separator>
        <Stack>
          <Stack>
            <StackItem align="stretch">
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
            </StackItem>
          </Stack>
          <Separator />
          <Stack horizontalAlign="end">
            <StackItem>
              <PrimaryButton color="primary">Add network</PrimaryButton>
            </StackItem>
          </Stack>
        </Stack>
      </Stack>
    );
  }
}

const mapState = (state: RootState) => state.dataset.list;

const mapDispatch = { fetchDataSetsList };

export default connect(mapState, mapDispatch)(DataSetList);
