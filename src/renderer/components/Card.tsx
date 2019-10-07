import * as React from "react";
import { css } from "emotion";

// ______________________________________________________
//
// @ Types
//
type CardProps = {
  cardId: string;
  icon: string;
  name: string;
  onDragStart: Function;
  onDragEnter: Function;
  onDragEnd: Function;
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
  `,
  CardIcon: css`
    vertical-align: middle;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin: 0 20px 0 5px;
  `,
  CardContent: css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  `,
  CardText: css`
    overflow: hidden;
    width: 250px;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  EmptyCard: css`
    position: relative;
    flex: 0 0 180px;
  `
};

// ______________________________________________________
//
// @ Card View
//
export const Card: React.FC<CardProps> = props => {
  return (
    <div
      className={styles.Card}
      id={props.cardId}
      draggable
      onDragStart={ev => props.onDragStart(props.cardId, ev)}
      onDragEnter={ev => props.onDragEnter(props.cardId, ev)}
      onDragEnd={ev => props.onDragEnd(props.cardId, ev)}
    >
      <div className={styles.CardContent}>
        <p className={styles.CardText}>
          <img
            className={styles.CardIcon}
            src={`data:image/png;base64,${props.icon}`}
            alt="application icon"
          />
          {props.name}
        </p>
      </div>
    </div>
  );
};

// ______________________________________________________
//
// @ Empty Card
//
export const EmptyCard: React.FC<EmptyCardProps> = props => {
  return (
    <div
      id={props.cardId}
      className={styles.EmptyCard}
      onDragEnter={ev => props.onDragEnter(props.cardId, ev)}
    />
  );
};
