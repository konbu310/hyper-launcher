export type AppInfo = {
  bundleId: string;
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
  "getFrontmostAppId",
  "openFileDialog",
  "getHotKeyMap",
  "setHotKeyMap",
  "getBundleId",
] as const;

export type IpcKey = typeof ipcKeys[number];
