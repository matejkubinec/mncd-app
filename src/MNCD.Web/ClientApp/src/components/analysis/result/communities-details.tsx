import React, { Component } from "react";
import {
  Stack,
  Dropdown,
  IDropdownOption,
  List,
  Separator
} from "office-ui-fabric-react";
import { AnalysisResultViewModel, ActorItem } from "../../../types";

interface IProps {
  result: AnalysisResultViewModel;
}

interface IState {
  selectedCommunity: number;
}

export default class CommunitiesDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedCommunity: 0
    };
  }

  handleCommunityChange = (_: any, option?: IDropdownOption) => {
    if (option) {
      this.setState({ selectedCommunity: Number(option.key) });
    }
  };

  getOptions = (): IDropdownOption[] => {
    return this.props.result.communityDetails.map(
      (cd, i) =>
        ({
          key: i,
          text: `${cd.name} (Size: ${cd.actorCount})`
        } as IDropdownOption)
    );
  };

  renderCell = (item?: ActorItem) => {
    if (item !== undefined) {
      return (
        <Stack horizontal tokens={{ childrenGap: 5 }} horizontalAlign="stretch">
          <Stack.Item grow={1} styles={{ root: { width: "50%" } }}>
            <label style={{ fontWeight: 600 }}>{item.idx}</label>
          </Stack.Item>
          <Stack.Item grow={1} styles={{ root: { width: "50%" } }}>
            {item.name}
          </Stack.Item>
        </Stack>
      );
    }
  };

  getItems() {}

  render() {
    const cd = this.props.result.communityDetails;
    const i = this.state.selectedCommunity;
    return (
      <Stack tokens={{ padding: 10, childrenGap: 5 }}>
        <Stack.Item>
          <h2>Communities Details</h2>
        </Stack.Item>
        <Stack.Item>
          <Dropdown
            label="Community"
            options={this.getOptions()}
            selectedKey={i}
            onChange={this.handleCommunityChange}
          />
        </Stack.Item>
        {cd ? (
          <React.Fragment>
            <Stack.Item></Stack.Item>
            <Stack.Item>
              <Separator />
            </Stack.Item>
            <Stack.Item>
              <List items={cd[i].actors} onRenderCell={this.renderCell} />
            </Stack.Item>
          </React.Fragment>
        ) : null}
      </Stack>
    );
  }
}
