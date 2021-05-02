import { BrowserWindow } from "electron";
import path from "path";

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
      preload: path.join(__dirname, "preload.js"),
    },
  });

  !isProduction && mainWindow.webContents.openDevTools();

  mainWindow
    .loadFile(path.join(__dirname, "index.html"))
    .catch((e) => console.error(e));

  return mainWindow;
};
