import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import { Provider } from "react-redux/es/exports";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);