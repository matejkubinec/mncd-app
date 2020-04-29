import React, { Component } from "react";
import {
  AnalysisRequestViewModel,
  AnalysisApproach,
  FlattenningAlgorithm,
} from "../../../types";
import {
  approachToString,
  analysisToString,
  flatteningToString,
} from "../../../utils";
import { Stack, Separator, IStyle } from "office-ui-fabric-react";

interface AnalysisRequestRow {
  name: string;
  value: string | React.ReactElement;
  separator?: boolean;
  isParam?: boolean;
}

interface IProps {
  request: AnalysisRequestViewModel;
  showDepth: boolean;
  showHeader: boolean;
  useMinMaxHeight: boolean;
}

export default class AnalysisRequest extends Component<IProps> {
  public static defaultProps = {
    useMinMaxHeight: false,
  };

  get flatteningAlgorithm(): string {
    return flatteningToString(this.props.request.flatteningAlgorithm);
  }

  get algorithm(): string {
    return analysisToString(this.props.request.analysisAlgorithm);
  }

  get approach(): string {
    return approachToString(this.props.request.approach);
  }

  format2DMatrix(matrix: number[][]): JSX.Element {
    const mapCol = (col: number) => <td style={{ width: 19 }}>{col}</td>;
    const mapRow = (row: number[]) => <tr>{row.map(mapCol)}</tr>;
    return (
      <table>
        <tbody>{matrix.map(mapRow)}</tbody>
      </table>
    );
  }

  getRows(): AnalysisRequestRow[] {
    const request = this.props.request;
    const rows = [
      { name: "Approach", value: this.approach },
    ] as AnalysisRequestRow[];

    rows.push({
      name: "DataSet",
      value: (
        <a
          href={`/dataset/${request.datasetId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {request.dataSetName || ""}
        </a>
      ),
      separator: true,
    });

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
      rows.push({
        name: "Flattening",
        value: this.flatteningAlgorithm,
        separator: true,
      });

      for (const param in request.flatteningAlgorithmParameters) {
        if (
          this.props.request.flatteningAlgorithm ===
          FlattenningAlgorithm.WeightedFlattening
        ) {
          const matrix = JSON.parse(
            request.flatteningAlgorithmParameters[param]
          ) as number[][];
          const formatted = this.format2DMatrix(matrix);
          rows.push({
            name: param,
            value: formatted as any,
            isParam: true,
          });
        } else {
          rows.push({
            name: param,
            value: request.flatteningAlgorithmParameters[param],
            isParam: true,
          });
        }
      }
    }

    rows.push({ name: "Algorithm", value: this.algorithm, separator: true });

    for (const param in request.analysisAlgorithmParameters) {
      rows.push({
        name: param,
        value: request.analysisAlgorithmParameters[param],
        isParam: true,
      });
    }

    return rows;
  }

  renderRows(rows: AnalysisRequestRow[]) {
    return rows.map((r, i) => {
      const fontWeight = r.isParam ? 400 : 600;

      return (
        <React.Fragment key={i}>
          {r.separator ? (
            <Stack horizontal horizontalAlign="center">
              <Stack.Item grow={1}>
                <Separator />
              </Stack.Item>
            </Stack>
          ) : null}
          <Stack horizontal horizontalAlign="center">
            <Stack.Item styles={{ root: { width: "50%" } }}>
              <span style={{ fontWeight }}>
                {r.name[0].toUpperCase()}
                {r.name.substring(1)}
              </span>
            </Stack.Item>
            <Stack.Item styles={{ root: { width: "50%" } }}>
              {r.value}
            </Stack.Item>
          </Stack>
        </React.Fragment>
      );
    });
  }

  render() {
    const rows = this.getRows();
    return (
      <Stack
        tokens={{ padding: 10, childrenGap: 5 }}
        styles={this.getStackStyle()}
      >
        {this.props.showHeader ? (
          <Stack.Item>
            <h2>Request</h2>
          </Stack.Item>
        ) : null}
        {this.renderRows(rows)}
      </Stack>
    );
  }

  private getStackStyle = () => {
    const { useMinMaxHeight } = this.props;
    const styles: IStyle = {};

    if (useMinMaxHeight) {
      styles.minHeight = 330;
      styles.maxHeight = 330;
    }

    return { root: styles };
  };
}
