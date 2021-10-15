import React from "react";
import { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import {
  appIcon,
  cardContent,
  cardMain,
  cardText,
  removeButton,
} from "../styles/AppCard.css";

export const Card: FC<{
  cardId: string;
  icon: string;
  name: string;
  draggableProvided: DraggableProvided;
  removeHotKeyMap: VoidFunction;
}> = (props) => {
  const { draggableProvided } = props;
  const iconSrc = `data:image/png;base64,${props.icon}`;

  return (
    <section
      ref={draggableProvided.innerRef}
      className={cardMain}
      id={props.cardId}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
    >
      <div className={cardContent}>
        <img src={iconSrc} alt="application icon" className={appIcon} />
        <span className={cardText}>{props.name}</span>
        <span className={removeButton} onClick={props.removeHotKeyMap}>
          ×
        </span>
      </div>
    </section>
  );
};
