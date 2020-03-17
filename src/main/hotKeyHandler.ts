import { globalShortcut, shell } from "electron";
import { App, HotKeyMap } from "../share/interface";
import { getRunningApps, getFrontmostAppIndex } from "./util/appInfo";

// prettier-ignore
const prevIndex: {[key: string]: number} = {
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
};

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

  const handleMultipleApps = async (key: string, appList: App[]) => {
    const runningApps = await getRunningApps(appList);
    switch (runningApps.length) {
      case 0:
        shell.openItem(appList[prevIndex[key]].path);
        break;
      case 1:
        prevIndex[key] =
          appList.findIndex(({ name }) => name === runningApps[0].name) || 0;
        shell.openItem(runningApps[0].path);
        break;
      default:
        const index = await getFrontmostAppIndex(runningApps);
        if (index === -1) {
          shell.openItem(appList[prevIndex[key]].path);
        } else if (index === runningApps.length - 1) {
          prevIndex[key] =
            appList.findIndex(({ name }) => name === runningApps[0].name) || 0;
          shell.openItem(runningApps[0].path);
        } else {
          prevIndex[key] =
            appList.findIndex(
              ({ name }) => name === runningApps[index + 1].name
            ) || 0;
          shell.openItem(runningApps[index + 1].path);
        }
    }
  };
};
