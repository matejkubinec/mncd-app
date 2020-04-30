import React, { Component } from "react";
import {
  Stack,
  TooltipHost,
  Icon,
  ITheme,
  Separator,
} from "office-ui-fabric-react";
import { AnalysisResultViewModel } from "../../../types";
import { AnalysisResultCard } from ".";

interface IRow {
  name: string;
  tooltipId: string;
  tooltip: string;
  value: string | JSX.Element;
}

interface IProps {
  theme: ITheme;
  result: AnalysisResultViewModel;
  useMinMaxHeight: boolean;
}

export default class Evaluation extends Component<IProps> {
  public static defaultProps = {
    useMinMaxHeight: false,
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      minimized: false,
    };
  }

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
        value: res.coverage.toFixed(2),
      });
    }

    if (res.averageCoverage) {
      rows.push({
        name: "Average Coverage",
        tooltipId: `${id}-coverage-tooltip`,
        tooltip:
          "The coverage of a partition is the ratio of the number of intra-community edges to the total number of edges in the graph.",
        value: res.averageCoverage.toFixed(2),
      });
    }

    if (res.coverages && res.coverages.length > 0) {
      rows.push({
        name: "Coverages",
        tooltipId: `${id}-coverage-tooltip`,
        tooltip: "Coverage of communities in each layer.",
        value: this.renderArray(res.coverages),
      });
    }

    if (res.performance) {
      rows.push({
        name: "Performance",
        tooltipId: `${id}-performance-tooltip`,
        tooltip:
          "The performance of a partition is the ratio of the number of intra-community edges plus inter-community non-edges with the total number of potential edges.",
        value: res.performance.toFixed(2),
      });
    }

    if (res.averagePerformance) {
      rows.push({
        name: "Average Performance",
        tooltipId: `${id}-performance-tooltip`,
        tooltip:
          "The performance of a partition is the ratio of the number of intra-community edges plus inter-community non-edges with the total number of potential edges.",
        value: res.averagePerformance.toFixed(2),
      });
    }

    if (res.performances && res.performances.length > 0) {
      rows.push({
        name: "Performances",
        tooltipId: `${id}-performance-tooltip`,
        tooltip: "Performances of communities individual layers.",
        value: this.renderArray(res.performances),
      });
    }

    if (res.modularity) {
      rows.push({
        name: "Modularity",
        tooltipId: `${id}-modularity-tooltip`,
        tooltip:
          "Modularity is the fraction of the edges that fall within the given groups minus the expected fraction if edges were distributed at random.",
        value: res.modularity.toFixed(2),
      });
    }

    if (res.averageModularity) {
      rows.push({
        name: "Average Modularity",
        tooltipId: `${id}-modularity-tooltip`,
        tooltip:
          "Modularity is the fraction of the edges that fall within the given groups minus the expected fraction if edges were distributed at random.",
        value: this.formatNumber(res.averageModularity.toFixed(2)),
      });
    }

    if (res.modularities && res.modularities.length > 0) {
      rows.push({
        name: "Modularities",
        tooltipId: `${id}-modularity-tooltip`,
        tooltip: "Modularity of communities in each layer.",
        value: this.renderArray(res.modularities),
      });
    }

    return rows;
  }

  render = () => (
    <AnalysisResultCard title={"Evaluation"} theme={this.props.theme}>
      {this.renderRows(this.getRows())}
    </AnalysisResultCard>
  );

  private renderArray = (values: number[]) => {
    const items = values.map((v) => <li>{this.formatNumber(v.toFixed(2))}</li>);
    const columns = Math.ceil(items.length / 5);
    return <ol style={{ columns }}>{items}</ol>;
  };

  private renderRows(rows: IRow[]) {
    const fontFamily = "Consolas, monospace";
    return rows.map((r, i) => (
      <Stack key={i}>
        <Separator styles={{ root: { padding: 0, height: 5 } }} />
        <Stack horizontal horizontalAlign="center" verticalAlign="center">
          <Stack.Item verticalFill styles={{ root: { width: "50%" } }}>
            <Stack
              tokens={{ childrenGap: 5 }}
              horizontal
              verticalAlign="center"
            >
              <Stack.Item verticalFill styles={{ root: { fontWeight: 600 } }}>
                {r.name}
              </Stack.Item>
              <Stack.Item verticalFill>
                <TooltipHost id={r.tooltipId} content={r.tooltip}>
                  <Icon iconName="Info" style={{ paddingTop: 6 }} />
                </TooltipHost>
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item
            verticalFill
            styles={{ root: { width: "50%", fontFamily } }}
          >
            {r.value}
          </Stack.Item>
        </Stack>
      </Stack>
    ));
  }

  private formatNumber = (num: number | string) => {
    return Number(num) >= 0 ? (
      <React.Fragment>&nbsp;{num}</React.Fragment>
    ) : (
      <React.Fragment>{num}</React.Fragment>
    );
  };
}
