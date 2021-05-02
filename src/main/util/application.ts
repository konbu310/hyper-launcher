import { promisify } from "util";
import cp from "child_process";
import { AppInfo } from "../../common/interface";
import { IpcMainInvokeEvent } from "electron";
import { pathToName } from "../../common/util";
import fileIcon from "extract-file-icon";

const execAsync = promisify(cp.exec);

/**
 * アプリケーションのbundleIDを取得する
 */
export const getBundleId = async (
  ev: IpcMainInvokeEvent,
  appSpecifier: string
): Promise<string> => {
  const result = await execAsync(
    `osascript -e 'id of application "${appSpecifier}"'`
  );
  return (result.stdout as string) ?? "";
};

/**
 * アプリケーションのアイコンを取得する
 */
export const getAppIcon = async (ev: IpcMainInvokeEvent, appPath: string) => {
  const iconBuf = fileIcon(appPath) as Buffer;
  return iconBuf.toString("base64");
};

/**
 * アプリケーションが最前面にあるかどうか判定する
 */
export const checkIsFrontmostApp = async (
  appSpecifier: string
): Promise<boolean> => {
  const result =
    (await execAsync(`lsappinfo info ${appSpecifier}`)).stdout ?? "";
  if (result === "") return false;
  return result.includes("(in front)");
};

/**
 * 最前面のアプリケーションを取得する
 */
export const getFrontmostAppId = async (): Promise<string> => {
  const result =
    (await execAsync(`lsappinfo info -only bundleID \`lsappinfo front\``))
      .stdout ?? "";
  if (result === "") {
    throw new Error();
  }
  return result.split("=")[1] as string;
};

// ______________________________________________________
//
// @ 起動中のアプリケーションを取得する
//
// export const getRunningApps = async (
//   appList: AppInfo[]
// ): Promise<AppInfo[]> => {
//   const kAppList = appList.map((app) => ({
//     path: app.path,
//     name: app.name.replace(/.app/, ""),
//   }));
//   const { stdout } = await execAsync(
//     "ps ax -o command | { sed -ne 's/.*\\(\\/Applications\\/[^/]*\\.app\\)\\/.*/\\1/p' ; echo '/System/Library/CoreServices/Finder.app' ; } | sort -u"
//   );
//   const res = stdout
//     .split("\n")
//     .filter(Boolean)
//     .map((path) => {
//       const name = pathToName(path);
//       return {
//         name,
//         path,
//       };
//     });
//   return kAppList.filter(({ name }) => res.some((app) => app.name === name));
// };
