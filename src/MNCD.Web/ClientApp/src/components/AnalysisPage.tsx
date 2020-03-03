import { connect } from "react-redux";
import React from "react";
import {
  Stack,
  StackItem,
  IconButton,
  getTheme,
  ProgressIndicator
} from "office-ui-fabric-react";
import { RootState } from "../store";
import { push } from "connected-react-router";
import { fetchAnalysisSession, AnalysisState } from "../slices/AnalysisSlice";
import AnalysisControls from "./AnalysisControls";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { RouteComponentProps } from "react-router";
import Analysis from "./Analysis";
const theme = getTheme();

interface MatchParams {
  guid: string;
}

interface IProps extends RouteComponentProps<MatchParams>, AnalysisState {
  fetchAnalysisSession: Function;
  push: Function;
}

interface IState {
  showControlsIconName: string;
  showControls: boolean;
}

class AnalysisPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showControlsIconName: "ChevronUp",
      showControls: true
    };

    this.onToggleControls = this.onToggleControls.bind(this);
    this.onBackToSessionList = this.onBackToSessionList.bind(this);
  }

  componentDidMount() {
    const guid = this.props.match.params.guid;
    this.props.fetchAnalysisSession(guid);
  }

  onToggleControls() {
    if (this.state.showControls) {
      this.setState({
        showControls: false,
        showControlsIconName: "ChevronDown"
      });
    } else {
      this.setState({ showControls: true, showControlsIconName: "ChevronUp" });
    }
  }

  onBackToSessionList() {
    this.props.push("/");
  }

  render() {
    const { showControlsIconName: iconName, showControls } = this.state;
    const analysisSesion = this.props.session;
    let analyses = new Array<any>();
    if (analysisSesion) {
      analyses = analysisSesion.analyses.map((a, i) => (
        <Analysis key={i} analysis={a} />
      ));
    }

    return (
      <Stack>
        <Stack.Item>
          <Stack
            horizontal
            verticalAlign="center"
            tokens={{
              padding: 5,
              childrenGap: 10
            }}
            style={{
              backgroundColor: theme.palette.accent,
              color: theme.palette.white
            }}
          >
            <IconButton
              iconProps={{ iconName: "Back" }}
              styles={{ root: { color: theme.palette.white } }}
              onClick={this.onBackToSessionList}
            />
            <h3>{this.props.session ? this.props.session.name : null}</h3>
            <p>
              (
              {this.props.session
                ? new Date(this.props.session.createDate).toLocaleString()
                : null}
              )
            </p>
          </Stack>
        </Stack.Item>
        <Stack.Item>
          <Stack
            horizontal
            style={{
              backgroundColor: NeutralColors.white,
              boxShadow: Depths.depth16
            }}
            horizontalAlign="center"
          >
            <IconButton
              iconProps={{ iconName }}
              style={{ width: "100%" }}
              onClick={this.onToggleControls}
            />
          </Stack>
        </Stack.Item>
        {showControls ? (
          <StackItem>
            <AnalysisControls />
          </StackItem>
        ) : null}
        {this.props.isSessionLoading ? (
          <Stack tokens={{ padding: 50 }}>
            <ProgressIndicator />
          </Stack>
        ) : (
          <Stack.Item tokens={{ padding: 20 }}>
            <Stack
              horizontal
              tokens={{ padding: 20, childrenGap: 20 }}
              horizontalAlign="center"
            >
              {analyses}
            </Stack>
          </Stack.Item>
        )}
      </Stack>
    );
  }
}

const mapState = (state: RootState) => state.analysis;

const mapDisptach = { fetchAnalysisSession, push };

export default connect(mapState, mapDisptach)(AnalysisPage);
