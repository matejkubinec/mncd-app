import React, { Component } from "react";
import { SessionList } from "./components/sessions";
import { AnalysisPage, AnalysisDetail } from "./components/analysis/index";
import { FormatsPage } from "./components/pages";
import { DataSetDetail, DataSetPage } from "./components/dataset";
import { Router, Route, Switch, NavLink } from "react-router-dom";
import { history } from "./store";
import { Stack, getTheme } from "office-ui-fabric-react";
const theme = getTheme();

export default class App extends Component {
  render() {
    const { s1, m } = theme.spacing;
    const { fontSize } = theme.fonts.mediumPlus;

    return (
      <Router history={history}>
        <React.Fragment>
          <Stack
            horizontal
            tokens={{ padding: s1 }}
            style={{
              backgroundColor: theme.palette.themePrimary,
              color: theme.palette.white,
            }}
          >
            <Stack.Item>
              <h1>MNCD</h1>
            </Stack.Item>
            <Stack.Item>
              <Stack
                horizontal
                tokens={{ childrenGap: m }}
                style={{ paddingLeft: m }}
                verticalFill
                verticalAlign="center"
              >
                <NavLink
                  className="navlink"
                  activeClassName="navlink-active"
                  exact
                  to="/"
                >
                  <span style={{ fontSize }}>Sessions</span>
                </NavLink>
                <NavLink
                  className="navlink"
                  activeClassName="navlink-active"
                  exact
                  to="/datasets"
                >
                  <span style={{ fontSize }}>Datasets</span>
                </NavLink>
                <NavLink
                  className="navlink"
                  activeClassName="navlink-active"
                  exact
                  to="/formats"
                >
                  <span style={{ fontSize }}>Formats</span>
                </NavLink>
              </Stack>
            </Stack.Item>
          </Stack>
          <Switch>
            <Route path="/dataset/:id" component={DataSetDetail} />
            <Route path="/analysis/:id" component={AnalysisDetail} />
            <Route path="/session/:id" component={AnalysisPage} />
            <Route path="/datasets" component={DataSetPage} />
            <Route path="/formats" component={FormatsPage} />
            <Route exact path="/" component={SessionList} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}
