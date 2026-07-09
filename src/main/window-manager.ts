import path from "path";
import { BrowserWindow } from "electron";

export const createMainWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 950,
    resizable: false,
    titleBarStyle: "default",
    webPreferences: {
      preload: path.join(import.meta.dirname, "preload.js"),
    },
  });

  if (process.env.NODE_ENV === "production") {
    mainWindow
      .loadFile(path.join(import.meta.dirname, "../index.html"))
      .catch((e) => console.error(e));
  } else {
    mainWindow.loadURL("http://localhost:3000").catch((e) => console.error(e));
  }

  return mainWindow;
};
