import { Fabric, initializeIcons } from "office-ui-fabric-react";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import store, { history } from "./store";

initializeIcons();

const baseUrl = document
  .getElementsByTagName("base")[0]
  .getAttribute("href") as string;
const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fabric>
        <BrowserRouter basename={baseUrl}>
          <App />
        </BrowserRouter>
      </Fabric>
    </ConnectedRouter>
  </Provider>,
  rootElement
);
