import {
  Fabric,
  initializeIcons,
  Customizations,
  loadTheme
} from "office-ui-fabric-react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from "./store";

import "./index.css";

initializeIcons();

const theme = store.getState().theme.current;
const backgroundColor = theme.palette.neutralLighterAlt;
const rootElement = document.getElementById("root");

if (rootElement) {
  rootElement.style.backgroundColor = backgroundColor;
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <Fabric applyTheme theme={theme} style={{ backgroundColor }}>
          <App />
        </Fabric>
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  rootElement
);
