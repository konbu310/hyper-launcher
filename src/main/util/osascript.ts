import { run } from "@jxa/run";
import "@jxa/global-type";
import { App } from "../../share/interface";

export const getRunningApps = (...apps: App[]): Promise<App[]> => {
  return run((apps: App[]) => {
    return apps.filter(app => Application(app.name).running());
  }, apps);
};

export const getFrontMostAppIndex = (
  ...apps: App[]
): Promise<number | null> => {
  return run((apps: App[]) => {
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
