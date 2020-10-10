import { app, BrowserWindow } from "electron";
import { createMainWindow } from "./windowManager";
import { registerHotKey } from "./hotKeyHandler";
import { createStore } from "./util/store";
import { initializeIpcEvents, releaseIpcEvents } from "./ipcMain";

export let mainWindow: BrowserWindow | null = null;
app.allowRendererProcessReuse = true;

app.on("ready", async () => {
  const store = createStore();
  global.store = store;
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
