import * as React from "react";
import { css } from "goober";
import { AppInfo } from "../../common/interface";
import { invokeGetAppIcon, invokeOpenFileDialog } from "../ipcRenderer";
import { pathToName } from "../../common/util";
import { DragEventHandler, useCallback, FC, ReactNode } from "react";

// ______________________________________________________
//
// @ Types
//
type BoxProps = {
  boxId: string;
  header: string | ReactNode;
  updateHotKeyMap: Function;
};

// ______________________________________________________
//
// @ Styles
//
const styles = {
  Box: css`
    margin: 10px;
    padding: 5px;
    width: 280px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 2px #808080;
    border: 1px solid #fff;
    display: flex;
    flex-direction: column;
    -webkit-app-region: no-drag;
  `,
  BoxHeader: css`
    margin: 10px 20px;
    font-weight: bold;
  `,
  AddButton: css`
    float: right;
  `,
};

// ______________________________________________________
//
// @ View
//
export const Box: FC<BoxProps> = (props) => {
  const handleAppDrop: DragEventHandler = useCallback(
    async (ev) => {
      ev.preventDefault();
      if (ev.dataTransfer.effectAllowed === "move") return;
      const file = ev.dataTransfer.files[0];
      const appName = file.name.slice(0, -4);
      const appIcon = await invokeGetAppIcon(file.path);
      const appData: AppInfo = {
        name: appName,
        path: file.path,
        icon: appIcon,
      };
      props.updateHotKeyMap(appData);
    },
    [invokeGetAppIcon]
  );

  const handleOpenFileDialog = useCallback(async () => {
    const fileNames = await invokeOpenFileDialog();
    const appPath = fileNames.filePaths[0];
    const appName = pathToName(appPath);
    const appIcon = await invokeGetAppIcon(appPath);
    if (appName) {
      const appData: AppInfo = {
        name: appName,
        path: appPath,
        icon: appIcon,
      };
      props.updateHotKeyMap(appData);
    } else {
      return;
    }
  }, [
    invokeOpenFileDialog,
    pathToName,
    invokeGetAppIcon,
    props.updateHotKeyMap,
  ]);

  return (
    <div className={styles.Box} onDrop={handleAppDrop}>
      <header className={styles.BoxHeader}>
        {props.header}
        <button className={styles.AddButton} onClick={handleOpenFileDialog}>
          +
        </button>
      </header>
      {props.children}
    </div>
  );
};
