import {
  dialog,
  ipcMain,
  IpcMainInvokeEvent,
  OpenDialogReturnValue,
} from "electron";
import { execa } from "execa";
import path from "node:path";
import { emptyData } from "../common/initial-data";
import { HotKeyMap, IpcKey, ipcKeys } from "../common/interface";
import { mainWindow, store } from "./main";

const ipcMainEvents = {
  getAppIcon: async (
    _ev: IpcMainInvokeEvent,
    appPath: string
  ): Promise<string> => {
    const icon = await execa(path.resolve(__dirname, "GetAppIcon"), [appPath]);
    return icon.stdout.toString();
  },

  getHotKeyMap: async (_ev: IpcMainInvokeEvent): Promise<HotKeyMap> => {
    return store?.get("hotKeyMap") ?? emptyData;
  },

  setHotKeyMap: async (
    _ev: IpcMainInvokeEvent,
    data: HotKeyMap
  ): Promise<boolean> => {
    store?.set("hotKeyMap", data);
    return true;
  },

  openFileDialog: async (
    _ev: IpcMainInvokeEvent
  ): Promise<OpenDialogReturnValue> => {
    if (!mainWindow) throw new Error("Window not found.");
    return await dialog.showOpenDialog(mainWindow, {
      properties: ["openFile"],
      title: "登録するアプリケーションを選択",
      defaultPath: "/Applications",
      filters: [{ name: "application file", extensions: ["app"] }],
    });
  },
} satisfies Record<
  IpcKey,
  (ev: IpcMainInvokeEvent, ...arg: any[]) => Promise<any>
>;

export type IpcMainEvents = typeof ipcMainEvents;

let initialized = false;

export const initializeIpcEvents = () => {
  if (initialized) return;
  initialized = true;

  ipcKeys.map((key) => {
    ipcMain.handle(key, ipcMainEvents[key]);
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
