import * as Store from "electron-store";
import { StoreKey } from "../src/share/interface";
import { GetAppIcon } from "../src/main/util/getAppIcon";
import { BrowserWindow } from "electron";

declare global {
  namespace NodeJS {
    interface Global {
      store: Store<StoreKey>;
      getAppIcon: GetAppIcon;
      mainWindow: BrowserWindow | null;
    }
  }
}
