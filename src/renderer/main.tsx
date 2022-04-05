import React from "react";
import ReactDOM from "react-dom";
import { IndexPage } from "./pages/IndexPage";
import { mainWindow } from "./styles/MainWindow.css";
import "./styles/global.css";

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
