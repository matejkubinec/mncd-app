import React, { Component } from "react";
import { ITheme, Stack, IconButton } from "office-ui-fabric-react";

interface IProps {
  title: string;
  theme: ITheme;
}

interface IState {
  minimized: boolean;
}

export default class AnalysisResultCard extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      minimized: false,
    };
  }

  render() {
    const { children, theme, title } = this.props;
    const { minimized } = this.state;
    const { s1 } = theme.spacing;

    return (
      <Stack tokens={{ padding: s1, childrenGap: s1 }}>
        <Stack horizontal>
          <Stack.Item grow={1}>
            <h2>{title}</h2>
          </Stack.Item>
          <Stack.Item>
            <IconButton
              iconProps={{
                iconName: minimized ? "ChevronDown" : "ChevronUp",
              }}
              onClick={this.handleMinimizeToggle}
            />
          </Stack.Item>
        </Stack>
        {minimized ? null : children}
      </Stack>
    );
  }

  private handleMinimizeToggle = () => {
    this.setState({ minimized: !this.state.minimized });
  };
}
