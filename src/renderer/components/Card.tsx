import React, { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Icon } from "./Icon";
import { AppInfo } from "../../common/interface";
import cx from "classnames";

export const Card: FC<
  AppInfo & {
    cardId: string;
    removeHotKeyMap: VoidFunction;
    toggleDisable: VoidFunction;
    provided: DraggableProvided;
  }
> = ({
  cardId,
  icon,
  name,
  disabled,
  removeHotKeyMap,
  toggleDisable,
  provided,
}) => {
  const iconSrc = icon?.startsWith("data:")
    ? icon
    : `data:image/png;base64,${icon}`;
  return (
    <div
      ref={provided.innerRef}
      className={cx("card__container", { disabled })}
      id={cardId}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="card">
        <input type="checkbox" checked={!disabled} onChange={toggleDisable} />
        <img className="card__icon" src={iconSrc} alt="application icon" />
        <span className="card__text">{name}</span>
        <Icon
          type="cross"
          className="remove-button"
          onClick={removeHotKeyMap}
        />
      </div>
    </div>
  );
};
