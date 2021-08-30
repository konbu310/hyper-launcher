export type AppInfo = {
  name: string;
  path: string;
  icon?: string;
};

export type HotKeyMap = {
  [key: string]: AppInfo[];
};

export type StoreKey = {
  hotKeyMap: HotKeyMap;
};

export const ipcKeys = [
  "getAppIcon",
  "getFrontmostApp",
  "openFileDialog",
  "getHotKeyMap",
  "setHotKeyMap",
] as const;

export type IpcKey = typeof ipcKeys[number];
