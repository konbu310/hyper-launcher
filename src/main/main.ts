import { app, BrowserWindow } from "electron";
import EStore from "electron-store";
import path from "path";
import { StoreKey } from "../common/interface";
import { registerHotKey } from "./hotKeyHandler";
import { initializeIpcEvents, releaseIpcEvents } from "./ipcMain";
import { createStore } from "./store";
import { createMainWindow } from "./windowManager";

if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electron: path.resolve(__dirname, "../../node_modules/.bin/electron"),
  });
}

export let store: EStore<StoreKey> | null = null;

export let mainWindow: BrowserWindow | null = null;

app.setName("Hyper Launcher");

app.on("ready", async () => {
  store = createStore();
  await registerHotKey(store.get("hotKeyMap"));
  mainWindow = createMainWindow();
  initializeIpcEvents();

  mainWindow.on("close", () => {
    mainWindow = null;
  });
});

app.on("activate", () => {
  if (mainWindow) {
    app.show();
  } else {
    createMainWindow();
  }
});

app.on("quit", () => {
  app.quit();
});

app.on("window-all-closed", () => {
  releaseIpcEvents();
  if (process.platform !== "darwin") app.quit();
});
