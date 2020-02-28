import React from "react";
import { Dictionary, AnalysisRequestViewModel, AnalysisApproach, AnalysisAlgorithm } from "../types"
import {
  Stack,
  StackItem,
  Label,
  TextField,
  Dropdown,
  IDropdownOption
} from "office-ui-fabric-react";

interface IProps {
  request: AnalysisRequestViewModel,
  updateRequest: (change: object) => void,
}

export default class AnalysisControlsAlgorithm extends React.Component<IProps> {
  private multiLayer: IDropdownOption[] = [];
  private singleLayer: IDropdownOption[] = [
    { key: AnalysisAlgorithm.FluidC, text: "FluidC" },
    { key: AnalysisAlgorithm.Louvain, text: "Louvain" },
  ];

  constructor(props: IProps) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.renderSingleLayer = this.renderSingleLayer.bind(this);
    this.renderMultiLayer = this.renderMultiLayer.bind(this);
  }

  onChange(_: any, option: IDropdownOption | undefined) {
    if (!option) return;

    this.props.updateRequest({ analysisAlgorithm: option.key });
  }

  renderLouvain(parameters: Dictionary<string>) {
    return null;
  }

  renderFluidC(parameters: Dictionary<string>) {
    const maxIterations = parameters["maxIterations"] || "100";
    const k = parameters["k"] || "2";
    const update = this.props.updateRequest;
    return (
      <Stack horizontal tokens={{ childrenGap: 5 }}>
        <TextField
          label="K"
          type="number"
          description="Number of communities"
          value={k}
          onChange={(_, k) => update({ ...parameters, k })}
        />
        <TextField
          label="Max Iterations"
          type="number"
          description="Number of iterations"
          value={maxIterations}
          onChange={(_, maxIterations) => update({ ...parameters, maxIterations })}
        />
      </Stack>
    );
  }

  renderSingleLayerParameters(alg: AnalysisAlgorithm, params: Dictionary<string>) {
    switch (alg) {
      case AnalysisAlgorithm.FluidC:
        return this.renderFluidC(params);
      case AnalysisAlgorithm.Louvain:
        return this.renderLouvain(params);
      default:
        return null;
    }
  }

  renderSingleLayer() {
    const algorithm = this.props.request.analysisAlgorithm;
    const parameters = this.props.request.analysisAlgorithmParameters
    return (<Stack>
      <StackItem>
        <Label>Community Detection Algorithm</Label>
      </StackItem>
      <StackItem>
        <Dropdown
          styles={{ dropdown: { minWidth: 315 } }}
          options={this.singleLayer}
          selectedKey={algorithm}
          onChange={this.onChange} />
      </StackItem>
      <StackItem>
        {this.renderSingleLayerParameters(algorithm, parameters)}
      </StackItem>
    </Stack>)
  }

  renderMultilayerParameters() { }

  renderMultiLayer() { return null; }

  render() {
    const { approach } = this.props.request;

    if (approach === AnalysisApproach.MultiLayer) {
      return this.renderMultiLayer();
    } else {
      return this.renderSingleLayer();
    }
  }
} 