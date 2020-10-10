import { BrowserWindow } from "electron";
import * as path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const createMainWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 950,
    frame: false,
    transparent: true,
    resizable: false,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: false,
    },
  });

  !isProduction && mainWindow.webContents.openDevTools();

  mainWindow
    .loadFile(path.join(__dirname, "index.html"))
    .catch((e) => console.error(e));

  return mainWindow;
};
