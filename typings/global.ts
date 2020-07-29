import * as Store from "electron-store";
import { StoreKey } from "../src/share/interface";
import {
  GetAppIcon,
  GetFrontmostApp,
  GetRunningApps,
} from "../src/main/util/application";

declare global {
  namespace NodeJS {
    interface Global {
      store: Store<StoreKey>;
      getAppIcon: GetAppIcon;
      getFrontmostApp: GetFrontmostApp;
      getRunningApps: GetRunningApps;
    }
  }
}
