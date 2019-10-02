import { run } from "@jxa/run";
import "@jxa/global-type";
import { AppInfo } from "../../renderer/util/initial-data";

export const getRunningApps = (...apps: AppInfo[]): Promise<AppInfo[]> => {
  return run((apps: AppInfo[]) => {
    return apps.filter(app => Application(app.name).running());
  }, apps);
};

export const getFrontMostAppIndex = (
  ...apps: AppInfo[]
): Promise<number | null> => {
  return run((apps: AppInfo[]) => {
    let result = null;
    for (let [index, app] of apps.entries()) {
      if (Application(app.name).frontmost()) {
        result = index;
        break;
      }
    }
    return result;
  }, apps);
};
