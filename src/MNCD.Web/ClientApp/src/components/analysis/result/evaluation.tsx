import React, { Component } from "react";
import { Stack, TooltipHost, Icon } from "office-ui-fabric-react";
import { AnalysisResultViewModel } from "../../../types";

interface IRow {
  name: string;
  tooltipId: string;
  tooltip: string;
  value: string | JSX.Element;
}

interface IProps {
  result: AnalysisResultViewModel;
}

export default class Evaluation extends Component<IProps> {
  formatArray = (data: number[], prefix: string) => (
    <table>
      <thead>
        <tr>
          {data.map((_, i) => (
            <th align="center" style={{ fontWeight: 600 }}>
              {prefix}
              {i}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {data.map(d => (
            <td align="left">{d.toFixed(2)}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );

  getRows(): IRow[] {
    const res = this.props.result;
    const rows = new Array<IRow>();
    const id = this.props.result.id;

    if (res.coverage) {
      rows.push({
        name: "Coverage",
        tooltipId: `${id}-coverage-tooltip`,
        tooltip:
          "The coverage of a partition is the ratio of the number of intra-community edges to the total number of edges in the graph.",
        value: res.coverage.toFixed(2)
      });
    }

    if (res.averageCoverage) {
      rows.push({
        name: "Average Coverage",
        tooltipId: `${id}-coverage-tooltip`,
        tooltip:
          "The coverage of a partition is the ratio of the number of intra-community edges to the total number of edges in the graph.",
        value: res.averageCoverage.toFixed(2)
      });
    }

    if (res.coverages && res.coverages.length > 0) {
      rows.push({
        name: "Coverages",
        tooltipId: `${id}-coverage-tooltip`,
        tooltip: "Coverage of communities in each layer.",
        value: this.formatArray(res.coverages, "L")
      });
    }

    if (res.performance) {
      rows.push({
        name: "Performance",
        tooltipId: `${id}-performance-tooltip`,
        tooltip:
          "The performance of a partition is the ratio of the number of intra-community edges plus inter-community non-edges with the total number of potential edges.",
        value: res.performance.toFixed(2)
      });
    }

    if (res.averagePerformance) {
      rows.push({
        name: "Average Performance",
        tooltipId: `${id}-performance-tooltip`,
        tooltip:
          "The performance of a partition is the ratio of the number of intra-community edges plus inter-community non-edges with the total number of potential edges.",
        value: res.averagePerformance.toFixed(2)
      });
    }

    if (res.performances && res.performances.length > 0) {
      rows.push({
        name: "Performances",
        tooltipId: `${id}-performance-tooltip`,
        tooltip: "Performances of communities individual layers.",
        value: this.formatArray(res.performances, "L")
      });
    }

    if (res.modularity) {
      rows.push({
        name: "Modularity",
        tooltipId: `${id}-modularity-tooltip`,
        tooltip:
          "Modularity is the fraction of the edges that fall within the given groups minus the expected fraction if edges were distributed at random.",
        value: res.modularity.toFixed(2)
      });
    }

    if (res.averageModularity) {
      rows.push({
        name: "Average Modularity",
        tooltipId: `${id}-modularity-tooltip`,
        tooltip:
          "Modularity is the fraction of the edges that fall within the given groups minus the expected fraction if edges were distributed at random.",
        value: res.averageModularity.toFixed(2)
      });
    }

    if (res.modularities && res.modularities.length > 0) {
      rows.push({
        name: "Modularities",
        tooltipId: `${id}-modularity-tooltip`,
        tooltip: "Modularity of communities in each layer.",
        value: this.formatArray(res.modularities, "L")
      });
    }

    return rows;
  }

  renderRows(rows: IRow[]) {
    return rows.map((r, i) => (
      <Stack horizontal horizontalAlign="center" key={i}>
        <Stack.Item styles={{ root: { width: "50%" } }}>
          <Stack tokens={{ childrenGap: 5 }} horizontal verticalAlign="center">
            <Stack.Item verticalFill>
              <span style={{ fontWeight: 600 }} aria-describedby={r.tooltipId}>
                {r.name}
              </span>
            </Stack.Item>
            <Stack.Item verticalFill>
              <TooltipHost id={r.tooltipId} content={r.tooltip}>
                <Icon iconName="Info" style={{ paddingTop: 6 }} />
              </TooltipHost>
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item styles={{ root: { width: "50%" } }}>{r.value}</Stack.Item>
      </Stack>
    ));
  }

  render() {
    const rows = this.getRows();
    return (
      <Stack tokens={{ padding: 10, childrenGap: 5 }}>
        <Stack.Item>
          <h2>Evaluation</h2>
        </Stack.Item>
        {this.renderRows(rows)}
      </Stack>
    );
  }
}
