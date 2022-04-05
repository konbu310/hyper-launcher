import React from "react";
import { AppInfo } from "../../common/interface";
import { invokeGetAppIcon, invokeOpenFileDialog } from "../ipcRenderer";
import { pathToName } from "../../common/util";
import { DragEventHandler, useCallback, FC, ReactNode } from "react";
import { DroppableProvided } from "react-beautiful-dnd";
import { box, addButton, boxHeader } from "../styles/Box.css";

type BoxProps = {
  boxId: string;
  header: string | ReactNode;
  updateHotKeyMap: Function;
  provided?: DroppableProvided;
};

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
    <div
      className={box}
      onDrop={handleAppDrop}
      {...props.provided?.droppableProps}
    >
      <header className={boxHeader}>
        {props.header}
        <button className={addButton} onClick={handleOpenFileDialog}>
          +
        </button>
      </header>
      {props.children}
    </div>
  );
};
