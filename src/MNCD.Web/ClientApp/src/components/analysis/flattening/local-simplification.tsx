import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Stack, TextField, DefaultButton, Separator, ScrollablePane } from "office-ui-fabric-react";
import { RootState } from "../../../store";
import { updateAnalysisParameters } from "../../../slices/AnalysisSlice";
import { LocalSimplificationRelevances } from ".";

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
    const rel = this.props.relevances.map(() => this.state.relevanceAll);
    this.props.updateAnalysisParameters({ relevances: JSON.stringify(rel) });
  }

  handleRelevanceAllChange = (_: any, value?: string) => {
    if (value) {
      this.setState({ relevanceAll: value })
    }
  }

  handleRelevanceChange = (i: number, value?: string) => {
    if (value) {
      const rel = this.props.relevances;
      rel[i] = value;
      this.props.updateAnalysisParameters({ relevances: JSON.stringify(rel) });
    }
  }

  handleTresholdChange = (_: any, value?: string) => {
    if (value === undefined) return;

    const treshold = Number(value);
    if (0.0 <= treshold && treshold <= 1.0) {
      this.props.updateAnalysisParameters({ treshold });
    }
  }

  renderRows = () => {
    // TODO: add layer names
    return this.props.relevances.map((rel, i) => (
      <Stack.Item key={i}>
        <TextField
          label={`Layer ${i}`}
          type="number"
          value={rel}
          onChange={(_, v) => this.handleRelevanceChange(i, v)}
        />
      </Stack.Item>
    ));
  };

  render() {
    return (
      <Stack>
        <Stack.Item>
          <TextField
            styles={{ fieldGroup: { width: 250 } }}
            label="Threshold"
            type="number"
            value={String(this.props.treshold)}
            onChange={this.handleTresholdChange}
          />
        </Stack.Item>
        <Stack.Item>
          <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 5 }}>
            <Stack.Item grow={2}>
              <TextField
                label="Relevance All Layers"
                type="number"
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
          <Separator />
          <div style={{ width: "100%", height: 200, paddingTop: 30, position: "relative" }}>
            <ScrollablePane>
              <Stack>{this.renderRows()}</Stack>
            </ScrollablePane>
          </div>
        </Stack.Item>
        <LocalSimplificationRelevances />
      </Stack>
    );
  }
}

const mapProps = (state: RootState) => {
  const params = state.analysis.request.flatteningAlgorithmParameters
  const { treshold, relevances } = params;
  return {
    treshold: treshold,
    relevances: JSON.parse(relevances) as string[]
  }
};

const mapDispatch = { updateAnalysisParameters };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LocalSimplification);
