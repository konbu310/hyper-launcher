import { globalShortcut, shell } from "electron";
import { AppInfo, HotKeyMap } from "../share/interface";
import { getRunningApps, getFrontmostApp } from "./util/application";

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
    if (appList.length === 1) {
      globalShortcut.register(`Control+${key}`, async () => {
        shell.openItem(appList[0].path);
      });
    } else {
      globalShortcut.register(`Control+${key}`, async () => {
        await handleMultipleApps(key, appList);
      });
    }
  });

  const handleMultipleApps = async (key: string, appList: AppInfo[]) => {
    const runningApps = await getRunningApps(appList);
    switch (runningApps.length) {
      case 0:
        shell.openItem(appList[prevIndexMap.get(key) || 0].path);
        break;
      case 1:
        prevIndexMap.set(
          key,
          appList.findIndex(({ name }) => name === runningApps[0].name) || 0
        );
        shell.openItem(runningApps[0].path);
        break;
      default:
        const frontmostAppName = await getFrontmostApp();
        const frontmostAppIndex = runningApps.findIndex(
          ({ name }) => name === frontmostAppName
        );
        if (frontmostAppIndex === -1) {
          shell.openItem(appList[prevIndexMap.get(key) || 0].path);
        } else if (frontmostAppIndex === runningApps.length - 1) {
          prevIndexMap.set(
            key,
            appList.findIndex(({ name }) => name === runningApps[0].name) || 0
          );
          shell.openItem(runningApps[0].path);
        } else {
          prevIndexMap.set(
            key,
            appList.findIndex(
              ({ name }) => name === runningApps[frontmostAppIndex + 1].name
            ) || 0
          );
          shell.openItem(runningApps[frontmostAppIndex + 1].path);
        }
    }
  };
};
