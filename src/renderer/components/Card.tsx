import React from "react";
import { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import {
  card,
  cardContainer,
  cardIcon,
  cardText,
  removeButton,
} from "../styles/Card.css";

type CardProps = {
  cardId: string;
  icon: string;
  name: string;
  removeHotKeyMap: VoidFunction;
  provided: DraggableProvided;
};

export const Card: FC<CardProps> = (props) => {
  return (
    <section
      ref={props.provided.innerRef}
      className={card}
      id={props.cardId}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <div className={cardContainer}>
        <img
          className={cardIcon}
          src={`data:image/png;base64,${props.icon}`}
          alt="application icon"
        />
        <span className={cardText}>{props.name}</span>
        <span className={removeButton} onClick={props.removeHotKeyMap}>
          ×
        </span>
      </div>
    </section>
  );
};
