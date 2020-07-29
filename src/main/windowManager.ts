import { BrowserWindow } from "electron";
import { join as joinPath } from "path";

// ______________________________________________________
//
// @ CONSTANTS
//
const isProduction = process.env.NODE_ENV === "production";

// ______________________________________________________
//
// @ Create Main Window
//
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
    },
  });

  !isProduction && mainWindow.webContents.openDevTools();

  mainWindow
    .loadFile(joinPath(__dirname, "index.html"))
    .catch((e) => console.error(e));

  return mainWindow;
};
