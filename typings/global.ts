import * as Store from "electron-store";
import { StoreKey } from "../src/share/interface";
import {
  getAppIcon,
  getFrontmostApp,
  getRunningApps,
} from "../src/main/util/application";

declare global {
  namespace NodeJS {
    interface Global {
      store: Store<StoreKey>;
      getAppIcon: typeof getAppIcon;
      getFrontmostApp: typeof getFrontmostApp;
      getRunningApps: typeof getFrontmostApp;
    }
  }
}
