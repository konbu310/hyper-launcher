import { IpcRenderer } from "electron";
import * as Store from "electron-store";
import { StoreKey } from "../src/common/interface";
// import { getRunningApps } from "../src/main/util/application";

declare global {
  namespace NodeJS {
    interface Global {
      store: Store<StoreKey>;
      // getRunningApps: typeof getRunningApps;
    }
  }

  interface Window {
    electron: {
      ipcRenderer: IpcRenderer;
    };
  }
}
