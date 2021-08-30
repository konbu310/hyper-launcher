import { app, BrowserWindow } from "electron";
import EStore from "electron-store";
import { StoreKey } from "../common/interface";
import { createMainWindow } from "./windowManager";
import { registerHotKey } from "./hotKeyHandler";
import { createStore } from "./util/store";
import { initializeIpcEvents, releaseIpcEvents } from "./ipcMain";

export let store: EStore<StoreKey> | null = null;

export let mainWindow: BrowserWindow | null = null;

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
