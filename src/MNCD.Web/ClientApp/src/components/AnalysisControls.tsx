import { connect } from "react-redux";
import React, { Fragment } from "react";
import { RootState } from "../store";
import { push } from 'connected-react-router'
import {
  Stack,
  StackItem,
  DefaultButton,
  VerticalDivider,
  ChoiceGroup,
  IChoiceGroupOption,
  Toggle,
  Label,
  TextField,
  PrimaryButton,
  Text,
  IconButton
} from "office-ui-fabric-react";
import {
  AnalysisApproach,
  FlattenningAlgorithm,
  AnalysisAlgorithm
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

  renderAnalysisAlgorithmParameters() {
    const { approach, analysisAlgorithm } = this.props.request;
    const parameters = this.props.request.analysisAlgorithmParameters;

    if (approach === AnalysisApproach.MultiLayer) return;

    switch (analysisAlgorithm) {
      case AnalysisAlgorithm.FluidC:
        const value = parameters["fluids"] || "2";
        const onChange = (_: any, value: string | undefined) => {
          if (value === undefined) return;
          const analysisAlgorithmParameters = {
            ...parameters,
            fluids: Number(value)
          };
          this.updateRequest({ analysisAlgorithmParameters });
        };

        return (
          <Stack>
            <TextField
              label="Fluids"
              type="number"
              description="Number of communities"
              value={value}
              onChange={onChange}
            />
          </Stack>
        );
    }
  }

  renderAnalysisAlgorithm() {
    const { approach, analysisAlgorithm } = this.props.request;

    if (this.singleLayerAlgorithms.includes(approach)) {
      const { FluidC, Louvain } = AnalysisAlgorithm;
      const options: IChoiceGroupOption[] = [
        {
          key: FluidC.toString(),
          text: "FluidC",
          checked: analysisAlgorithm === FluidC
        },
        {
          key: Louvain.toString(),
          text: "Louvain",
          checked: analysisAlgorithm === Louvain
        }
      ];
      const onChange = (_: any, option: IChoiceGroupOption | undefined) => {
        if (option === undefined) return;

        this.updateRequest({ analysisAlgorithm: Number(option.key) });
      };

      return (
        <ChoiceGroup
          label="Analysis Algorithm"
          options={options}
          onChange={onChange}
        />
      );
    } else {
      return null;
      // const options: IChoiceGroupOption[] = [];
      // return <ChoiceGroup label="Analysis Algorithm" options={options} />;
    }
  }

  renderFlatteningParameters() {
    const { approach, flatteningAlgorithm } = this.props.request;
    const parameters = this.props.request.flatteningAlgorithmParameters;

    if (approach !== AnalysisApproach.SingleLayerFlattening) return null;

    if (flatteningAlgorithm === FlattenningAlgorithm.BasicFlattening) {
      const value = Boolean(parameters["weightEdges"]);
      const onChange = (_: any, checked: boolean | undefined) => {
        if (checked === undefined) return;

        const flatteningAlgorithmParameters = {
          ...parameters,
          weightEdges: checked
        };
        this.updateRequest({ flatteningAlgorithmParameters });
      };

      return (
        <Stack>
          <Label>Basic Flattening</Label>
          <Toggle label="Weight Edges" checked={value} onChange={onChange} />
        </Stack>
      );
    }

    if (flatteningAlgorithm === FlattenningAlgorithm.LocalSimplification) {
      const value = parameters["threshold"] || "0";
      const onChange = (_: any, value: string | undefined) => {
        if (value === undefined) return;

        const flatteningAlgorithmParameters = {
          ...parameters,
          threshold: Number(value)
        };
        this.updateRequest({ flatteningAlgorithmParameters });
      };

      return (
        <Stack>
          <Label>Local Simplification</Label>
          <TextField
            label="Threshold"
            type="number"
            value={value}
            onChange={onChange}
          />
          TODO: local simplification layer relevances
        </Stack>
      );
    }

    if (flatteningAlgorithm === FlattenningAlgorithm.WeightedFlattening) {
      return (
        <Stack>
          <Label>Weighted Flattening</Label>
          TODO: weighted flattening
        </Stack>
      );
    }

    return null;
  }

  renderFlattening() {
    const { approach, flatteningAlgorithm } = this.props.request;

    if (approach !== AnalysisApproach.SingleLayerFlattening) return null;

    const {
      BasicFlattening,
      LocalSimplification,
      MergeFlattening,
      WeightedFlattening
    } = FlattenningAlgorithm;

    const options: IChoiceGroupOption[] = [
      {
        key: BasicFlattening.toString(),
        text: "Basic Flattening",
        checked: flatteningAlgorithm === BasicFlattening
      },
      {
        key: LocalSimplification.toString(),
        text: "Local Simplification",
        checked: flatteningAlgorithm === LocalSimplification
      },
      {
        key: MergeFlattening.toString(),
        text: "Merge Flattening",
        checked: flatteningAlgorithm === MergeFlattening
      },
      {
        key: WeightedFlattening.toString(),
        text: "Weighted Flattening",
        checked: flatteningAlgorithm === WeightedFlattening
      }
    ];

    const onChange = (_: any, option: IChoiceGroupOption | undefined) => {
      if (option === undefined) return;

      this.updateRequest({ flatteningAlgorithm: Number(option.key) });
    };

    return (
      <ChoiceGroup
        label="Flattening Approach"
        options={options}
        onChange={onChange}
      />
    );
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
          horizontal
          tokens={{ childrenGap: 15, padding: 15 }}
          style={{
            boxShadow: Depths.depth4,
            backgroundColor: NeutralColors.white
          }}
          horizontalAlign="space-between"
        >
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
          <StackItem align="center">
            <PrimaryButton>Analyze</PrimaryButton>
          </StackItem>
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
