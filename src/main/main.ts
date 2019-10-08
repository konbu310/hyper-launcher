import { app } from "electron";
import { createMainWindow } from "./windowManager";
import { registerShortcut } from "./shortcutOps";
import { createStore } from "./util/createStore";
import { getAppIcon } from "./util/getAppIcon";

app.setName("Hyper Launcher");

// ______________________________________________________
//
// @ Ready
//
app.on("ready", async () => {
  const store = createStore();
  await registerShortcut(store.get("shortcut"));
  global.getAppIcon = getAppIcon;
  createMainWindow();
});

// ______________________________________________________
//
// @ Activate
//
app.on("activate", () => {
  createMainWindow();
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
