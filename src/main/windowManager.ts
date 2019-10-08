import { BrowserWindow } from "electron";
import loadDevtool from "electron-load-devtool";
import * as path from "path";

// ______________________________________________________
//
// @ CONSTANTS
//
const isProduction = process.env.NODE_ENV === "production";

let mainWindow: BrowserWindow | null;

// ______________________________________________________
//
// @ Create Main Window
//
export const createMainWindow = (): void => {
  if (mainWindow) return;

  mainWindow = new BrowserWindow({
    width: 960,
    height: 950,
    frame: false,
    transparent: true,
    resizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true
    }
  });

  //Devtoolの読み込み
  loadDevtool(loadDevtool.REACT_DEVELOPER_TOOLS);
  !isProduction && mainWindow.webContents.openDevTools();

  mainWindow
    .loadFile(path.join(__dirname, "index.html"))
    .catch(e => console.error(e));

  mainWindow.on("close", () => {
    mainWindow = null;
  });
};
