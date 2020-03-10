import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";

class WeightedFlattening extends React.Component<ReduxProps> {
  render() {
    return null;
  }
}

const mapProps = (rootState: RootState) => ({});

const mapDispatch = {};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(WeightedFlattening);
