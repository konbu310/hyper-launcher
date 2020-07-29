import { ipcMain } from "electron";

let initialized = false;

// ______________________________________________________
//
// @ ipcハンドラの初期化
//
export const initializeIpcEvents = () => {
  if (initialized) {
    return;
  }
  initialized = true;
};

// ______________________________________________________
//
// ipcハンドラの解放
//
export const releaseIpcEvents = () => {
  if (initialized) {
  }

  initialized = false;
};
