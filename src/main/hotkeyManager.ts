import { AppInfo, HotKeyMap } from "../common/interface";
import { globalShortcut, shell } from "electron";
import { run } from "@jxa/run";
import "@jxa/global-type";

export class HotKeyManager {
  constructor() {}

  private prevIndexes: Record<string, number> = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
  };

  public initialize = async (hotKeyMap: HotKeyMap) => {
    await globalShortcut.unregisterAll();

    for (const [key, appList] of Object.entries(hotKeyMap)) {
      if (appList.length === 0) return;
      this.register(key, appList);
    }
  };

  public finalize = async () => {
    await globalShortcut.unregisterAll();
  };

  public register = (key: string, appList: AppInfo[]) => {
    globalShortcut.register(`Control+${key}`, async () => {
      await this.openApp(key, appList);
    });
  };

  private openApp = async (key: string, appList: AppInfo[]) => {
    if (appList.length === 1) {
      await shell.openPath(appList[0].path);
    } else {
      const [path, index] = await this.getNextAppPath(key, appList);
      this.prevIndexes[key] = index;
      console.log(`
      
      PATH: ${path}
      
      `);
      await shell.openPath(path);
    }
  };

  private getNextAppPath = async (
    key: string,
    appList: AppInfo[]
  ): Promise<[string, number]> => {
    return run(
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
      this.prevIndexes[key]
    );
  };
}
