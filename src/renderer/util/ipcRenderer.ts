import { HotKeyMap } from "../../share/interface";
import { OpenDialogReturnValue, IpcRenderer } from "electron";
const ipcRenderer: IpcRenderer = window.require("electron").ipcRenderer;

export const invokeGetHotKeyMap = async (): Promise<HotKeyMap> => {
  console.log(ipcRenderer);
  return await ipcRenderer.invoke("getHotKeyMap");
};

export const invokeSetHotKeyMap = async (data: HotKeyMap): Promise<boolean> => {
  return await ipcRenderer.invoke("setHotKeyMap", data);
};

export const invokeGetAppIcon = async (appPath: string): Promise<string> => {
  return await ipcRenderer.invoke("getAppIcon", appPath);
};

export const invokeGetFrontmostApp = async (): Promise<string> => {
  return await ipcRenderer.invoke("getFrontmostApp");
};

export const invokeOpenFileDialog = async (): Promise<
  OpenDialogReturnValue
> => {
  return await ipcRenderer.invoke("openFileDialog");
};
