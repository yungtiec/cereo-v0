import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "normalize.css";
import "antd/dist/antd.css";
import "./launcher.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store-launcher";
import AppLauncher from "./AppLauncher";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <AppLauncher />
  </Provider>,
  document.getElementById("yuzu-launcher")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
