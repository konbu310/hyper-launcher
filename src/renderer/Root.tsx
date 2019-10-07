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
  `
};

export const Root = () => {
  return (
    <>
      <section className={styles.LauncherContainer}>
        <Launcher />
      </section>
    </>
  );
};
