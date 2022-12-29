import { BrowserWindow } from "electron";
import path from "path";

export const createMainWindow = (): BrowserWindow => {
  const mainWindow = new BrowserWindow({
    width: 960,
    height: 950,
    resizable: false,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (process.env.NODE_ENV === "production") {
    mainWindow
      .loadFile(path.join(__dirname, "../index.html"))
      .catch((e) => console.error(e));
  } else {
    mainWindow.loadURL("http://localhost:3000").catch((e) => console.error(e));
  }

  return mainWindow;
};
