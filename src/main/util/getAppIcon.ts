import { fileIcon } from "./file-icon";

export type GetAppIcon = (appPath: string) => Promise<string>;

export const getAppIcon: GetAppIcon = async appPath => {
  const buffer = (await fileIcon.buffer(appPath, { size: 48 })) as Buffer;
  return buffer.toString("base64");
};
