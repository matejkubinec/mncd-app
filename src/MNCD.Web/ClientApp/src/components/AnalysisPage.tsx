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
  StackItem
} from "office-ui-fabric-react";
import { RootState } from "../store";
import { DataSetAddViewModel, AnalysisRequestViewModel } from "../types";
import AnalysisControls from "./AnalysisControls";

class AnalysisPage extends React.Component {
  render() {
    return (
      <Stack>
        <StackItem>
          <AnalysisControls />
        </StackItem>
        <Stack.Item>
          <div></div>
        </Stack.Item>
      </Stack>
    );
  }
}

const mapState = (state: RootState) => state.dataset.detail;

const mapDisptach = {};

export default connect(mapState, mapDisptach)(AnalysisPage);
