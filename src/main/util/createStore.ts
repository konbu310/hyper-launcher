import Store from "electron-store";
import { StoreKey } from "../../share/interface";
import { emptyData } from "../../share/initial-data";
import { registerHotKey } from "../hotKeyHandler";

export const createStore = (): Store<StoreKey> => {
  const store = new Store<StoreKey>({ defaults: { shortcut: emptyData } });
  global.store = store;

  store.onDidChange("shortcut", async (newData, _) => {
    newData && (await registerHotKey(newData));
  });

  return store;
};
