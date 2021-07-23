import * as React from "react";
import { IndexPage } from "./pages/IndexPage";
import { css } from "goober";

const styles = {
  MainWindow: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    border: 1px solid rgba(209, 213, 219, 0.3);
  `,
};

export const MainWindow = () => {
  return (
    <div className={styles.MainWindow}>
      <IndexPage />
    </div>
  );
};
