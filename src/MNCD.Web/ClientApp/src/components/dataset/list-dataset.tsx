import React from "react";
import { DataSetRowViewModel } from "../../types";
import {
  IColumn,
  DetailsList,
  SelectionMode,
  Stack,
  IconButton
} from "office-ui-fabric-react";
import {
  openEditDataSetForm,
  openRemoveDataSetForm,
  selectDataSet
} from "../../slices/dataset-slice";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../store";

class DataSetsList extends React.Component<ReduxProps> {
  private columns: IColumn[] = [
    {
      key: "name",
      data: "string",
      fieldName: "name",
      name: "Name",
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
      onRender: (item: DataSetRowViewModel) => {
        return (
          <Stack horizontal>
            <IconButton
              iconProps={{ iconName: "Edit" }}
              onClick={e => this.handleEditDataSet(e, item)}
            />
            <IconButton
              iconProps={{ iconName: "Remove" }}
              onClick={e => this.handleRemoveDataSet(e, item)}
            />
          </Stack>
        );
      }
    }
  ];

  handleEditDataSet = (
    ev: React.MouseEvent<any>,
    item: DataSetRowViewModel
  ) => {
    this.props.openEditDataSetForm(item);
    ev.preventDefault();
    ev.stopPropagation();
  };

  handleRemoveDataSet = (
    ev: React.MouseEvent<any>,
    item: DataSetRowViewModel
  ) => {
    this.props.openRemoveDataSetForm(item);
    ev.preventDefault();
    ev.stopPropagation();
  };

  handleChooseDataSet = (item: DataSetRowViewModel) => {
    this.props.selectDataSet(item);
  };

  render() {
    if (this.props.items.length === 0) {
      return "No datasets to display.";
    }

    return (
      <DetailsList
        items={this.props.items}
        columns={this.columns}
        selectionMode={SelectionMode.single}
        onActiveItemChanged={this.handleChooseDataSet}
        isHeaderVisible={true}
      />
    );
  }
}

const mapProps = (state: RootState) => {
  const { items } = state.dataset;
  return {
    items
  };
};

const mapDispatch = {
  openEditDataSetForm,
  openRemoveDataSetForm,
  selectDataSet
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DataSetsList);
