import { VFC, StrictMode } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { IconProvider } from "./components/Icon";
import { MainWindow } from "./MainWindow";
import "./styels/global";

const Root: VFC = () => {
  return (
    <StrictMode>
      <IconProvider />
      <MainWindow />
    </StrictMode>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
