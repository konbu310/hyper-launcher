import React from "react";
import ReactDOM from "react-dom";
import { MainWindow } from "./MainWindow";
import { setup } from "goober";
import "./styels/global";

setup(React.createElement);

ReactDOM.render(
  <React.StrictMode>
    <MainWindow />
  </React.StrictMode>,
  document.getElementById("root")
);
