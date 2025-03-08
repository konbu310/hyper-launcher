import { sampleHotkeyMap } from "./sample";

if (window.api === undefined) {
  window.api = {
    getAppIcon: async () => "",
    getHotkeyMap: async () => sampleHotkeyMap,
    setHotkeyMap: async () => true,
    openFileDialog: async () => ({ canceled: true, filePaths: [] }),
  };
}
