import * as React from "react";
import { css } from "emotion";

// ______________________________________________________
//
// @ Types
//
type BoxProps = {
  boxId: string;
  header: string | React.ReactNode;
};

// ______________________________________________________
//
// @ Styles
//
const styles = {
  Box: css`
    margin: 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: #fff;
    border: 1px solid #fff;
    display: flex;
    flex-direction: column;
  `,
  BoxHeader: css`
    margin: 10px 20px;
    font-weight: bold;
  `
};

// ______________________________________________________
//
// @ Box View
//
export const Box: React.FC<BoxProps> = props => {
  return (
    <div className={styles.Box}>
      <header className={styles.BoxHeader}>{props.header}</header>
      {props.children}
    </div>
  );
};
