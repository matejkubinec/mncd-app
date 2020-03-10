import React, { Component } from "react";
import {
  AnalysisRequestViewModel,
  AnalysisApproach,
  AnalysisAlgorithm,
  FlattenningAlgorithm
} from "../../../types";
import {
  approachToString,
  analysisToString,
  flatteningToString
} from "../../../utils";
import { Stack, Text, getTheme } from "office-ui-fabric-react";
import { Depths } from "@uifabric/fluent-theme/lib/fluent/FluentDepths";
const theme = getTheme();

interface AnalysisRequestRow {
  name: string;
  value: string;
}

interface IProps {
  request: AnalysisRequestViewModel;
  showDepth: boolean;
  showHeader: boolean;
}

export default class AnalysisRequest extends Component<IProps> {
  get flatteningAlgorithm(): string {
    return flatteningToString(this.props.request.flatteningAlgorithm);
  }

  get algorithm(): string {
    return analysisToString(this.props.request.analysisAlgorithm);
  }

  get approach(): string {
    return approachToString(this.props.request.approach);
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
      <Stack tokens={{ padding: 10, childrenGap: 5 }}>
        {this.props.showHeader ? (
          <Stack.Item>
            <h2>Request</h2>
          </Stack.Item>
        ) : null}
        {this.renderRows(rows)}
      </Stack>
    );
  }
}
