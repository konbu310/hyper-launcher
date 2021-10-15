import React from "react";
import ReactDOM from "react-dom";
import { IndexPage } from "./pages/IndexPage";
import { mainWindow } from "./styles/index.css";
import "./styles/global.css.ts";

const MainWindow = () => {
  return (
    <div className={mainWindow}>
      <IndexPage />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <MainWindow />
  </React.StrictMode>,
  document.getElementById("root")
);
