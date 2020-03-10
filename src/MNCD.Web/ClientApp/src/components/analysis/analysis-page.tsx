import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { Stack } from "office-ui-fabric-react";
import { fetchAnalysisSession } from "../../slices/AnalysisSlice";
import { AnalysisPageHeader, AnalysisControls, AnalysisResult } from "./index";
import { RouteComponentProps } from "react-router";

interface MatchParams {
  guid: string;
}

interface IProps extends RouteComponentProps<MatchParams>, ReduxProps { }

class AnalysisPage extends React.Component<IProps> {
  componentDidMount() {
    const guid = this.props.match.params.guid;
    this.props.fetchAnalysisSession(guid);
  }

  render() {
    return (
      <Stack>
        <Stack.Item>
          <AnalysisPageHeader />
        </Stack.Item>
        <AnalysisControls />
        <Stack.Item>
          <AnalysisResult />
        </Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => ({});

const mapDispatch = { fetchAnalysisSession };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisPage);
