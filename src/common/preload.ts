import { contextBridge, ipcRenderer } from "electron";
import { OpenDialogReturnValue } from "electron/main";
import { HotKeyMap, IpcKey } from "./interface";

const typedInvoke = async (key: IpcKey, ...args: any[]) => {
  return await ipcRenderer.invoke(key, ...args);
};

const getHotKeyMap = async (): Promise<HotKeyMap> => {
  return await typedInvoke("getHotKeyMap");
};

const setHotKeyMap = async (data: HotKeyMap): Promise<boolean> => {
  return await typedInvoke("setHotKeyMap", data);
};

const getAppIcon = async (appPath: string): Promise<string> => {
  return await typedInvoke("getAppIcon", appPath);
};

const openFileDialog = async (): Promise<OpenDialogReturnValue> => {
  return await typedInvoke("openFileDialog");
};

const globalApi = {
  getHotKeyMap,
  setHotKeyMap,
  getAppIcon,
  openFileDialog,
};

export type GlobalApi = typeof globalApi;

contextBridge.exposeInMainWorld("electron", globalApi);
