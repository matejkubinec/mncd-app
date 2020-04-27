import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { SessionList } from "./components/sessions";
import { AnalysisPage, AnalysisDetail } from "./components/analysis/index";
import { FormatsPage } from "./components/pages";
import { NotificationsContainer } from "./components/common";
import { DataSetDetail } from "./components/dataset";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={SessionList} />
          <Route path="/session/:guid" component={AnalysisPage} />
          <Route path="/formats" component={FormatsPage} />
          <Route path="/dataset/:id" component={DataSetDetail} />
          <Route path="/analysis/:id" component={AnalysisDetail} />
        </Switch>
        <NotificationsContainer />
      </React.Fragment>
    );
  }
}
