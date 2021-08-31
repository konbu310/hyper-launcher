import EStore from "electron-store";
import { StoreKey } from "../common/interface";
import { emptyData } from "../common/initial-data";
import { registerHotKey } from "./hotKeyHandler";

export const createStore = (): EStore<StoreKey> => {
  const store = new EStore<StoreKey>({ defaults: { hotKeyMap: emptyData } });

  store.onDidChange("hotKeyMap", async (newData, _) => {
    newData && (await registerHotKey(newData));
  });

  return store;
};
