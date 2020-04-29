import React, { Component } from "react";
import {
  Stack,
  Dropdown,
  IDropdownOption,
  List,
  Separator,
  IStyle,
} from "office-ui-fabric-react";
import { AnalysisResultViewModel, ActorItem } from "../../../types";

interface IProps {
  result: AnalysisResultViewModel;
  useMinMaxHeight: boolean;
}

interface IState {
  idx: number;
}

export default class CommunitiesDetails extends Component<IProps, IState> {
  public static defaultProps = {
    useMinMaxHeight: false,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      idx: 0,
    };
  }

  handleCommunityChange = (_: any, option?: IDropdownOption) => {
    if (option) {
      const selectedCommunity = Number(option.key);
      this.setState({ idx: selectedCommunity });
    }
  };

  getOptions = (): IDropdownOption[] => {
    const { communityDetails } = this.props.result;

    return communityDetails.map((cd, i) => ({
      key: i,
      text: `${cd.name} (Size: ${cd.actorCount})`,
    }));
  };

  render() {
    const { communityDetails } = this.props.result;
    const actors = communityDetails
      ? communityDetails[this.state.idx].actors
      : [];
    const columns = Math.ceil(actors.length / 15);

    return (
      <Stack
        tokens={{ padding: 10, childrenGap: 5 }}
        styles={this.getStackStyle()}
      >
        <Stack.Item>
          <h2>Communities Details</h2>
        </Stack.Item>
        <Stack.Item>
          <Dropdown
            label="Community"
            options={this.getOptions()}
            selectedKey={this.state.idx}
            onChange={this.handleCommunityChange}
          />
        </Stack.Item>
        <Separator />
        <ul style={{ columns }}>
          <List items={actors} onRenderCell={this.renderListItem} />
        </ul>
      </Stack>
    );
  }

  private renderListItem = (item?: ActorItem) => {
    if (!item) {
      return null;
    }
    const { idx, name } = item;

    return (
      <li key={idx}>
        {idx > 9 ? idx : "0" + idx} {name}
      </li>
    );
  };

  private getStackStyle = () => {
    const { useMinMaxHeight } = this.props;
    const styles: IStyle = {};

    if (useMinMaxHeight) {
      styles.minHeight = 425;
      styles.maxHeight = 425;
    }

    return { root: styles };
  };
}
