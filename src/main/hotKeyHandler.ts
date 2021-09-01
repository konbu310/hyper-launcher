import { run } from "@jxa/run";
import { globalShortcut, shell } from "electron";
import { AppInfo, HotKeyMap } from "../common/interface";

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
  await globalShortcut.unregisterAll();

  Object.entries(hotKeyData).map(([key, appList]) => {
    switch (appList.length) {
      case 0:
        break;
      case 1:
        globalShortcut.register(`Control+${key}`, async () => {
          await shell.openPath(appList[0].path);
        });
        break;
      default:
        globalShortcut.register(`Control+${key}`, async () => {
          await handleMultiApps(key, appList);
        });
        break;
    }
  });
};

type AppClass = {
  running: () => boolean;
  frontmost: () => boolean;
};
function Application(appPath: string): AppClass;
function Application() {
  return {
    running: () => false,
    frontmost: () => false,
  };
}

const handleMultiApps = async (key: string, appList: AppInfo[]) => {
  try {
    const prevIndex = prevIndexMap.get(key) ?? 0;
    const [nextPrevIndex, targetAppPath] = await run<[number, string]>(
      (appList: AppInfo[], prevIndex: number) => {
        let runningApps: [number, AppInfo][] = [];
        let frontmostFlag = false;

        // 登録されたアプリが起動中か最前面にあるかどうかなどを取得する
        for (let index = 0, length = appList.length; index < length; index++) {
          const app = appList[index];
          if (!app) continue;
          const appCls = Application(app.path);
          const isRunning = appCls.running();
          const isFrontmost = appCls.frontmost();
          if (!isRunning) continue;
          if (frontmostFlag) {
            return [index, app.path];
          }
          frontmostFlag = isFrontmost;
          runningApps.push([index, app]);
        }

        if (frontmostFlag || runningApps.length === 0) {
          return [0, appList[0].path];
        }

        if (runningApps.length === 1) {
          const target = runningApps[0];
          return [target[0], target[1].path];
        }

        return [prevIndex, appList[prevIndex].path];
      },
      appList,
      prevIndex
    );
    prevIndexMap.set(key, nextPrevIndex);
    await shell.openPath(targetAppPath);
  } catch (err) {
    console.error(err);
  }
};
