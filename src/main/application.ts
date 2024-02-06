import { IpcMainInvokeEvent } from "electron";
import { execa } from "execa";
import path from "path";

// ______________________________________________________
//
// @ アプリケーションのアイコンを取得する
//
export const getAppIcon = async (
  ev: IpcMainInvokeEvent,
  appPath: string,
): Promise<string> => {
  const icon = await execa(path.resolve(__dirname, "GetAppIcon"), [appPath]);
  return icon.stdout.toString();
};
