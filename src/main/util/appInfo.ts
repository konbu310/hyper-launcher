import { promisify } from "util";
import * as cp from "child_process";
import { App } from "../../share/interface";
import { join } from "path";

// ______________________________________________________
//
// @ COMMON
//
const exec = promisify(cp.exec);
const execFile = promisify(cp.execFile);

export type AppInfo = {
  name: string;
  path: string;
};

export const path2name = (path: string): string => {
  const match = path.match(/\/.+\/(.+[^\/]).app/);
  return (match && match[1]) || "";
};

// ______________________________________________________
//
// @ GET_APP_ICON
//
const fileIcon = join(__dirname, "bin/file-icon");

const execFileIcon = async (appPath: string): Promise<Buffer> => {
  const { stdout } = await execFile(fileIcon, [appPath, "48", "false"], {
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
// @ GET_FRONTMOST_APP
//
const frontmostApp = join(__dirname, "bin/frontmost-app");

const execFrontmostApp = async () => {
  const [
    localizedName,
    bundleId,
    bundlePath,
    executablePath,
    isLaunched,
    pid
  ] = (await execFile(frontmostApp, { timeout: 2000 })).stdout.split("\x07");
  return bundlePath;
};

export type GetFrontmostApp = (appList: AppInfo[]) => Promise<number>;

export const getFrontmostAppIndex: GetFrontmostApp = async appList => {
  const path = await execFrontmostApp();
  const appName = path2name(path);
  return appList.findIndex(({ name }) => name === appName);
};

// ______________________________________________________
//
// @ GET_RUNNING_APPS
//
export type GetRunningApps = (appList: App[]) => Promise<AppInfo[]>;

export const getRunningApps: GetRunningApps = async (appList: App[]) => {
  const kAppList = appList.map(app => ({
    path: app.path,
    name: app.name.replace(/.app/, "")
  }));
  const { stdout } = await exec(
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
