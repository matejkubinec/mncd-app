import React, { Component } from "react";
import { Stack } from "office-ui-fabric-react";
import { AnalysisResultViewModel } from "../../../types";

interface IRow {
  name: string;
  value: string;
}

interface IProps {
  result: AnalysisResultViewModel;
}

// TODO: rename file
export default class Evaluation extends Component<IProps> {
  getRows(): IRow[] {
    const res = this.props.result;
    const rows = new Array<IRow>();

    if (res.coverage) {
      rows.push({ name: "Coverage", value: res.coverage.toFixed(2) });
    }

    if (res.performance) {
      rows.push({ name: "Performance", value: res.performance.toFixed(2) });
    }

    if (res.modularity) {
      rows.push({ name: "Modularity", value: res.modularity.toFixed(2) });
    }

    return rows;
  }

  renderRows(rows: IRow[]) {
    return rows.map((r, i) => (
      <Stack horizontal horizontalAlign="center" key={i}>
        <Stack.Item styles={{ root: { width: "50%" } }}>
          <span style={{ fontWeight: 600 }}>{r.name}</span>
        </Stack.Item>
        <Stack.Item styles={{ root: { width: "50%" } }}>
          {r.value}
        </Stack.Item>
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
