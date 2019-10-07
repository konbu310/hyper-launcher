import { globalShortcut, shell } from "electron";
import { Shortcut, App } from "../share/interface";
import { getRunningApps, getFrontMostAppIndex } from "./util/osascript";

// prettier-ignore
let prevIndex: {[key: string]: number} = {
  1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0
};

export const registerShortcut = async (shortcutData: Shortcut) => {
  await globalShortcut.unregisterAll();

  Object.entries(shortcutData).map(([key, appList]) => {
    registerHotKey(key, appList);
  });
};

const registerHotKey = async (key: string, appList: App[]) => {
  if (appList.length === 1) {
    globalShortcut.register(`Control+${key}`, async () => {
      shell.openItem(appList[0].path);
    });
  } else {
    globalShortcut.register(`Control+${key}`, () => {
      handleMultipleApps(key, appList);
    });
  }
};

const handleMultipleApps = async (key: string, appList: App[]) => {
  const rapps = await getRunningApps(...appList);
  switch (rapps.length) {
    case 0:
      shell.openItem(appList[0].path);
      prevIndex[key] = 0;
      break;
    case 1:
      shell.openItem(rapps[0].path);
      prevIndex[key] =
        appList.findIndex(({ name }) => name === rapps[0].name) || 0;
      break;
    default:
      const index = await getFrontMostAppIndex(...rapps);

      index === null
        ? shell.openItem(appList[prevIndex[key]].path)
        : index === rapps.length - 1
        ? shell.openItem(rapps[0].path)
        : shell.openItem(rapps[index + 1].path);

      prevIndex[key] =
        index === rapps.length - 1
          ? appList.findIndex(({ name }) => name === rapps[0].name) || 0
          : index !== null
          ? appList.findIndex(({ name }) => name === rapps[index + 1].name) || 0
          : prevIndex[key];
  }
};
