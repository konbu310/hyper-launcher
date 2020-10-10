import { promisify } from "util";
import * as cp from "child_process";
import { AppInfo } from "../../share/interface";
import { join as joinPath } from "path";
import { IpcMainInvokeEvent } from "electron";
import { pathToName } from "../../share/util";

const execAsync = promisify(cp.exec);
const execFileAsync = promisify(cp.execFile);
const frontmostApp = joinPath(__dirname, "frontmost-app");
const fileIcon = require("file-icon");

// ______________________________________________________
//
// @ アプリケーションのアイコンを取得する
//
export const getAppIcon = async (
  ev: IpcMainInvokeEvent,
  appPath: string
): Promise<string> => {
  const buffer = (await fileIcon.buffer(appPath)) as Buffer;
  return buffer.toString("base64");
};

// ______________________________________________________
//
// @ 最前面にあるアプリケーションを取得する
//
export const getFrontmostApp = async (): Promise<string> => {
  console.log("getFrontmostApp");
  try {
    return (await execFileAsync(frontmostApp, { timeout: 2000 })).stdout.split(
      "\x07"
    )[2];
  } catch (err) {
    console.error(err);
    return "";
  }
};

// ______________________________________________________
//
// @ 起動中のアプリケーションを取得する
//
export const getRunningApps = async (
  appList: AppInfo[]
): Promise<AppInfo[]> => {
  const kAppList = appList.map((app) => ({
    path: app.path,
    name: app.name.replace(/.app/, ""),
  }));
  const { stdout } = await execAsync(
    "ps ax -o command | { sed -ne 's/.*\\(\\/Applications\\/[^/]*\\.app\\)\\/.*/\\1/p' ; echo '/System/Library/CoreServices/Finder.app' ; } | sort -u"
  );
  const res = stdout
    .split("\n")
    .filter(Boolean)
    .map((path) => {
      const name = pathToName(path);
      return {
        name,
        path,
      };
    });
  return kAppList.filter(({ name }) => res.some((app) => app.name === name));
};
