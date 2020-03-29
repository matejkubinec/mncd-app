import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store";

class ABACUS extends React.Component<ReduxProps> {
  render() {
    return "ABACUS";
  }
}

const mapProps = (state: RootState) => ({});

const mapDispatch = {};

const connector = connect(mapProps, mapDispatch);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ABACUS);
