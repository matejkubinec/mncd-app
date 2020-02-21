import React, { Component } from "react";
import { Route, Switch } from "react-router";

import "./custom.css";
import DataSetList from "./components/DataSetList";
import DataSetAdd from "./components/DataSetAdd";
import SessionList from "./components/SessionList";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <div>
        <SessionList />
        <DataSetList />
        <DataSetAdd />
      </div>
    );
  }
}
