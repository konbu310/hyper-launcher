import { sampleHotKeyMap } from "./sample";

if (window.api === undefined) {
  window.api = {
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
