import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/customize-progress-bar.css";
import store from "./app/store";
import { Provider } from "react-redux";
import { App } from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
