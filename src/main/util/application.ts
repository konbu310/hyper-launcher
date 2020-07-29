import { promisify } from "util";
import * as cp from "child_process";
import { AppInfo } from "../../share/interface";
import { join as joinPath } from "path";

// ______________________________________________________
//
// @ COMMON
//
const execAsync = promisify(cp.exec);
const execFileAsync = promisify(cp.execFile);
const frontmostApp = joinPath(__dirname, "bin/frontmost-app");

// ______________________________________________________
//
// @ パスからアプリ名を取得する
//
export const path2name = (path: string): string => {
  const match = path.match(/\/.+\/(.+[^\/]).app/);
  return (match && match[1]) || "";
};

// ______________________________________________________
//
// @ アプリケーションのアイコンを取得する
//
const fileIcon = joinPath(__dirname, "bin/file-icon");

const execFileIcon = async (appPath: string): Promise<Buffer> => {
  const { stdout } = await execFileAsync(fileIcon, [appPath, "48", "false"], {
    encoding: null,
    maxBuffer: 1024 * 1024 * 100,
  });
  return stdout;
};

export const getAppIcon = async (appPath: string): Promise<string> => {
  const buffer = await execFileIcon(appPath);
  return buffer.toString("base64");
};

// ______________________________________________________
//
// @ 最前面にあるアプリケーションを取得する
//
const execFrontmostApp = async () => {
  try {
    const data = (
      await execFileAsync(frontmostApp, { timeout: 2000 })
    ).stdout.split("\x07");
    return data[2] || "";
  } catch (e) {
    console.error(e);
    return "";
  }
};

export const getFrontmostApp = async (): Promise<string> => {
  const path = await execFrontmostApp().catch((e) => console.error(e));
  if (path == null) return "";
  return path2name(path);
  // return appList.findIndex(({ name }) => name === appName);
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
      const name = path2name(path);
      return {
        name,
        path,
      };
    });
  return kAppList.filter(({ name }) => res.some((app) => app.name === name));
};
