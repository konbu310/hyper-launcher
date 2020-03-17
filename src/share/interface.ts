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
