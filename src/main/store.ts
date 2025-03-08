import EStore from "electron-store";
import { StoreKey } from "../common/interface";
import { emptyHotkeyMap } from "../common/initial-data";
import { registerHotkey } from "./hotkey-handler";

export const createStore = (): EStore<StoreKey> => {
  const store = new EStore<StoreKey>({
    defaults: { hotKeyMap: emptyHotkeyMap },
  });

  store.onDidChange("hotKeyMap", async (newData, _) => {
    newData && (await registerHotkey(newData));
  });

  return store;
};
