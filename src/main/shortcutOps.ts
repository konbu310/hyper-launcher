import { globalShortcut, shell } from "electron";
import { AppInfo, initialData, Shortcut } from "../renderer/util/initial-data";
import { getRunningApps, getFrontMostAppIndex } from "./util/osascript";

export const registerShortcut = async (shortcutData: Shortcut) => {
  Object.keys(shortcutData).map(key => {
    registerHotKey(key);
  });
};

export const registerHotKey = async (
  key: string,
  shortcutData: Shortcut = initialData
) => {
  const appList = shortcutData[key];
  if (appList.length === 1) {
    globalShortcut.register(`Control+${key}`, async () => {
      shell.openItem(appList[0].path);
    });
  } else {
    globalShortcut.register(`Control+${key}`, () => {
      handleMultipleApps(appList);
    });
  }
};

const handleMultipleApps = async (appList: AppInfo[]) => {
  const rapps = await getRunningApps(...appList);
  switch (rapps.length) {
    case 0:
      shell.openItem(appList[0].path);
      break;
    case 1:
      shell.openItem(rapps[0].path);
      break;
    default:
      const index = await getFrontMostAppIndex(...appList);
      index === null || rapps.length - 1 === index
        ? shell.openItem(rapps[0].path)
        : shell.openItem(rapps[index + 1].path);
  }
};
