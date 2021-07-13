import { IpcMainInvokeEvent } from "electron";
import fileIcon from "extract-file-icon";

/**
 * アプリケーションのアイコンを取得する
 */
export const getAppIcon = async (
  ev: IpcMainInvokeEvent,
  appPath: string
): Promise<string> => {
  const iconBuf = fileIcon(appPath) as Buffer;
  return iconBuf.toString("base64");
};
