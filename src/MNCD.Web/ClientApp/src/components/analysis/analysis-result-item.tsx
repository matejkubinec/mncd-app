import React, { Component } from "react";
import { AnalysisViewModel } from "../../types";
import {
  Stack,
  ITheme,
  IconButton,
  Separator,
  TooltipHost,
} from "office-ui-fabric-react";
import {
  Evaluation,
  Request,
  Visualization,
  CommunitiesDetails,
} from "./result";
import { Link } from "react-router-dom";

interface IProps {
  analysis: AnalysisViewModel;
  theme: ITheme;
  showControls: boolean;
  onMinimize: (id: number) => void;
  onDelete: (id: number) => void;
}

class AnalysisResultItem extends Component<IProps> {
  public static defaultProps = {
    showControls: true,
    onDelete: null,
    onMinimize: null,
  };

  render() {
    const { showControls, analysis, theme } = this.props;
    const { s1 } = theme.spacing;
    const { result, request, visualization } = analysis;

    const itemStyles = {
      root: {
        border: "1px solid " + this.props.theme.palette.whiteTranslucent40,
        borderRadius: this.props.theme.effects.roundedCorner2,
        boxShadow: this.props.theme.effects.elevation4,
        backgroundColor: this.props.theme.palette.white,
      },
    };

    return (
      <Stack
        tokens={{ padding: s1, childrenGap: s1 }}
        style={{ minWidth: 500 }}
      >
        <Stack.Item styles={itemStyles}>
          <Stack tokens={{ padding: s1 }}>
            <Stack horizontal>
              <Stack.Item grow={10}>
                <h1>Analysis {analysis.id}</h1>
              </Stack.Item>
              {showControls ? (
                <Stack.Item grow={2} align="end">
                  <Stack horizontal horizontalAlign="end">
                    <TooltipHost content="Minimize">
                      <IconButton
                        iconProps={{
                          iconName: "Remove",
                        }}
                        onClick={this.handleMinimize}
                      />
                    </TooltipHost>
                    <TooltipHost content="Delete">
                      <IconButton
                        iconProps={{
                          iconName: "Delete",
                        }}
                        onClick={this.handleDelete}
                      />
                    </TooltipHost>
                  </Stack>
                </Stack.Item>
              ) : null}
            </Stack>
            <Separator />
            {this.renderLink()}
          </Stack>
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Request theme={theme} request={request} />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Evaluation theme={theme} result={result} />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <CommunitiesDetails theme={theme} result={result} />
        </Stack.Item>
        <Stack.Item styles={itemStyles}>
          <Visualization theme={theme} visualizations={visualization} />
        </Stack.Item>
      </Stack>
    );
  }

  private renderLink = () => {
    const to = `/analysis/${this.props.analysis.id}`;
    return (
      <div>
        Click <Link to={to}>here</Link> to view a more detailed version.
      </div>
    );
  };

  private handleMinimize = () => {
    this.props.onMinimize(this.props.analysis.id);
  };

  private handleDelete = () => {
    this.props.onDelete(this.props.analysis.id);
  };
}

export default AnalysisResultItem;
