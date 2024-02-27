import { sampleHotKeyMap } from "./sample";

if (!("electron" in window)) {
  window.electron = {
    getAppIcon: async () => {
      return "";
    },
    getHotKeyMap: async () => {
      return sampleHotKeyMap;
    },
    setHotKeyMap: async () => {
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
