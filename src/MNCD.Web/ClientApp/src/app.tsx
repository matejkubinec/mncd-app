import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { SessionList } from "./components/sessions";
import { AnalysisPage } from "./components/analysis/index";
import { FormatsPage } from "./components/pages";
import { NotificationsContainer } from "./components/common";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={SessionList} />
          <Route path="/session/:guid" component={AnalysisPage} />
          <Route path="/formats" component={FormatsPage} />
        </Switch>
        <NotificationsContainer />
      </React.Fragment>
    );
  }
}
