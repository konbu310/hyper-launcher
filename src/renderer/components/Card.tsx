import React, { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import {
  card,
  cardContainer,
  cardIcon,
  cardText,
  removeButton,
} from "../styles/Card.css";
import "css.gg/icons/css/remove.css";

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
        <div>
          <i></i>
        </div>
        <img
          className={cardIcon}
          src={
            props.icon.startsWith("data:")
              ? props.icon
              : `data:image/png;base64,${props.icon}`
          }
          alt="application icon"
        />
        <span className={cardText}>{props.name}</span>
        <div onClick={props.removeHotKeyMap} className={removeButton}>
          <i className="gg-remove" />
        </div>
      </div>
    </section>
  );
};
