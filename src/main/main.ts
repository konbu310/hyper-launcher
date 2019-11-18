import { app, BrowserWindow } from "electron";
import { createMainWindow } from "./windowManager";
import { registerShortcut } from "./shortcutOps";
import { createStore } from "./util/createStore";
import { getAppIcon } from "./util/getAppIcon";

let mainWindow: BrowserWindow | null = null;

// ______________________________________________________
//
// @ Ready
//
app.on("ready", async () => {
  const store = createStore();
  await registerShortcut(store.get("shortcut"));
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
