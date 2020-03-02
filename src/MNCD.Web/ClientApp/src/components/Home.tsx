import React from "react";
import { SessionList } from "./session-list";
import DataSetList from "./DataSetList";
import DataSetAdd from "./DataSetAdd";
import AnalysisPage from "./AnalysisPage";

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* <AnalysisPage /> */}
        <SessionList />
        {/* <DataSetList /> */}
        {/* <DataSetAdd /> */} */}
      </React.Fragment>
    );
  }
}
