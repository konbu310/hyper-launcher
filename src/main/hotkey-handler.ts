import { globalShortcut, shell } from "electron";
import { execa } from "execa";
import { HotkeyMap } from "../common/interface";
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

export const registerHotkey = async (hotKeyData: HotkeyMap) => {
  try {
    globalShortcut.unregisterAll();
    for (const [key, appList] of Object.entries(hotKeyData)) {
      const appPaths = appList
        .filter((app) => !app.disabled)
        .map(({ path }) => path);

      switch (appPaths.length) {
        case 0:
          break;
        case 1:
          const path = appPaths.at(0);
          if (path) {
            globalShortcut.register(`Control+${key}`, () => {
              shell.openPath(path);
            });
          }
          break;
        default:
          globalShortcut.register(`Control+${key}`, () => {
            handleMultiApps(key, appPaths);
          });
          break;
      }
    }
  } catch (err) {
    console.error("registerHotkey: ", err);
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
  prevIndex: number
): Promise<[number, string]> => {
  const { stdout: visibleAppsStr } = await execa(
    "lsappinfo visibleProcessList"
  );
  const visibleAppPaths = await Promise.all(
    visibleAppsStr.split(" ").map(async (asn) => {
      const { stdout } = await execa(
        `lsappinfo info ${asn.replace("\n", "")} -only bundlePath`
      );
      return stdout
        .replaceAll('"', "")
        .replace("\n", "")
        .replace("LSBundlePath=", "");
    })
  );
  let frontmostFlag = false;
  let activeApps: { index: number; path: string }[] = [];
  for (let i = 0, length = appPaths.length; i < length; i++) {
    const path = appPaths.at(i);
    if (!path) continue;
    const index = visibleAppPaths.indexOf(path);
    if (index === -1) continue;
    if (frontmostFlag) {
      return [i, path];
    }
    frontmostFlag = index === 0;
    activeApps.push({ index: i, path });
  }
  const firstPath = appPaths.at(prevIndex);
  if (firstPath && (frontmostFlag || activeApps.length === 0)) {
    return [prevIndex, firstPath];
  }

  const target = activeApps.at(0);
  if (target && activeApps.length === 1) {
    return [target.index, target.path];
  }

  return [prevIndex, appPaths.at(prevIndex) ?? ""];
};
