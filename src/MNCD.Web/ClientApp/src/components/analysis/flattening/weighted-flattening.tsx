import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";
import { Stack, TextField, DefaultButton } from "office-ui-fabric-react";
import { updateFlatteningParameters } from "../../../slices/analysis-slice";

interface IState {
  globalWeight: number;
}

class WeightedFlattening extends React.Component<ReduxProps, IState> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      globalWeight: 1.0,
    };
  }

  handleApplyGlobalWeight = () => {
    const weights = this.props.weights;

    for (let y = 0; y < weights.length; y++) {
      for (let x = 0; x < weights.length; x++) {
        weights[y][x] = this.state.globalWeight;
      }
    }

    this.props.updateFlatteningParameters({ weights: JSON.stringify(weights) });
  };

  handleGlobalWeightChange = (_: any, value?: string) => {
    if (value) {
      this.setState({ globalWeight: Number(value) });
    }
  };

  handleWeightChange = (value: string, y: number, x: number) => {
    const weight = Number(value);
    const weights = this.props.weights;
    weights[y][x] = weight;
    this.props.updateFlatteningParameters({ weights: JSON.stringify(weights) });
  };

  renderRow = (row: number[], y: number) => {
    const names = this.props.layerNames;
    const renderCell = (cell: number, x: number) => (
      <td key={x}>
        <TextField
          value={cell.toString()}
          type="number"
          step="0.01"
          onChange={(_, v) => this.handleWeightChange(v || "1", y, x)}
        />
      </td>
    );
    return (
      <tr key={y}>
        <th key={-1}>{names[y]}</th>
        {row.map(renderCell)}
      </tr>
    );
  };

  renderNames = () => {
    const names = ["", ...this.props.layerNames];
    const renderCell = (name: string, i: number) => <th key={i}>{name}</th>;
    return <tr>{names.map(renderCell)}</tr>;
  };

  renderWeights = () => {
    return (
      <table className="weights-table">
        <thead>{this.renderNames()}</thead>
        <tbody>{this.props.weights.map(this.renderRow)}</tbody>
      </table>
    );
  };

  render() {
    if (this.props.layerNames.length === 0) {
      return "Please select dataset first.";
    }

    return (
      <Stack>
        <Stack.Item>
          <Stack horizontal tokens={{ childrenGap: 5 }}>
            <Stack.Item align="end">
              <TextField
                label="Weight"
                type="number"
                value={this.state.globalWeight.toString()}
                onChange={this.handleGlobalWeightChange}
              />
            </Stack.Item>
            <Stack.Item align="end">
              <DefaultButton onClick={this.handleApplyGlobalWeight}>
                Apply to all
              </DefaultButton>
            </Stack.Item>
          </Stack>
        </Stack.Item>
        <Stack.Item>{this.renderWeights()}</Stack.Item>
      </Stack>
    );
  }
}

const mapProps = (state: RootState) => {
  const { dataSet } = state.analysis;
  const { flatteningAlgorithmParameters } = state.analysis.request;
  const { weights } = flatteningAlgorithmParameters;
  return {
    layerNames: dataSet ? dataSet.layerNames : [],
    weights: (weights ? JSON.parse(weights) : []) as number[][],
  };
};

const mapDispatch = { updateFlatteningParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(WeightedFlattening);
