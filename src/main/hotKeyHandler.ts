import { run } from "@jxa/run";
import "@jxa/global-type";
import { globalShortcut, shell } from "electron";
import { AppInfo, HotKeyMap } from "../common/interface";
import { DefaultMap } from "../common/util";

const prevIndexMap = new DefaultMap<string, number>(() => 0, [
  ["0", 0],
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

  for (const [key, appList] of Object.entries(hotKeyData)) {
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
  }
};

const handleMultiApps = async (key: string, appList: AppInfo[]) => {
  const prevIndex = prevIndexMap.get(key);
  console.time("exec");
  const [path, index] = await run<[string, number]>(
    (appList: AppInfo[], prevIndex: number) => {
      let runningApps: (AppInfo & { index: number })[] = [];
      let frontmostFlag = false;

      for (let index = 0, length = appList.length; index < length; index++) {
        const app = Application(appList[index].path);
        const isRunning = app.running();
        const isFrontmost = app.frontmost();
        if (!isRunning) continue;
        if (frontmostFlag) {
          return [appList[index].path, index];
        } else {
          frontmostFlag = isFrontmost;
          runningApps.push({ ...appList[index], index });
        }
      }

      if (frontmostFlag) {
        return [appList[0].path, 0];
      }

      if (runningApps.length === 0) {
        return [appList[0].path, 0];
      } else if (runningApps.length === 1) {
        const target = runningApps[0];
        return [target.path, target.index];
      } else {
        return [appList[prevIndex].path, prevIndex];
      }
    },
    appList,
    prevIndex
  );
  console.timeEnd("exec");
  prevIndexMap.set(key, index);
  await shell.openPath(path);
};
