import React from "react";
import ReactDOM from "react-dom";
import { MainWindow } from "./MainWindow";
import { GlobalStyle } from "./globalStyle";
import { setup } from "goober";

setup(React.cloneElement);

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <MainWindow />
  </React.StrictMode>,
  document.getElementById("root")
);
