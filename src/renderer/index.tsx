import * as React from "react";
import * as ReactDOM from "react-dom";
import { Launcher } from "./components/Launcher";
import { css } from "emotion";

import "./styels/global";

const styles = {
  LauncherContainer: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
  `
};

const App = () => {
  return (
    <>
      <section className={styles.LauncherContainer}>
        <Launcher />
      </section>
    </>
  );
};

const rootElement = document.getElementById("root");

// @ts-ignore
if (rootElement.hasChildNodes()) {
  ReactDOM.hydrate(<App />, rootElement);
} else {
  ReactDOM.render(<App />, rootElement);
}
