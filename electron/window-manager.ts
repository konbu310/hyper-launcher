import { BrowserWindow } from "electron";
import * as path from "path";

export const createMainWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 950,
    resizable: false,
    titleBarStyle: "default",
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join("dist/index.html"));
  }

  return mainWindow;
};
