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
    border-radius: 5px;
    background-image: linear-gradient(45deg, #fa709a 0%, #fee140 100%);
  `,
};

export const MainWindow = () => {
  return (
    <div className={styles.MainWindow}>
      <IndexPage />
    </div>
  );
};
