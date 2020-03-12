import * as React from "react";
import { Launcher } from "./components/Launcher";
import { css } from "emotion";

const styles = {
  LauncherContainer: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    border-radius: 5px;
    background-image: linear-gradient(45deg, #fa709a 0%, #fee140 100%);
  `
};

export const Root = () => {
  return (
    <section className={styles.LauncherContainer}>
      <Launcher />
    </section>
  );
};
