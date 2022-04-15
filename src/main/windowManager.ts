import { BrowserWindow } from "electron";
import electronReload from "electron-reload";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const createMainWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 950,
    // frame: false,
    // transparent: true,
    resizable: false,
    // titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!isProduction) {
    mainWindow.webContents.openDevTools();
    electronReload(__dirname, {
      electron: path.join(__dirname, "node_modules", ".bin", "electron"),
      hardResetMethod: "exit",
    });
  }

  mainWindow
    .loadFile(path.join(__dirname, "index.html"))
    .catch((e) => console.error(e));

  return mainWindow;
};
