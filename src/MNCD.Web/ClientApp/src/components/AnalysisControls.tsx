import { connect } from "react-redux";
import React from "react";
import { RootState } from "../store";
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
  Text
} from "office-ui-fabric-react";
import {
  AnalysisApproach,
  FlattenningAlgorithm,
  AnalysisAlgorithm
} from "../types";
import { AnalysisState } from "../slices/AnalysisSlice";

interface IProps extends AnalysisState {}

class AnalysisControls extends React.Component<IProps> {
  private singleLayerAlgorithms = [
    AnalysisApproach.SingleLayerFlattening,
    AnalysisApproach.SingleLayerOnly
  ];

  renderAnalysisAlgorithmParameters() {
    const { approach, analysisAlgorithm } = this.props.request;

    switch (analysisAlgorithm) {
      case AnalysisAlgorithm.FluidC:
        return (
          <Stack>
            <TextField label="Fluids (number of communities)" type="number" />
          </Stack>
        );
    }
  }

  renderAnalysisAlgorithm() {
    const { approach, analysisAlgorithm } = this.props.request;

    if (this.singleLayerAlgorithms.includes(approach)) {
      const options: IChoiceGroupOption[] = [
        {
          key: "FluidC",
          text: "FluidC",
          checked: analysisAlgorithm === AnalysisAlgorithm.FluidC
        },
        {
          key: "Louvain",
          text: "Louvain",
          checked: analysisAlgorithm === AnalysisAlgorithm.Louvain
        }
      ];
      return <ChoiceGroup label="Analysis Algorithm" options={options} />;
    } else {
      return null;
      // const options: IChoiceGroupOption[] = [];
      // return <ChoiceGroup label="Analysis Algorithm" options={options} />;
    }
  }

  renderFlatteningParameters() {
    const { approach, flatteningAlgorithm } = this.props.request;
    if (approach !== AnalysisApproach.SingleLayerFlattening) return null;

    if (flatteningAlgorithm === FlattenningAlgorithm.BasicFlattening) {
      return (
        <Stack>
          <Label>Basic Flattening</Label>
          <Toggle label="Weight Edges" />
        </Stack>
      );
    }

    if (flatteningAlgorithm === FlattenningAlgorithm.LocalSimplification) {
      return (
        <Stack>
          <Label>Local Simplification</Label>
          <TextField label="Treshold" type="number" />
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

    const options: IChoiceGroupOption[] = [
      {
        key: "BasicFlattening",
        text: "Basic Flattening",
        checked: flatteningAlgorithm === FlattenningAlgorithm.BasicFlattening
      },
      {
        key: "LocalSimplification",
        text: "Local Simplification",
        checked:
          flatteningAlgorithm === FlattenningAlgorithm.LocalSimplification
      },
      {
        key: "MergeFlattning",
        text: "Merge Flattening",
        checked: flatteningAlgorithm === FlattenningAlgorithm.MergeFlattening
      },
      {
        key: "WeightedFlattening",
        text: "Weighted Flattening",
        checked: flatteningAlgorithm === FlattenningAlgorithm.WeightedFlattening
      }
    ];
    return <ChoiceGroup label="Flattening Approach" options={options} />;
  }

  renderApproach() {
    const { approach } = this.props.request;
    const options: IChoiceGroupOption[] = [
      {
        key: "MultiLayer",
        text: "Multilayer",
        checked: approach === AnalysisApproach.MultiLayer
      },
      {
        key: "SingleLayerFlattening",
        text: "Single Layer - Flattening",
        checked: approach === AnalysisApproach.SingleLayerFlattening
      },
      {
        key: "SingleLayerOnly",
        text: "Single Layer",
        checked: approach === AnalysisApproach.SingleLayerOnly
      }
    ];
    return <ChoiceGroup label="Approach" options={options} />;
  }

  render() {
    return (
      <Stack
        horizontal
        tokens={{ childrenGap: 15, padding: 5 }}
        horizontalAlign="space-evenly"
      >
        <StackItem align="center">
          <DefaultButton>Choose Data</DefaultButton>
          <p>
            Chosen: <Text>Algorithm</Text>
          </p>
        </StackItem>
        <StackItem>{this.renderApproach()}</StackItem>
        <StackItem>{this.renderFlattening()}</StackItem>
        <StackItem>{this.renderFlatteningParameters()}</StackItem>
        <StackItem>{this.renderAnalysisAlgorithm()}</StackItem>
        <StackItem>{this.renderAnalysisAlgorithmParameters()}</StackItem>
        <StackItem align="center">
          <PrimaryButton>Analyze</PrimaryButton>
        </StackItem>
      </Stack>
    );
  }
}

const mapState = (state: RootState) => state.analysis;

const mapDisptach = {};

export default connect(mapState, mapDisptach)(AnalysisControls);
