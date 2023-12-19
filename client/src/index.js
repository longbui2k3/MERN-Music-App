import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./styles/customize-progress-bar.css";
import store from "./app/store";
import { Provider } from "react-redux";
import { App } from "./App";
import { AuthProvider } from "./context/AuthContext";
import { initialState } from "./context/initialState";
import reducer from "./context/reducer";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <AuthProvider initialState={initialState} reducer={reducer}>
      <App />
    </AuthProvider>
  </Provider>
);
