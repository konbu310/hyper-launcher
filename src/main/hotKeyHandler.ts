import { exec } from "child_process";
import { globalShortcut, shell } from "electron";
import { promisify } from "util";
import { HotKeyMap } from "../common/interface";

const execPromise = promisify(exec);

const prevIndexMap: Map<string, number> = new Map([
  ["1", 0],
  ["2", 0],
  ["3", 0],
  ["4", 0],
  ["5", 0],
  ["6", 0],
  ["7", 0],
  ["8", 0],
  ["9", 0],
]);

export const registerHotKey = async (hotKeyData: HotKeyMap) => {
  try {
    globalShortcut.unregisterAll();
    for (const [key, appList] of Object.entries(hotKeyData)) {
      const appPaths = appList.map(({ path }) => path);
      if (appPaths.length === 0) {
      } else if (appPaths.length === 1) {
        globalShortcut.register(`Control+${key}`, () => {
          shell.openPath(appPaths[0]);
        });
      } else {
        globalShortcut.register(`Control+${key}`, () => {
          handleMultiApps(key, appPaths);
        });
      }
    }
  } catch (err) {
    console.error("registerHotKey: ", err);
  }
};

const handleMultiApps = async (key: string, appPaths: string[]) => {
  const prevIndex = prevIndexMap.get(key) ?? 0;
  const [index, path] = await getNextLaunchApp(appPaths, prevIndex);
  prevIndexMap.set(key, index);
  await shell.openPath(path);
};

const getNextLaunchApp = async (
  appPaths: string[],
  prevIndex: number,
): Promise<[number, string]> => {
  const { stdout: visibleAppsStr } = await execPromise(
    "lsappinfo visibleProcessList",
  );
  const visibleAppPaths = await Promise.all(
    visibleAppsStr.split(" ").map(async (asn) => {
      const { stdout } = await execPromise(
        `lsappinfo info ${asn.replace("\n", "")} -only bundlePath`,
      );
      return stdout
        .replaceAll('"', "")
        .replace("\n", "")
        .replace("LSBundlePath=", "");
    }),
  );
  let frontmostFlag = false;
  let activeApps: [number, string][] = [];
  for (let i = 0, length = appPaths.length; i < length; i++) {
    const path = appPaths[i];
    const index = visibleAppPaths.indexOf(path);
    if (index === -1) continue;
    if (frontmostFlag) {
      return [i, path];
    }
    frontmostFlag = index === 0;
    activeApps.push([i, path]);
  }
  if (frontmostFlag || activeApps.length === 0) {
    return [0, appPaths[0]];
  }
  if (activeApps.length === 1) {
    const target = activeApps[0];
    return [target[0], target[1]];
  }
  return [prevIndex, appPaths[prevIndex]];
};
