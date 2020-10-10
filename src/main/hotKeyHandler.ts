import { globalShortcut, shell } from "electron";
import { AppInfo, HotKeyMap } from "../share/interface";
import { getRunningApps } from "./util/application";
import { getFrontmostApp } from "./util/application";

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
          await handleMultipleApps(key, appList);
        });
        break;
    }
  });

  const handleMultipleApps = async (key: string, appList: AppInfo[]) => {
    const runningApps = await getRunningApps(appList);
    switch (runningApps.length) {
      case 0:
        await shell.openPath(appList[prevIndexMap.get(key) || 0].path);
        break;
      case 1:
        prevIndexMap.set(
          key,
          appList.findIndex(({ name }) => name === runningApps[0].name) || 0
        );
        await shell.openPath(runningApps[0].path);
        break;
      default:
        const frontmostApp = await getFrontmostApp();
        const frontmostAppIndex = runningApps.findIndex(
          ({ name }) => name === frontmostApp.name
        );
        if (frontmostAppIndex === -1) {
          await shell.openPath(appList[prevIndexMap.get(key) || 0].path);
        } else if (frontmostAppIndex === runningApps.length - 1) {
          prevIndexMap.set(
            key,
            appList.findIndex(({ name }) => name === runningApps[0].name) || 0
          );
          await shell.openPath(runningApps[0].path);
        } else {
          prevIndexMap.set(
            key,
            appList.findIndex(
              ({ name }) => name === runningApps[frontmostAppIndex + 1].name
            ) || 0
          );
          await shell.openPath(runningApps[frontmostAppIndex + 1].path);
        }
    }
  };
};
