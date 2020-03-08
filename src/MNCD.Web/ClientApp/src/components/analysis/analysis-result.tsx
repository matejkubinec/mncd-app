import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store";
import { AnalysisResultItem } from "./index";
import { Stack } from "office-ui-fabric-react";
import { addVisualizations } from "../../slices/AnalysisSlice";

class AnalysisResult extends React.Component<ReduxProps> {
  renderAnalyses = () => {
    return this.props.items.map((item, i) => (
      <Stack.Item key={i} grow={1}>
        <AnalysisResultItem analysis={item} />
      </Stack.Item>
    ));
  };

  componentDidUpdate() {
    // console.log("moun", this.props.items);
    // this.props.items.forEach(analysis => {
    //   if (!analysis.visualization && !this.props.visualizing[analysis.id]) {
    //     this.props.addVisualizations(analysis);
    //   }
    // });
  }

  render() {
    return (
      <Stack
        horizontal
        horizontalAlign="space-evenly"
        tokens={{ childrenGap: 20, padding: 20 }}
      >
        {this.renderAnalyses()}
      </Stack>
    );
  }
}

const mapProps = (rootState: RootState) => {
  const { session, visualizing } = rootState.analysis;
  return {
    items: session ? session.analyses : [],
    visualizing: visualizing
  };
};

const mapDispatch = { addVisualizations };

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AnalysisResult);
