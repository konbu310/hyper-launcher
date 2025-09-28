import { contextBridge, ipcRenderer } from "electron";
import { IpcMainEvents } from "./ipc-main";

type Tail<T extends any[]> = T extends [any, ...infer Rest] ? Rest : never;

type FromMain<K extends keyof IpcMainEvents> = (
  ...args: Tail<Parameters<IpcMainEvents[K]>>
) => ReturnType<IpcMainEvents[K]>;

const getAppIcon: FromMain<"getAppIcon"> = async (appPath) => {
  return await ipcRenderer.invoke("getAppIcon", appPath);
};

const getHotkeyMap: FromMain<"getHotkeyMap"> = async () => {
  return await ipcRenderer.invoke("getHotkeyMap");
};

const setHotkeyMap: FromMain<"setHotkeyMap"> = async (data) => {
  return await ipcRenderer.invoke("setHotkeyMap", data);
};

const openFileDialog: FromMain<"openFileDialog"> = async () => {
  return await ipcRenderer.invoke("openFileDialog");
};

const ipcRendererEvents = {
  getAppIcon,
  getHotkeyMap,
  setHotkeyMap,
  openFileDialog,
};

declare global {
  interface Window {
    api: typeof ipcRendererEvents;
  }
}

contextBridge.exposeInMainWorld("api", ipcRendererEvents);
