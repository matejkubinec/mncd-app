import React, { Component } from "react";
import { Route, Switch } from "react-router";
import { SessionList } from "./components/sessions";
import { AnalysisPage } from "./components/analysis/index";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Switch>
        <Route exact path="/" component={SessionList} />
        <Route path="/session/:guid" component={AnalysisPage} />
      </Switch>
    );
  }
}
