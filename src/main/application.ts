import { IpcMainInvokeEvent } from "electron";
const fileIcon = require("extract-file-icon");

// ______________________________________________________
//
// @ アプリケーションのアイコンを取得する
//
export const getAppIcon = async (
  ev: IpcMainInvokeEvent,
  appPath: string,
): Promise<string> => {
  const icon = fileIcon(appPath, 32);
  return icon.toString("base64");
};
