import { app, BrowserWindow } from "electron";
import { createMainWindow } from "./windowManager";
import { registerHotKey } from "./hotKeyHandler";
import { createStore } from "./util/createStore";
import { getAppIcon } from "./util/appInfo";

let mainWindow: BrowserWindow | null = null;
app.allowRendererProcessReuse = true;

// ______________________________________________________
//
// @ Ready
//
app.on("ready", async () => {
  const store = createStore();
  await registerHotKey(store.get("hotKeyMap"));
  global.getAppIcon = getAppIcon;
  mainWindow = createMainWindow();

  mainWindow.on("close", () => {
    mainWindow = null;
  });
});

// ______________________________________________________
//
// @ Activate
//
app.on("activate", () => {
  if (mainWindow) {
    app.show();
  } else {
    createMainWindow();
  }
});

// ______________________________________________________
//
// @ Quit
//
app.on("quit", () => {
  app.quit();
});

// ______________________________________________________
//
// @ Closed
//
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
