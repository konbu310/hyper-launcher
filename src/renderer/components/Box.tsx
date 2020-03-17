import * as React from "react";
import { css } from "emotion";
import { AppInfo } from "../../share/interface";
import { remote } from "electron";
import { path2name } from "../../main/util/appInfo";

const dialog = remote.dialog;

// ______________________________________________________
//
// @ Types
//
type BoxProps = {
  boxId: string;
  header: string | React.ReactNode;
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
  `
};

// ______________________________________________________
//
// @ Box View
//
export const Box: React.FC<BoxProps> = props => {
  const handleDrop = async (ev: React.DragEvent<HTMLElement>) => {
    ev.preventDefault();
    if (ev.dataTransfer.effectAllowed === "move") return;
    const file = ev.dataTransfer.files[0];
    const appName = file.name.slice(0, -4);
    const getAppIcon = remote.getGlobal("getAppIcon");
    const appIcon = await getAppIcon(file.path);
    const appData: AppInfo = {
      name: appName,
      path: file.path,
      icon: appIcon
    };
    props.updateHotKeyMap(appData);
  };

  const handleFileDialog = async () => {
    const fileNames = await dialog.showOpenDialog(remote.getCurrentWindow(), {
      properties: ["openFile"],
      title: "Select a Application",
      defaultPath: "/Applications",
      filters: [{ name: "application file", extensions: ["app"] }]
    });
    const appPath = fileNames.filePaths[0];
    const appName = path2name(appPath);
    const getAppIcon = remote.getGlobal("getAppIcon");
    const appIcon = await getAppIcon(appPath);
    if (appName) {
      const appData: AppInfo = {
        name: appName,
        path: appPath,
        icon: appIcon
      };
      props.updateHotKeyMap(appData);
    } else {
      return;
    }
  };

  return (
    <div className={styles.Box} onDrop={ev => handleDrop(ev)}>
      <header className={styles.BoxHeader}>
        {props.header}
        <button
          style={{ float: "right" }}
          onClick={async () => await handleFileDialog()}
        >
          +
        </button>
      </header>
      {props.children}
    </div>
  );
};
