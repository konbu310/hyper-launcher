import { BrowserWindow } from "electron";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const createMainWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 950,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  !isProduction && mainWindow.webContents.openDevTools();

  mainWindow
    .loadFile(path.join(__dirname, "index.html"))
    .catch((e) => console.error(e));

  return mainWindow;
};
