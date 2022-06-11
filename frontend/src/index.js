import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
  positions: positions.MIDDLE,
  timeout: 5000,
  transitions: transitions.SCALE,
};
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);
