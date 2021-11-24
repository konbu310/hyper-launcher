import React from "react";
import ReactDOM from "react-dom";
import { GlobalStyle } from "./globalStyle";
import { setup, css } from "goober";
import { IndexPage } from "./pages/IndexPage";

setup(React.cloneElement);

const styles = {
  MainWindow: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    border-radius: 5px;
    background-image: linear-gradient(45deg, #fa709a 0%, #fee140 100%);
  `,
};

const MainWindow = () => {
  return (
    <div className={styles.MainWindow}>
      <IndexPage />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <MainWindow />
  </React.StrictMode>,
  document.getElementById("root")
);
