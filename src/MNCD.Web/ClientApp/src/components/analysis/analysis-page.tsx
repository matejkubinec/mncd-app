import React, { Fragment } from "react";
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
  AnalysisPageHeader,
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
    return (
      <Stack>
        <AnalysisPageHeader />
        {this.renderBody()}
      </Stack>
    );
  }

  private renderBody = () => {
    const { isLoading, error } = this.props;

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
      <Fragment>
        <AnalysisDeleteDialog />
        <AnalysisControls />
        <AnalysisResult />
      </Fragment>
    );
  };
}

const mapProps = (state: RootState) => ({
  success: state.analysis.success,
  error: state.analysis.error,
  isLoading: state.analysis.isSessionLoading,
});

const mapDispatch = { fetchSessionById };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisPage);
