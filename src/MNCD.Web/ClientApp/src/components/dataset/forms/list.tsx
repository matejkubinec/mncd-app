import React from "react";
import { DataSetRowViewModel } from "../../../types";
import {
  IColumn,
  DetailsList,
  SelectionMode,
  Stack,
  IconButton,
  DefaultButton,
} from "office-ui-fabric-react";
import {
  openEditDataSetForm,
  openRemoveDataSetForm,
  selectDataSet,
} from "../../../slices/dataset-slice";
import { ConnectedProps, connect } from "react-redux";
import { RootState } from "../../../store";
import { history } from "../../../store";

interface IProps {
  enableSelection: boolean;
  biggerControls: boolean;
}

class DataSetsList extends React.Component<ReduxProps & IProps> {
  public static defaultProps = {
    biggerControls: false,
  };

  private columns: IColumn[] = [
    {
      key: "name",
      data: "string",
      fieldName: "name",
      name: "Name",
      minWidth: 100,
    },
    {
      key: "nodeCount",
      data: "number",
      fieldName: "nodeCount",
      name: "Number of Nodes",
      minWidth: 150,
    },
    {
      key: "edgeCount",
      data: "number",
      fieldName: "edgeCount",
      name: "Number of Edges",
      minWidth: 150,
    },
    {
      key: "layerCount",
      data: "number",
      fieldName: "layerCount",
      name: "Number of Layers",
      minWidth: 150,
    },
    {
      key: "chooseNetwork",
      name: "",
      minWidth: this.props.biggerControls ? 270 : 90,
      onRender: (item: DataSetRowViewModel) => {
        const { s1 } = this.props.theme.spacing;
        const onOpen = () => history.push(`/dataset/${item.id}?showBackLink`);
        const onEdit = (e: any) => this.handleEditDataSet(e, item);
        const onRemove = (e: any) => this.handleRemoveDataSet(e, item);

        if (this.props.biggerControls) {
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
        }

        return (
          <Stack horizontal>
            <IconButton iconProps={{ iconName: "Cancel" }} onClick={onRemove} />
            <IconButton iconProps={{ iconName: "Edit" }} onClick={onEdit} />
            <IconButton iconProps={{ iconName: "Search" }} onClick={onOpen} />
          </Stack>
        );
      },
    },
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

    if (this.props.enableSelection) {
      return (
        <DetailsList
          items={this.props.items}
          columns={this.columns}
          selectionMode={SelectionMode.single}
          onActiveItemChanged={this.handleChooseDataSet}
          selectionPreservedOnEmptyClick={true}
          isHeaderVisible={true}
        />
      );
    }

    return (
      <DetailsList
        items={this.props.items}
        selectionMode={SelectionMode.none}
        columns={this.columns}
        isHeaderVisible={true}
      />
    );
  }
}

const mapProps = (state: RootState) => ({
  theme: state.theme.current,
  items: state.dataset.items,
});

const mapDispatch = {
  openEditDataSetForm,
  openRemoveDataSetForm,
  selectDataSet,
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(DataSetsList);
