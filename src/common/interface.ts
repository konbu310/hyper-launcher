export type AppInfo = {
  name: string;
  path: string;
  icon?: string;
  disabled?: boolean;
};

export type HotkeyMap = Record<string, Array<AppInfo>>;

export type StoreKey = {
  hotKeyMap: HotkeyMap;
};

export const ipcKeys = [
  "getAppIcon",
  "openFileDialog",
  "getHotkeyMap",
  "setHotkeyMap",
] as const;

export type IpcKey = (typeof ipcKeys)[number];
