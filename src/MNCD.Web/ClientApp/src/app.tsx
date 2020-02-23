import React, { Component } from "react";
import { Route, Switch } from "react-router";

import "./custom.css";
import Home from "./components/Home";

export default class App extends Component {
  static displayName = App.name;

  componentDidMount() {
    console.log("APP");
    fetch("/api/dataset")
      .then(response => response.json())
      .then(value => console.log(value));
  }

  render() {
    return (
      <Home />

      // <Switch>
      //   <Route exact path="/">
      //   </Route>
      // </Switch>
    );
  }
}
