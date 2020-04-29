import React, { Component } from "react";
import {
  Stack,
  IDropdownOption,
  List,
  ITheme,
  IconButton,
  Dropdown,
  Separator,
} from "office-ui-fabric-react";
import { AnalysisResultViewModel, ActorItem } from "../../../types";

interface IProps {
  theme: ITheme;
  result: AnalysisResultViewModel;
}

interface IState {
  idx: number;
  minimized: boolean;
}

export default class CommunitiesDetails extends Component<IProps, IState> {
  public static defaultProps = {
    useMinMaxHeight: false,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      idx: 0,
      minimized: false,
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
    const { s1 } = this.props.theme.spacing;
    const { minimized } = this.state;
    const { communityDetails } = this.props.result;
    const actors = communityDetails
      ? communityDetails[this.state.idx].actors
      : [];
    const columns = Math.ceil(actors.length / 15);

    return (
      <Stack tokens={{ padding: s1, childrenGap: s1 }}>
        {this.renderHeader(minimized)}
        {minimized ? null : this.renderBody(columns, actors)}
      </Stack>
    );
  }

  private renderHeader = (minimized: boolean) => (
    <Stack horizontal>
      <Stack.Item grow={1}>
        <h2>Communities Details</h2>
      </Stack.Item>
      <Stack.Item>
        <IconButton
          iconProps={{
            iconName: minimized ? "ChevronDown" : "ChevronUp",
          }}
          onClick={() => this.setState({ minimized: !minimized })}
        />
      </Stack.Item>
    </Stack>
  );

  private renderBody = (columns: number, actors: ActorItem[]) => (
    <Stack>
      <Dropdown
        label="Community"
        options={this.getOptions()}
        selectedKey={this.state.idx}
        onChange={this.handleCommunityChange}
      />
      <Separator />
      <ul style={{ columns, listStyleType: "none", padding: 0, margin: 0 }}>
        <List items={actors} onRenderCell={this.renderListItem} />
      </ul>
    </Stack>
  );

  private renderListItem = (item?: ActorItem) => {
    if (!item) {
      return null;
    }
    const { s1 } = this.props.theme.spacing;
    const { idx, name } = item;

    return (
      <li key={idx}>
        <span>{idx > 9 ? idx : "0" + idx}</span>
        <span style={{ paddingLeft: s1 }}>{name}</span>
      </li>
    );
  };
}
