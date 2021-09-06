import { globalShortcut, shell } from "electron";
import { HotKeyMap } from "../common/interface";
import { execFile } from "child_process";
import { promisify } from "util";

const execFilePromise = promisify(execFile);

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
    await globalShortcut.unregisterAll();
    for (const [key, appList] of Object.entries(hotKeyData)) {
      const appPaths = appList.map(({ path }) => path);
      if (appList.length === 0) {
        return;
      } else if (appList.length === 1) {
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
  const script = createHandleMultiAppScript(appPaths, prevIndex);
  try {
    const { stdout, stderr } = await execFilePromise("/usr/bin/osascript", [
      "-l",
      "JavaScript",
      "-e",
      script,
    ]);
    if (stderr) {
      throw new Error(stderr);
    } else {
      const [nPrevIndex, nPath] = JSON.parse(stdout);
      prevIndexMap.set(key, nPrevIndex);
      await shell.openPath(nPath);
    }
  } catch (err) {
    console.error("handleMultiApps", err);
  }
};

const createHandleMultiAppScript = (
  _appPaths: string[],
  _prevIndex: number
) => {
  return `(() => {
    const appPaths = ${JSON.stringify(_appPaths)};
    const prevIndex = ${JSON.stringify(_prevIndex)};
    let runningApps = [];
    let frontmostFlag = false;
    for (let index = 0, length = appPaths.length; index < length; index++) {
      const path = appPaths[index];
      const app = Application(path);
      const isRunning = app.running();
      const isFrontmost = app.frontmost();
      if (!isRunning) continue;
      if (frontmostFlag) {
        return JSON.stringify([index, path]);
      }
      frontmostFlag = isFrontmost;
      runningApps.push([index, path]);
    }
    if (frontmostFlag || runningApps.length === 0) {
      return JSON.stringify([0, appPaths[0]]);
    }
    if (runningApps.length === 1) {
      const target = runningApps[0];
      return JSON.stringify([target[0], target[1].path]);
    }
    return JSON.stringify([prevIndex, appPaths[prevIndex]]);
  })();
  `.replaceAll(/(\n|\s{2,})/g, "");
};
