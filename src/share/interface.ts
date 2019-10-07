export type App = {
  name: string;
  path: string;
  icon: string;
};

export type Shortcut = {
  [key: string]: App[];
};

export type StoreKey = {
  shortcut: Shortcut;
};
