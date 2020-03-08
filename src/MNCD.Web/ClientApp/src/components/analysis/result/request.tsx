import React, { Component } from "react";
import {
  AnalysisRequestViewModel,
  AnalysisApproach,
  AnalysisAlgorithm,
  FlattenningAlgorithm
} from "../../../types";
import { Stack, Text } from "office-ui-fabric-react";
import { NeutralColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";

interface AnalysisRequestRow {
  name: string;
  value: string;
}

interface IProps {
  request: AnalysisRequestViewModel;
}

export default class AnalysisRequest extends Component<IProps> {
  get flatteningAlgorithm(): string {
    switch (this.props.request.flatteningAlgorithm) {
      case FlattenningAlgorithm.BasicFlattening:
        return "Basic Flattening";
      case FlattenningAlgorithm.LocalSimplification:
        return "Local Simplification";
      case FlattenningAlgorithm.MergeFlattening:
        return "Merge Flattening";
      case FlattenningAlgorithm.WeightedFlattening:
        return "Weighted Flattening";
    }
  }

  get algorithm(): string {
    switch (this.props.request.analysisAlgorithm) {
      case AnalysisAlgorithm.FluidC:
        return "FluidC";
      case AnalysisAlgorithm.Louvain:
        return "Louvain";
    }
  }

  get approach(): string {
    switch (this.props.request.approach) {
      case AnalysisApproach.MultiLayer:
        return "Multi Layer";
      case AnalysisApproach.SingleLayerFlattening:
        return "Single Layer - Flattening";
      case AnalysisApproach.SingleLayerOnly:
        return "Single Layer";
      default:
        return "";
    }
  }

  getRows(): AnalysisRequestRow[] {
    const request = this.props.request;
    const rows = [
      { name: "Approach", value: this.approach }
    ] as AnalysisRequestRow[];

    if (request.approach === AnalysisApproach.SingleLayerFlattening) {
      rows.push({ name: "Flattening", value: this.approach });

      for (const param in request.flatteningAlgorithmParameters) {
        rows.push({
          name: param,
          value: request.flatteningAlgorithmParameters[param]
        });
      }
    }

    if (request.approach === AnalysisApproach.SingleLayerOnly) {
      const value = this.props.request.selectedLayer.toString();
      rows.push({ name: "Selected Layer", value: value });
    }

    rows.push({ name: "Algorithm", value: this.algorithm });

    rows.push({ name: "Algorithm Parameters", value: "" });

    for (const param in request.analysisAlgorithmParameters) {
      rows.push({
        name: param,
        value: request.analysisAlgorithmParameters[param]
      });
    }

    return rows;
  }

  renderRows(rows: AnalysisRequestRow[]) {
    return rows.map((r, i) => (
      <Stack horizontal horizontalAlign="center" key={i}>
        <Stack.Item styles={{ root: { width: "50%" } }}>
          <Text style={{ fontWeight: "bold" }}>{r.name}</Text>
        </Stack.Item>
        <Stack.Item styles={{ root: { width: "50%" } }}>
          <Text>{r.value}</Text>
        </Stack.Item>
      </Stack>
    ));
  }

  render() {
    const rows = this.getRows();

    return (
      <Stack
        tokens={{ padding: 10, childrenGap: 5 }}
        style={{
          backgroundColor: NeutralColors.white,
          boxShadow: Depths.depth4
        }}
      >
        <Stack.Item>
          <h2>Request</h2>
        </Stack.Item>
        {this.renderRows(rows)}
      </Stack>
    );
  }
}
