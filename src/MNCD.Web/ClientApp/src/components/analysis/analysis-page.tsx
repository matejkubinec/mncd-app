import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { Stack, ProgressIndicator } from "office-ui-fabric-react";
import { fetchAnalysisSession } from "../../slices/analysis-slice";
import { AnalysisPageHeader, AnalysisControls, AnalysisResult } from "./index";
import { RouteComponentProps } from "react-router";
import { DeleteAnalysisDialog } from "./result";

interface MatchParams {
  guid: string;
}

interface IProps extends RouteComponentProps<MatchParams>, ReduxProps {}

class AnalysisPage extends React.Component<IProps> {
  componentDidMount() {
    const guid = this.props.match.params.guid;
    this.props.fetchAnalysisSession(guid);
  }

  render() {
    return (
      <React.Fragment>
        <DeleteAnalysisDialog />
        <Stack>
          <Stack.Item>
            <AnalysisPageHeader />
          </Stack.Item>
          {this.props.isLoading ? (
            <ProgressIndicator />
          ) : (
            <React.Fragment>
              <AnalysisControls />
              <Stack.Item>
                <AnalysisResult />
              </Stack.Item>
            </React.Fragment>
          )}
        </Stack>
      </React.Fragment>
    );
  }
}

const mapProps = (state: RootState) => ({
  isLoading: state.analysis.isSessionLoading
});

const mapDispatch = { fetchAnalysisSession };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisPage);
