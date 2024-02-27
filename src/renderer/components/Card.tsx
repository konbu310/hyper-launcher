import React, { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Icon } from "./Icon";

export const Card: FC<{
  cardId: string;
  icon: string;
  name: string;
  removeHotKeyMap: VoidFunction;
  provided: DraggableProvided;
}> = ({ cardId, icon, name, removeHotKeyMap, provided }) => {
  const iconSrc = icon.startsWith("data:")
    ? icon
    : `data:image/png;base64,${icon}`;
  return (
    <div
      ref={provided.innerRef}
      className="card__container"
      id={cardId}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className="card">
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
