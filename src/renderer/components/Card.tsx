import cx from "classnames";
import { FC, useCallback } from "react";
import { AppInfo } from "../../common/interface";
import { Icon } from "./Icon";
import { useHotKeyMapActions } from "../useHotKeyMap";

const base64Prefix = "data:image/png;base64,";

function ensureBase64Prefix(icon: string | undefined): string {
  return icon?.startsWith("data:") ? icon : `${base64Prefix}${icon ?? ""}`;
}

export const Card: FC<{
  id: string;
  boxKey: string;
  index: number;
  app: AppInfo;
}> = ({ id, boxKey, index, app }) => {
  const { removeApp, toggleDisable } = useHotKeyMapActions();
  const { name, icon, disabled } = app;
  const iconSrc = ensureBase64Prefix(icon);

  const handleChange = useCallback(() => {
    toggleDisable(boxKey, index);
  }, [boxKey, index, toggleDisable]);

  const handleClick = useCallback(() => {
    removeApp(boxKey, index);
  }, [boxKey, index, removeApp]);

  return (
    <div id={id} className={cx("card__container", { disabled })}>
      <div className="card">
        <input type="checkbox" checked={!disabled} onChange={handleChange} />
        <img className="card__icon" src={iconSrc} alt="application icon" />
        <span className="card__text">{name}</span>
        <Icon type="cross" className="remove-button" onClick={handleClick} />
      </div>
    </div>
  );
};
