import React, { Component } from "react";
import { Route, Switch } from "react-router";
import Home from "./components/Home";
import SessionList from "./components/SessionList";
import AnalysisPage from "./components/AnalysisPage";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Switch>
        <Route exact path="/" component={SessionList} />
        <Route path="/session/:guid" component={AnalysisPage} />
      </Switch >
    );
  }
}
