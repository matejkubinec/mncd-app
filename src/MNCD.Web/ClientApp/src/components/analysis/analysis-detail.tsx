import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState, history } from "../../store";
import { RouteComponentProps } from "react-router";
import {
  Stack,
  Separator,
  PrimaryButton,
  TextField,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  IconButton,
} from "office-ui-fabric-react";
import {
  fetchAnalysisDetailById,
  downloadAnalysisById,
  editAnalysisById,
  dismissEditError,
  editNotes,
} from "../../slices/analysis-detail-slice";
import { AnalysisViewModel } from "../../types";
import {
  Request,
  Evaluation,
  CommunitiesDetails,
  Visualization,
} from "./result";

interface MatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<MatchParams>, ReduxProps {}

class AnalysisDetail extends React.Component<IProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchAnalysisDetailById(id);
  }

  render() {
    const { theme, isLoading } = this.props;
    const { s1, m } = theme.spacing;
    const { id } = this.props.match.params;

    return (
      <Stack tokens={{ padding: m }}>
        <Stack
          tokens={{ padding: "10px 25px 25px 25px" }}
          style={{
            borderRadius: theme.effects.roundedCorner2,
            boxShadow: theme.effects.elevation16,
            background: theme.palette.white,
          }}
        >
          <Stack.Item>
            <Stack horizontal verticalFill verticalAlign="center">
              <IconButton
                iconProps={{ iconName: "Back" }}
                style={{ color: theme.palette.black, margin: s1 }}
                label="Back"
                onClick={() => history.goBack()}
              />
              <h1>Analysis {id}</h1>
            </Stack>
          </Stack.Item>
          <Separator />
          {isLoading ? this.renderLoading() : this.renderBody()}
        </Stack>
      </Stack>
    );
  }

  private renderLoading = () => {
    return "Loading...";
  };

  private renderError = () => {
    const { error, theme } = this.props;
    return (
      <Stack
        style={{
          padding: 10,
          borderRadius: theme.effects.roundedCorner2,
          backgroundColor: theme.semanticColors.errorBackground,
        }}
      >
        {error}
      </Stack>
    );
  };

  private renderBody = () => {
    if (this.props.error) {
      return this.renderError();
    }

    if (!this.props.analysis) {
      return null;
    }

    const { analysis, theme } = this.props;
    const { visualization, request, result } = analysis;

    const cardStyle = {
      border: "1px solid",
      borderColor: theme.palette.blackTranslucent40,
      borderRadius: theme.effects.roundedCorner2,
    };

    const bodyStyle = {};

    return (
      <Stack
        horizontal
        tokens={{ childrenGap: theme.spacing.l1 }}
        style={bodyStyle}
      >
        <Stack grow={2} tokens={{ childrenGap: theme.spacing.l1 }}>
          <Stack style={cardStyle}>
            <Visualization theme={theme} visualizations={visualization} />
          </Stack>
          <Stack style={cardStyle}>
            <Request theme={theme} request={request} />
          </Stack>
          <Stack style={cardStyle}>
            <Evaluation theme={theme} result={result} />
          </Stack>
          <Stack style={cardStyle}>
            <CommunitiesDetails theme={theme} result={result} />
          </Stack>
          <Stack.Item align="stretch" verticalFill>
            <Stack verticalAlign="end" verticalFill>
              <Separator />
              <PrimaryButton onClick={this.handleDownload}>
                Download
              </PrimaryButton>
            </Stack>
          </Stack.Item>
        </Stack>
        <Stack grow={3} style={{ paddingTop: 10 }}>
          <h2>Notes</h2>
          {this.renderEditing(analysis)}
        </Stack>
      </Stack>
    );
  };

  private renderEditing = (analysis: AnalysisViewModel) => {
    const {
      theme,
      edit,
      dismissEditError,
      editAnalysisById,
      editNotes,
    } = this.props;
    const { id } = analysis;
    const { error, isSaving, notes } = edit;

    return (
      <Stack tokens={{ padding: "4px 0", childrenGap: theme.spacing.s1 }}>
        {error ? (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={dismissEditError}
          >
            {error}
          </MessageBar>
        ) : null}
        <TextField
          multiline
          rows={20}
          autoAdjustHeight
          resizable={false}
          value={notes}
          onChange={(_, v) => (v !== undefined ? editNotes(v) : null)}
        />
        <Stack horizontal horizontalAlign="end">
          <PrimaryButton onClick={() => editAnalysisById({ id, notes })}>
            {isSaving ? (
              <Stack tokens={{ padding: theme.spacing.s1 }}>
                <Spinner size={SpinnerSize.xSmall} />
              </Stack>
            ) : null}
            Save
          </PrimaryButton>
        </Stack>
      </Stack>
    );
  };

  private handleDownload = () => {
    const { analysis } = this.props;
    if (analysis) {
      const { id } = analysis;
      this.props.downloadAnalysisById(id);
    }
  };
}

const mapProps = (rootState: RootState) => ({
  theme: rootState.theme.current,
  ...rootState.analysisDetail,
});

const mapDispatch = {
  fetchAnalysisDetailById,
  downloadAnalysisById,
  editAnalysisById,
  dismissEditError,
  editNotes,
};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisDetail);
