import { emptyData } from "../common/initial-data";
import { HotKeyMap } from "../common/interface";

if (!("electron" in window)) {
  window.electron = {
    getAppIcon: async (appPath: string) => {
      return "";
    },
    getHotKeyMap: async () => {
      return emptyData;
    },
    setHotKeyMap: async (data: HotKeyMap) => {
      return true;
    },
    openFileDialog: async () => {
      return {
        canceled: true,
        filePaths: [],
      };
    },
  };
}
