import * as React from "react";
import { FC, useCallback, useState } from "react";
import { css } from "goober";
import { CSSTransition } from "react-transition-group";

// ______________________________________________________
//
// @ Types
//
type CardProps = {
  cardId: string;
  icon: string;
  name: string;
  removeHotKeyMap: Function;
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
    background-color: #ffffff;
    margin: 5px;
    padding: 2px;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 0 5px lightgrey;
    flex: 0 0 60px;
    -webkit-app-region: no-drag;
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
    visibility: hidden;
    font-size: 25px;
    margin-left: 10px;
    flex-basis: 30px;
    color: rgba(192, 57, 43, 0.9);
    cursor: pointer;
    &:hover {
      color: rgba(217, 136, 128, 0.9);
    }
    &:active {
      color: rgba(169, 50, 38, 0.9);
    }
  `,
  RemoveButtonAnim: {
    enter: css`
      visibility: visible;
      opacity: 0;
    `,
    enterActive: css`
      opacity: 1;
      transition: opacity 300ms linear;
    `,
    enterDone: css`
      visibility: visible;
    `,
    exit: css`
      visibility: visible;
      opacity: 1;
    `,
    exitActive: css`
      opacity: 0;
      transition: opacity 300ms linear;
    `,
    exitDone: css`
      visibility: hidden;
    `,
  },
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
  const [isShowDeleteButton, setIsShowDeleteButton] = useState<boolean>(false);

  const showDeleteButton = useCallback(() => setIsShowDeleteButton(true), [
    setIsShowDeleteButton,
  ]);

  const hideDeleteButton = useCallback(() => setIsShowDeleteButton(false), [
    setIsShowDeleteButton,
  ]);

  return (
    <section
      className={styles.Card}
      id={props.cardId}
      draggable
      onDragStart={(ev) => props.onDragStart(props.cardId, ev)}
      onDragEnter={(ev) => props.onDragEnter(props.cardId, ev)}
      onDragEnd={(ev) => props.onDragEnd(props.cardId, ev)}
      onMouseEnter={showDeleteButton}
      onMouseLeave={hideDeleteButton}
    >
      <div className={styles.CardContent}>
        <img
          className={styles.CardIcon}
          src={`data:image/png;base64,${props.icon}`}
          alt="application icon"
        />
        <span className={styles.CardText}>{props.name}</span>
        <CSSTransition
          classNames={{ ...styles.RemoveButtonAnim }}
          timeout={300}
          in={isShowDeleteButton}
        >
          <span
            className={styles.RemoveButton}
            onClick={(ev) => props.removeHotKeyMap()}
          >
            ×
          </span>
        </CSSTransition>
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
