import React, { Component } from "react";
import { Route, Switch, Router } from "react-router";
import { SessionList } from "./components/sessions";
import { AnalysisPage, AnalysisDetail } from "./components/analysis/index";
import { FormatsPage } from "./components/pages";
import { DataSetDetail } from "./components/dataset";
import { BrowserRouter } from "react-router-dom";
import { history } from "./store";

export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <BrowserRouter>
          <Switch>
            <Route path="/session/:id" component={AnalysisPage} />
            <Route path="/formats" component={FormatsPage} />
            <Route path="/dataset/:id" component={DataSetDetail} />
            <Route path="/analysis/:id" component={AnalysisDetail} />
            <Route exact path="/" component={SessionList} />
          </Switch>
        </BrowserRouter>
      </Router>
    );
  }
}
