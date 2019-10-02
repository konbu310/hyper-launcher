import { app, globalShortcut, shell } from "electron";
import { createMainWindow } from "./windowManager";
import { initialData } from "../renderer/util/initial-data";
import { registerShortcut } from "./shortcutOps";

app.setName("nine-launcher");

// 準備完了
app.on("ready", async () => {
  await registerShortcut(initialData);
  createMainWindow();
});

// アプリをアクティブにした時
app.on("activate", () => {
  createMainWindow();
});

// アプリを終了した時
app.on("quit", () => {
  app.quit();
});

// 全てのウィンドウが閉じられた時
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
