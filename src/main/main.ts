import { app, BrowserWindow, session } from "electron";
import { createStore } from "./util/store";
import { initializeIpcEvents, releaseIpcEvents } from "./ipcMain";
import os from "os";
import path from "path";
import { registerHotKey } from "./hotKeyHandler";

const isProduction = process.env.NODE_ENV === "production";

export let mainWindow: BrowserWindow | null = null;

const reactDevToolsPath = path.join(
  os.homedir(),
  "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.14.0_1"
);

const loadReactExtension = async () => {
  await session.defaultSession
    .loadExtension(reactDevToolsPath, {
      allowFileAccess: true,
    })
    .catch((err) => {
      console.error(err);
    });
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
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

  if (!isProduction) {
    mainWindow.webContents.openDevTools;
  }

  mainWindow
    .loadFile(path.join(__dirname, "index.html"))
    .catch((e) => console.error(e));
};

app.whenReady().then(async () => {
  const store = createStore();
  global.store = store;
  await registerHotKey(store.get("hotKeyMap"));
  createWindow();
  initializeIpcEvents();

  if (!isProduction) {
    loadReactExtension();
  }

  app.on("activate", () => {
    if (!mainWindow) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  releaseIpcEvents();
  if (process.platform !== "darwin") app.quit();
});
