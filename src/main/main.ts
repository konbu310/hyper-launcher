import { app, BrowserWindow } from "electron";
import EStore from "electron-store";
import { StoreKey } from "../common/interface";
import { registerHotkey } from "./hotkey-handler";
import { initializeIpcEvents, releaseIpcEvents } from "./ipc-main";
import { createStore } from "./store";
import { createMainWindow } from "./window-manager";

export let store: EStore<StoreKey> | null = null;

export let mainWindow: BrowserWindow | null = null;

app.setName("Hyper Launcher");

app.on("ready", async () => {
  store = createStore();
  await registerHotkey(store.get("hotKeyMap"));
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
