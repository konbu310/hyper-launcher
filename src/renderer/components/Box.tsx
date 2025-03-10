import { FC, useCallback } from "react";
import { AppInfo } from "../../common/interface";
import { useHotkeyMapActions } from "../useHotkeyMap";
import { Card } from "./Card";
import { Icon } from "./Icon";

const pathToName = (path: string): string => {
  const match = path.match(/\/.+\/(.+[^\/]).app/);
  return match?.[1] ?? "";
};

export const Box: FC<{
  boxKey: string;
  appList: AppInfo[];
}> = ({ boxKey, appList }) => {
  const { addApp } = useHotkeyMapActions();

  const handleOpenFileDialog = useCallback(async () => {
    const fileNames = await window.api.openFileDialog();
    const path = fileNames.filePaths.at(0);
    if (path == undefined) return;
    const name = pathToName(path);
    if (name === "") return;
    const icon = await window.api.getAppIcon(path);
    addApp(boxKey, { name, path, icon });
  }, [addApp, boxKey]);

  return (
    <div className="box">
      <header className="box__header">
        <span>{`Ctrl + ${boxKey}`}</span>

        <Icon
          type="plus"
          className="add-button"
          onClick={handleOpenFileDialog}
        />
      </header>

      {appList.map((app, index) => (
        <Card
          key={`card-${app.name}`}
          id={`card-${app.name}`}
          index={index}
          boxKey={boxKey}
          app={app}
        />
      ))}
    </div>
  );
};
