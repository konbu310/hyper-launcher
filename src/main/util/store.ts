import Store from "electron-store";
import { StoreKey } from "../../common/interface";
import { emptyData } from "../../common/initial-data";

export const createStore = (): Store<StoreKey> => {
  const store = new Store<StoreKey>({ defaults: { hotKeyMap: emptyData } });

  // store.onDidChange("hotKeyMap", async (newData, _) => {
  //   newData && (await registerHotKey(newData));
  // });

  return store;
};
