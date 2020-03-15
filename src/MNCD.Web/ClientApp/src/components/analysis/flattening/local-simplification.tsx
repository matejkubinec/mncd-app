import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Stack, TextField, DefaultButton, Separator, ScrollablePane, Text, Toggle } from "office-ui-fabric-react";
import { RootState } from "../../../store";
import { updateFlatteningParameters } from "../../../slices/analysis-slice";

interface IState {
  relevanceAll: string;
}

class LocalSimplification extends React.Component<ReduxProps, IState> {

  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      relevanceAll: "1.0"
    }
  }

  handleApplyRelevanceAll = () => {
    const rel = this.props.relevances.map(() => Number(this.state.relevanceAll));
    this.props.updateFlatteningParameters({ relevances: JSON.stringify(rel) });
  }

  handleRelevanceAllChange = (_: any, value?: string) => {
    if (value === undefined) return;

    this.setState({ relevanceAll: value })
  }

  handleRelevanceChange = (i: number, value?: string) => {
    if (value === undefined) return;

    const relevance = Number(value);

    if (relevance <= 1 && relevance >= 0) {
      const rel = this.props.relevances;
      rel[i] = relevance;
      this.props.updateFlatteningParameters({ relevances: JSON.stringify(rel) });
    }
  }

  handleTresholdChange = (_: any, value?: string) => {
    if (value === undefined) return;

    const treshold = Number(value);
    if (0.0 <= treshold && treshold <= 1.0) {
      this.props.updateFlatteningParameters({ treshold: value.replace(",", ".") });
    }
  }

  handleWeightEdgesChange = (_: any, checked?: boolean) => {
    if (checked === undefined) return;

    this.props.updateFlatteningParameters({ weightEdges: String(checked) });
  }

  renderRows = () => {
    return this.props.relevances.map((rel, i) => {
      const over = this.props.theme.palette.green;
      const under = this.props.theme.palette.red;
      const borderBottomColor = Number(rel) >= Number(this.props.treshold) ? over : under;
      const onChange = (_: any, v: string | undefined) => this.handleRelevanceChange(i, v);

      return (<Stack.Item key={i}>
        <TextField
          styles={{ fieldGroup: { borderBottomColor, borderBottomWidth: 2 } }}
          label={this.props.names[i]}
          type="number"
          step="0.01"
          value={rel.toString()}
          onChange={onChange}
        />
      </Stack.Item>)
    });
  };

  render() {
    return (
      <Stack horizontal horizontalAlign="space-evenly" tokens={{ childrenGap: 5 }}>
        <Stack>
          <Stack.Item>
            <TextField
              styles={{ fieldGroup: { width: 250 } }}
              label="Threshold"
              type="number"
              step="0.01"
              value={String(this.props.treshold)}
              onChange={this.handleTresholdChange}
            />
          </Stack.Item>
          <Stack.Item>
            <Toggle
              label="Weight Edges"
              checked={this.props.weightEdges}
              onChange={this.handleWeightEdgesChange}
            />
          </Stack.Item>
        </Stack>
        <Stack tokens={{ childrenGap: 5 }}>
          <Stack.Item>
            <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 5 }}>
              <Stack.Item grow={2}>
                <TextField
                  label="Relevance All Layers"
                  type="number"
                  step="0.01"
                  onChange={this.handleRelevanceAllChange}
                  value={this.state.relevanceAll}
                />
              </Stack.Item>
              <Stack.Item grow={1}>
                <DefaultButton onClick={this.handleApplyRelevanceAll}>
                  Apply
              </DefaultButton>
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <label style={{ fontWeight: 600 }}>Layer Relevances</label>
          </Stack.Item>
          <Stack.Item>
            <div style={{ width: "100%", height: 200, paddingBottom: 10, position: "relative" }}>
              <ScrollablePane>
                <Stack>{this.renderRows()}</Stack>
              </ScrollablePane>
            </div>
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }
}

const mapProps = (state: RootState) => {
  const { dataSet, request } = state.analysis;
  const { treshold, relevances, weightEdges } = request.flatteningAlgorithmParameters;
  return {
    theme: state.theme.current,
    treshold: treshold,
    weightEdges: weightEdges === "true",
    names: dataSet ? dataSet.layerNames : [],
    relevances: JSON.parse(relevances) as number[]
  }
};

const mapDispatch = { updateFlatteningParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LocalSimplification);
