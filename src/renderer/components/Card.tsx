import React from "react";
import { FC } from "react";
import { css } from "goober";
import { DraggableProvided } from "react-beautiful-dnd";

// ______________________________________________________
//
// @ Types
//
type CardProps = {
  cardId: string;
  icon: string;
  name: string;
  removeHotKeyMap: VoidFunction;
  provided: DraggableProvided;
};

type EmptyCardProps = {
  cardId: string;
  onDragEnter: Function;
};

// ______________________________________________________
//
// @ Styles
//
const styles = {
  Card: css`
    background-color: #ecf0f1;
    margin: 5px;
    padding: 2px;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 0 5px lightgrey;
    flex: 0 0 60px;
    -webkit-app-region: no-drag;
    cursor: pointer;
    &:hover {
      span {
        opacity: 1;
      }
    }
  `,
  CardContent: css`
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  `,
  CardIcon: css`
    vertical-align: middle;
    flex-basis: 40px;
    height: 40px;
    margin: 0 10px 0 5px;
  `,
  CardText: css`
    overflow: hidden;
    flex-basis: 210px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  RemoveButton: css`
    font-size: 25px;
    margin-left: 10px;
    flex-basis: 30px;
    color: rgba(192, 57, 43, 0.9);
    cursor: pointer;
    opacity: 0;
    transition: all 200ms;
    &:hover {
      color: rgba(217, 136, 128, 0.9);
      opacity: 1;
      transition: all 200ms;
    }
    &:active {
      color: rgba(169, 50, 38, 0.9);
    }
  `,
  EmptyCard: css`
    position: relative;
    flex: 0 0 180px;
  `,
};

// ______________________________________________________
//
// @ View
//
export const Card: FC<CardProps> = (props) => {
  return (
    <section
      ref={props.provided.innerRef}
      className={styles.Card}
      id={props.cardId}
      {...props.provided.draggableProps}
      {...props.provided.dragHandleProps}
    >
      <div className={styles.CardContent}>
        <img
          className={styles.CardIcon}
          src={`data:image/png;base64,${props.icon}`}
          alt="application icon"
        />
        <span className={styles.CardText}>{props.name}</span>
        <span className={styles.RemoveButton} onClick={props.removeHotKeyMap}>
          ×
        </span>
      </div>
    </section>
  );
};

export const EmptyCard: FC<EmptyCardProps> = (props) => {
  return (
    <div
      id={props.cardId}
      className={styles.EmptyCard}
      onDragEnter={(ev) => props.onDragEnter(props.cardId, ev)}
    />
  );
};
