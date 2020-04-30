import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import {
  Stack,
  ProgressIndicator,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import { fetchSessionById } from "../../slices/analysis-slice";
import {
  AnalysisControls,
  AnalysisResult,
  AnalysisDeleteDialog,
} from "./index";
import { RouteComponentProps } from "react-router";

interface MatchParams {
  id: string;
}

interface IProps extends RouteComponentProps<MatchParams>, ReduxProps {}

class AnalysisPage extends React.Component<IProps> {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchSessionById(id);
  }

  render() {
    const { isLoading, error, theme, session } = this.props;
    const { s1, m } = theme.spacing;

    if (isLoading) {
      return <ProgressIndicator />;
    }

    if (error) {
      return (
        <div style={{ padding: 20 }}>
          <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
        </div>
      );
    }

    return (
      <Stack
        style={{
          margin: m,
          borderRadius: theme.effects.roundedCorner2,
          boxShadow: theme.effects.elevation16,
          background: theme.palette.neutralLighterAlt,
        }}
      >
        <AnalysisDeleteDialog />
        <Stack>
          <Stack
            horizontal
            verticalFill
            verticalAlign="center"
            tokens={{ padding: s1, childrenGap: m }}
            style={{
              borderTopLeftRadius: theme.effects.roundedCorner2,
              borderTopRightRadius: theme.effects.roundedCorner2,
              borderBottom: "1px solid",
              borderColor: theme.palette.neutralLight,
              backgroundColor: theme.palette.white,
            }}
          >
            <Stack.Item styles={{ root: { paddingLeft: s1 } }}>
              <h1>{session ? session.name : ""}</h1>
            </Stack.Item>
            <Stack.Item>
              ({new Date(session ? session.createDate : "").toLocaleString()})
            </Stack.Item>
          </Stack>
          <AnalysisControls />
        </Stack>
        <AnalysisResult />
      </Stack>
    );
  }
}

const mapProps = (state: RootState) => ({
  theme: state.theme.current,
  success: state.analysis.success,
  error: state.analysis.error,
  isLoading: state.analysis.isSessionLoading,
  session: state.analysis.session,
});

const mapDispatch = { fetchSessionById };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisPage);
