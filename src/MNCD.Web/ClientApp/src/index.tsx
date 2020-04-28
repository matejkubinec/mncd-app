import { Fabric, initializeIcons } from "office-ui-fabric-react";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { Provider } from "react-redux";
import store from "./store";

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
    <Fabric applyTheme theme={theme} style={{ backgroundColor }}>
      <App />
    </Fabric>
  </Provider>,
  rootElement
);
