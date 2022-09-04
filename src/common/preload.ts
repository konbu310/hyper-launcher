import { contextBridge, ipcRenderer, OpenDialogReturnValue } from "electron";
import { HotKeyMap } from "./interface";

console.log("__PRELOAD__");

const ipcEvents = {
  getAppIcon: async (appPath: string): Promise<string> => {
    return await ipcRenderer.invoke("getAppIcon", appPath);
  },
  getHotKeyMap: async (): Promise<HotKeyMap | undefined> => {
    return await ipcRenderer.invoke("getHotKeyMap");
  },
  setHotKeyMap: async (data: HotKeyMap): Promise<boolean> => {
    return await ipcRenderer.invoke("setHotKeyMap", data);
  },
  openFileDialog: async (): Promise<OpenDialogReturnValue> => {
    return await ipcRenderer.invoke("openFileDialog");
  },
};

declare global {
  interface Window {
    electron: typeof ipcEvents;
  }
}

contextBridge.exposeInMainWorld("electron", ipcEvents);
