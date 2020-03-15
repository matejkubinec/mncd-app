import React, { Component } from "react";
import {
  AnalysisRequestViewModel,
  AnalysisApproach,
} from "../../../types";
import {
  approachToString,
  analysisToString,
  flatteningToString
} from "../../../utils";
import { Stack, Separator } from "office-ui-fabric-react";

interface AnalysisRequestRow {
  name: string;
  value: string;
  separator?: boolean;
  isParam?: boolean;
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

    rows.push({ name: "DataSet", value: request.dataSetName || "", separator: true });

    if (request.approach === AnalysisApproach.SingleLayerOnly) {
      if (this.props.request.selectedLayerName) {
        const name = this.props.request.selectedLayerName;
        rows.push({ name: "Selected Layer", value: name });
      } else {
        const idx = this.props.request.selectedLayer;
        rows.push({ name: "Selected Layer", value: idx.toString() });
      }
    }

    if (request.approach === AnalysisApproach.SingleLayerFlattening) {
      rows.push({ name: "Flattening", value: this.approach, separator: true });

      for (const param in request.flatteningAlgorithmParameters) {
        rows.push({
          name: param,
          value: request.flatteningAlgorithmParameters[param],
          isParam: true
        });
      }
    }

    rows.push({ name: "Algorithm", value: this.algorithm, separator: true });

    for (const param in request.analysisAlgorithmParameters) {
      rows.push({
        name: param,
        value: request.analysisAlgorithmParameters[param],
        isParam: true
      });
    }

    return rows;
  }

  renderRows(rows: AnalysisRequestRow[]) {
    return rows.map((r, i) => {
      const fontWeight = r.isParam ? 400 : 600;

      return <React.Fragment>
        {r.separator ?
          <Stack horizontal horizontalAlign="center" key={i}>
            <Stack.Item grow={1}>
              <Separator />
            </Stack.Item>
          </Stack> : null
        }
        <Stack horizontal horizontalAlign="center" key={i}>
          <Stack.Item styles={{ root: { width: "50%" } }}>
            <span style={{ fontWeight }}>{r.name}</span>
          </Stack.Item>
          <Stack.Item styles={{ root: { width: "50%" } }}>
            {r.value}
          </Stack.Item>
        </Stack>
      </React.Fragment>
    });
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
