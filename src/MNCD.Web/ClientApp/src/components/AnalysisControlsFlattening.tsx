import React from "react";
import {
  Dictionary,
  AnalysisRequestViewModel,
  AnalysisApproach,
  FlattenningAlgorithm
} from "../types";
import {
  Stack,
  StackItem,
  IDropdownOption,
  Dropdown,
  Toggle,
  TextField,
  Label,
  IDropdownStyles,
  IStyleSet,
  IDetailsGroupRenderProps
} from "office-ui-fabric-react";

interface IProps {
  request: AnalysisRequestViewModel;
  updateRequest: (change: object) => void;
}

export default class AnalysisControlsFlattening extends React.Component<
  IProps
> {
  private options: IDropdownOption[] = [
    { key: FlattenningAlgorithm.BasicFlattening, text: "Basic Flattening" },
    {
      key: FlattenningAlgorithm.LocalSimplification,
      text: "Local Simplification"
    },
    { key: FlattenningAlgorithm.MergeFlattening, text: "Merge Flattening" },
    {
      key: FlattenningAlgorithm.WeightedFlattening,
      text: "Weighted Flattening"
    }
  ];

  constructor(props: IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(_: any, option: IDropdownOption | undefined) {
    if (!option) return;

    this.props.updateRequest({ flatteningAlgorithm: option.key });
  }

  renderLocalSimplification(parameters: Dictionary<string>) {
    const value = parameters["threshold"] || "0";
    const onChange = (_: any, value: string | undefined) => {
      if (value === undefined) return;

      const flatteningAlgorithmParameters = {
        ...parameters,
        threshold: Number(value)
      };
      this.props.updateRequest({ flatteningAlgorithmParameters });
    };

    return (
      <Stack>
        <TextField
          styles={{ fieldGroup: { width: 250 } }}
          label="Threshold"
          type="number"
          value={value}
          onChange={onChange}
        />
        TODO: local simplification layer relevances
      </Stack>
    );
  }

  renderBasicFlattening(parameters: Dictionary<string>) {
    const value = Boolean(parameters["weightEdges"]);
    const onChange = (_: any, checked: boolean | undefined) => {
      if (checked === undefined) return;

      const flatteningAlgorithmParameters = {
        ...parameters,
        weightEdges: checked
      };
      this.props.updateRequest({ flatteningAlgorithmParameters });
    };

    return (
      <Stack>
        <Toggle label="Weight Edges" checked={value} onChange={onChange} />
      </Stack>
    );
  }

  renderParameters() {
    const algorithm = this.props.request.flatteningAlgorithm;
    const parameters = this.props.request.flatteningAlgorithmParameters;

    switch (algorithm) {
      case FlattenningAlgorithm.BasicFlattening:
        return this.renderBasicFlattening(parameters);
      case FlattenningAlgorithm.LocalSimplification:
        return this.renderLocalSimplification(parameters);
    }
  }

  render() {
    const { approach, flatteningAlgorithm } = this.props.request;

    if (approach !== AnalysisApproach.SingleLayerFlattening) {
      return null;
    }

    return (
      <Stack>
        <StackItem>
          <Label>Flattening</Label>
        </StackItem>
        <StackItem>
          <Dropdown
            styles={{ dropdown: { width: 250 } }}
            options={this.options}
            selectedKey={flatteningAlgorithm}
            onChange={this.onChange}
          />
        </StackItem>
        <StackItem>{this.renderParameters()}</StackItem>
      </Stack>
    );
  }
}
