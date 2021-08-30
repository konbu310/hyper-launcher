import {
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  OpenDialogReturnValue,
} from "electron";
import { mainWindow, store } from "./main";
import { HotKeyMap, IpcKey, ipcKeys } from "../common/interface";
import { getAppIcon, getFrontmostApp } from "./util/application";

const ipcEvents: {
  [key in IpcKey]: (ev: IpcMainInvokeEvent, ...args: any) => Promise<any>;
} = {
  getAppIcon,
  getFrontmostApp,
  openFileDialog: async (
    ev: IpcMainInvokeEvent
  ): Promise<OpenDialogReturnValue> => {
    if (!mainWindow) throw new Error("Window not found.");
    return await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      title: "登録するアプリケーションを選択",
      defaultPath: "/Applications",
      filters: [{ name: "application file", extensions: ["app"] }],
    });
  },
  getHotKeyMap: async (
    ev: IpcMainInvokeEvent
  ): Promise<HotKeyMap | undefined> => {
    return store?.get("hotKeyMap");
  },
  setHotKeyMap: async (
    ev: IpcMainInvokeEvent,
    data: HotKeyMap
  ): Promise<boolean> => {
    store?.set("hotKeyMap", data);
    return true;
  },
};

let initialized = false;

export const initializeIpcEvents = () => {
  if (initialized) return;
  initialized = true;

  ipcKeys.map((key) => {
    ipcMain.handle(key, ipcEvents[key]);
  });
};

export const releaseIpcEvents = () => {
  if (initialized) {
    ipcKeys.map((key) => {
      ipcMain.removeAllListeners(key);
    });
  }

  initialized = false;
};
