import * as Store from "electron-store";
import { StoreKey } from "../src/common/interface";
import type { GlobalApi } from "../src/common/preload";

declare global {
  namespace NodeJS {
    interface Global {
      store: Store<StoreKey>;
    }
  }

  interface Window {
    electron: GlobalApi;
  }
}
