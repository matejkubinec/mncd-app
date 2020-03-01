import { connect } from "react-redux";
import React, { Ref, FormEvent, Fragment } from "react";
import {
  TextField,
  Stack,
  PrimaryButton,
  DefaultButton,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  StackItem,
  IconButton
} from "office-ui-fabric-react";
import { RootState } from "../store";
import { DataSetAddViewModel, AnalysisRequestViewModel } from "../types";
import { fetchAnalysisSession } from "../slices/AnalysisSlice";
import AnalysisControls from "./AnalysisControls";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import { RouteComponentProps } from "react-router";

interface MatchParams {
  guid: string;
}

interface IProps extends RouteComponentProps<MatchParams> {
  fetchAnalysisSession: Function;
}

interface IState {
  showControlsIconName: string;
  showControls: boolean;
}

class AnalysisPage extends React.Component<IProps, IState>  {

  constructor(props: IProps) {
    super(props);

    this.state = {
      showControlsIconName: "ChevronUp",
      showControls: true
    }

    this.onToggleControls = this.onToggleControls.bind(this);
  }

  componentDidMount() {
    const guid = this.props.match.params.guid;
    this.props.fetchAnalysisSession(guid);
  }

  onToggleControls() {
    if (this.state.showControls) {
      this.setState({ showControls: false, showControlsIconName: "ChevronDown" })
    } else {
      this.setState({ showControls: true, showControlsIconName: "ChevronUp" })
    }
  }

  render() {
    const { showControlsIconName: iconName, showControls } = this.state;

    return (
      <Stack>
        <Stack.Item>
          <Stack
            horizontal
            style={{ backgroundColor: NeutralColors.white, boxShadow: Depths.depth16 }}
            horizontalAlign="center"
          >
            <IconButton
              iconProps={{ iconName }}
              style={{ width: "100%" }}
              onClick={this.onToggleControls}
            />
          </Stack>
        </Stack.Item>
        {showControls ?
          <StackItem>
            <AnalysisControls />
          </StackItem> : null
        }
        <Stack.Item tokens={{ padding: 10 }}>
        </Stack.Item>
      </Stack>
    );
  }
}

const mapState = (state: RootState) => state.dataset.detail;

const mapDisptach = { fetchAnalysisSession };

export default connect(mapState, mapDisptach)(AnalysisPage);
