import { promisify } from "util";
import * as cp from "child_process";
import { AppInfo } from "../../share/interface";
import { join as joinPath } from "path";

// ______________________________________________________
//
// @ COMMON
//
const execP = promisify(cp.exec);
const execFileP = promisify(cp.execFile);

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
  const { stdout } = await execFileP(fileIcon, [appPath, "48", "false"], {
    encoding: null,
    maxBuffer: 1024 * 1024 * 100
  });
  return stdout;
};

export type GetAppIcon = (appPath: string) => Promise<string>;

export const getAppIcon: GetAppIcon = async appPath => {
  const buffer = await execFileIcon(appPath);
  return buffer.toString("base64");
};

// ______________________________________________________
//
// @ 最前面にあるアプリケーションを取得する
//
const frontmostApp = joinPath(__dirname, "bin/frontmost-app");

const execFrontmostApp = async () => {
  const [
    localizedName,
    bundleId,
    bundlePath,
    executablePath,
    isLaunched,
    pid
  ] = (await execFileP(frontmostApp, { timeout: 2000 })).stdout.split("\x07");
  return bundlePath;
};

export type GetFrontmostApp = () => Promise<string>;

export const getFrontmostApp: GetFrontmostApp = async () => {
  const path = await execFrontmostApp();
  return path2name(path);
  // return appList.findIndex(({ name }) => name === appName);
};

// ______________________________________________________
//
// @ 起動中のアプリケーションを取得する
//
export type GetRunningApps = (appList: AppInfo[]) => Promise<AppInfo[]>;

export const getRunningApps: GetRunningApps = async (appList: AppInfo[]) => {
  const kAppList = appList.map(app => ({
    path: app.path,
    name: app.name.replace(/.app/, "")
  }));
  const { stdout } = await execP(
    "ps ax -o command | { sed -ne 's/.*\\(\\/Applications\\/[^/]*\\.app\\)\\/.*/\\1/p' ; echo '/System/Library/CoreServices/Finder.app' ; } | sort -u"
  );
  const res = stdout
    .split("\n")
    .filter(Boolean)
    .map(path => {
      const name = path2name(path);
      return {
        name,
        path
      };
    });
  return kAppList.filter(({ name }) => res.some(app => app.name === name));
};
