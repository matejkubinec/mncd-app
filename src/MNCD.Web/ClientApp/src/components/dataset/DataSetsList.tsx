import React from "react";
import { DataSetRowViewModel } from "../../types";
import {
  DefaultButton,
  IColumn,
  DetailsList,
  SelectionMode
} from "office-ui-fabric-react";

interface IProps {
  items: DataSetRowViewModel[];
  onChooseDataSet: (item: DataSetRowViewModel) => void;
}

interface IState {}

class DataSetsList extends React.Component<IProps, IState> {
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
        const onChooseDataSet = () => this.props.onChooseDataSet(item);
        return <DefaultButton onClick={onChooseDataSet}>Choose</DefaultButton>;
      }
    }
  ];

  render() {
    if (this.props.items.length === 0) {
      return "No datasets to display.";
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
}

export default DataSetsList;