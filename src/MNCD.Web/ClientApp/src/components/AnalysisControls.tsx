import { connect } from "react-redux";
import React, { Fragment } from "react";
import { RootState } from "../store";
import { push } from 'connected-react-router'
import {
  Stack,
  StackItem,
  DefaultButton,
  ChoiceGroup,
  IChoiceGroupOption,
  PrimaryButton,
  Separator
} from "office-ui-fabric-react";
import {
  AnalysisApproach,
} from "../types";
import {
  AnalysisState,
  updateAnalysisRequest,
  openDataSetModal
} from "../slices/AnalysisSlice";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
import AnalysisDataSetModal from "./AnalysisDataSetModal";
import { NeutralColors, SharedColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import AnalysisControlsFlattening from "./AnalysisControlsFlattening";
import AnalysisControlsAlgorithm from "./AnalysisControlsAlgorithm";

interface IProps extends AnalysisState {
  updateAnalysisRequest: typeof updateAnalysisRequest;
  openDataSetModal: typeof openDataSetModal;
  push: typeof push;
}

class AnalysisControls extends React.Component<IProps> {
  private singleLayerAlgorithms = [
    AnalysisApproach.SingleLayerFlattening,
    AnalysisApproach.SingleLayerOnly
  ];

  constructor(props: IProps) {
    super(props);

    this.updateRequest = this.updateRequest.bind(this);
  }

  updateRequest(change: object) {
    this.props.updateAnalysisRequest(change);
  }

  renderApproach() {
    const { approach } = this.props.request;
    const options: IChoiceGroupOption[] = [
      {
        key: AnalysisApproach.MultiLayer.toString(),
        text: "Multilayer",
        checked: approach === AnalysisApproach.MultiLayer
      },
      {
        key: AnalysisApproach.SingleLayerFlattening.toString(),
        text: "Single Layer - Flattening",
        checked: approach === AnalysisApproach.SingleLayerFlattening
      },
      {
        key: AnalysisApproach.SingleLayerOnly.toString(),
        text: "Single Layer",
        checked: approach === AnalysisApproach.SingleLayerOnly
      }
    ];

    const onChange = (_: any, option: IChoiceGroupOption | undefined) => {
      if (option === undefined) return;

      this.updateRequest({ approach: Number(option.key) });
    };

    return (
      <ChoiceGroup label="Approach" options={options} onChange={onChange} />
    );
  }

  render() {
    const { dataSetName } = this.props;

    return (
      <Fragment>
        <AnalysisDataSetModal />
        <Stack
          tokens={{ padding: 15 }}
          style={{
            boxShadow: Depths.depth4,
            backgroundColor: NeutralColors.white
          }}
        >
          <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 25 }}>
            <StackItem align="center">
              <DefaultButton onClick={() => this.onOpenDataSetModal()}>
                Choose Data
            </DefaultButton>
              {dataSetName !== "" ? (
                <div style={{ textAlign: "center" }}>
                  <strong>{dataSetName}</strong>
                </div>
              ) : null}
            </StackItem>
            <StackItem>{this.renderApproach()}</StackItem>
            <StackItem>
              <AnalysisControlsFlattening request={this.props.request} updateRequest={this.updateRequest} />
            </StackItem>
            <StackItem>
              <AnalysisControlsAlgorithm request={this.props.request} updateRequest={this.updateRequest} />
            </StackItem>
          </Stack>
          <StackItem>
            <Separator />
          </StackItem>
          <Stack horizontalAlign="end">
            <StackItem>
              <PrimaryButton>Analyze</PrimaryButton>
            </StackItem>
          </Stack>
        </Stack>
      </Fragment>
    );
  }

  onOpenDataSetModal() {
    this.props.openDataSetModal();
  }
}

const mapState = (state: RootState) => state.analysis;

const mapDisptach = { updateAnalysisRequest, openDataSetModal, push };

export default connect(mapState, mapDisptach)(AnalysisControls);
