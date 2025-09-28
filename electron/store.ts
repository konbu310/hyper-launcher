import EStore from "electron-store";
import { StoreKey } from "../src/common/interface";
import { emptyHotkeyMap } from "../src/common/initial-data";
import { registerHotkey } from "./hotkey-handler";

export const createStore = (): EStore<StoreKey> => {
  const store = new EStore<StoreKey>({
    defaults: { hotkeyMap: emptyHotkeyMap },
  });

  store.onDidChange("hotkeyMap", async (newData, _) => {
    newData && (await registerHotkey(newData));
  });

  return store;
};
