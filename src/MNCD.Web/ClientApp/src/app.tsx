import React, { Component } from "react";
import { Route, Switch } from "react-router";

import "./custom.css";
import Home from "./components/Home";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    );
  }
}
