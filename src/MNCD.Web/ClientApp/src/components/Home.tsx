import React from "react";
import DataSetList from "./DataSetList";
import DataSetAdd from "./DataSetAdd";
import SessionList from "./SessionList";
import AnalysisPage from "./AnalysisPage";

export default class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AnalysisPage />
        <SessionList />
        <DataSetList />
        <DataSetAdd />
      </React.Fragment>
    );
  }
}
