import React, { PropsWithChildren } from "react";
import { AppInfo } from "../../common/interface";
import { pathToName } from "../../common/util";
import { DragEventHandler, useCallback, FC, ReactNode } from "react";
import { DroppableProvided } from "react-beautiful-dnd";
import { box, addButton, boxHeader } from "../styles/Box.css";
import "css.gg/icons/css/add.css";

const { getAppIcon, openFileDialog } = window.electron!;

type BoxProps = {
  boxId: string;
  header: string | ReactNode;
  updateHotKeyMap: Function;
  provided?: DroppableProvided;
};

export const Box: FC<PropsWithChildren<BoxProps>> = (props) => {
  const handleAppDrop: DragEventHandler = useCallback(
    async (ev) => {
      ev.preventDefault();
      if (ev.dataTransfer.effectAllowed === "move") return;
      const file = ev.dataTransfer.files[0];
      const appName = file.name.slice(0, -4);
      const appIcon = await getAppIcon(file.path);
      const appData: AppInfo = {
        name: appName,
        path: file.path,
        icon: appIcon,
      };
      props.updateHotKeyMap(appData);
    },
    [getAppIcon],
  );

  const handleOpenFileDialog = useCallback(async () => {
    const fileNames = await openFileDialog();
    const appPath = fileNames.filePaths[0];
    if (typeof appPath !== "string") {
      return;
    }
    const appName = pathToName(appPath);
    const appIcon = await getAppIcon(appPath);
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
  }, [openFileDialog, pathToName, getAppIcon, props.updateHotKeyMap]);

  return (
    <div
      className={box}
      onDrop={handleAppDrop}
      {...props.provided?.droppableProps}
    >
      <header className={boxHeader}>
        {props.header}
        <i onClick={handleOpenFileDialog} className={`gg-add ${addButton}`} />
      </header>
      {props.children}
    </div>
  );
};
