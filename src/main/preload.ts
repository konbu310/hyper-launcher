import { contextBridge, ipcRenderer } from "electron";
import { IpcMainEvents } from "./ipcMain";

type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

type FromMain<K extends keyof IpcMainEvents> = (
  ...args: Tail<Parameters<IpcMainEvents[K]>>
) => ReturnType<IpcMainEvents[K]>;

const getAppIcon: FromMain<"getAppIcon"> = async (appPath) => {
  return await ipcRenderer.invoke("getAppIcon", appPath);
};

const getHotKeyMap: FromMain<"getHotKeyMap"> = async () => {
  return await ipcRenderer.invoke("getHotKeyMap");
};

const setHotKeyMap: FromMain<"setHotKeyMap"> = async (data) => {
  return await ipcRenderer.invoke("setHotKeyMap", data);
};

const openFileDialog: FromMain<"openFileDialog"> = async () => {
  return await ipcRenderer.invoke("openFileDialog");
};

const ipcRendererEvents = {
  getAppIcon,
  getHotKeyMap,
  setHotKeyMap,
  openFileDialog,
};

declare global {
  interface Window {
    api: typeof ipcRendererEvents;
  }
}

contextBridge.exposeInMainWorld("api", ipcRendererEvents);
