import * as React from "react";
import { css } from "emotion";
import { AppInfo } from "../util/initial-data";

// ______________________________________________________
//
// @ Types
//
type BoxProps = {
  boxId: string;
  header: string | React.ReactNode;
  updateShortcutData: Function;
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
  const handleDrop = (ev: React.DragEvent<HTMLElement>) => {
    ev.preventDefault();
    if (ev.dataTransfer.effectAllowed === "move") return;
    const file = ev.dataTransfer.files[0];
    const fileName = file.name.slice(0, -4);
    const appData: AppInfo = {
      name: fileName,
      path: file.path,
      icon: ""
    };
    props.updateShortcutData(appData);
  };

  return (
    <div className={styles.Box} onDrop={ev => handleDrop(ev)}>
      <header className={styles.BoxHeader}>{props.header}</header>
      {props.children}
    </div>
  );
};
