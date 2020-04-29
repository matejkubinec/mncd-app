import React, { Component } from "react";
import {
  Stack,
  IDropdownOption,
  List,
  ITheme,
  Dropdown,
  Separator,
} from "office-ui-fabric-react";
import { AnalysisResultViewModel, ActorItem } from "../../../types";
import AnalysisResultCard from "./result-card";

interface IProps {
  theme: ITheme;
  result: AnalysisResultViewModel;
}

interface IState {
  idx: number;
}

export default class CommunitiesDetails extends Component<IProps, IState> {
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
      <AnalysisResultCard
        title={"Communities Details"}
        theme={this.props.theme}
      >
        {this.renderBody(columns, actors)}
      </AnalysisResultCard>
    );
  }

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
