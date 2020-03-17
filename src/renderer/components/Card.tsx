import * as React from "react";
import { css } from "emotion";
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
    background-color: #ecf0f1;
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
  EmptyCard: css`
    position: relative;
    flex: 0 0 180px;
  `,
  RemoveButtonEnter: css`
    visibility: visible;
    opacity: 0;
  `,
  RemoveButtonEnterActive: css`
    opacity: 1;
    transition: opacity 300ms linear;
  `,
  RemoveButtonEnterDone: css`
    visibility: visible;
  `,
  RemoveButtonExit: css`
    visibility: visible;
    opacity: 1;
  `,
  RemoveButtonExitActive: css`
    opacity: 0;
    transition: opacity 300ms linear;
  `,
  RemoveButtonExitDone: css`
    visibility: hidden;
  `
};

// ______________________________________________________
//
// @ Card View
//
export const Card: React.FC<CardProps> = props => {
  const [isShow, setIsShow] = React.useState<boolean>(false);

  const removeButtonClassname = {
    enter: styles.RemoveButtonEnter,
    enterActive: styles.RemoveButtonEnterActive,
    enterDone: styles.RemoveButtonEnterDone,
    exit: styles.RemoveButtonExit,
    exitActive: styles.RemoveButtonExitActive,
    exitDone: styles.RemoveButtonExitDone
  };

  return (
    <section
      className={styles.Card}
      id={props.cardId}
      draggable
      onDragStart={ev => props.onDragStart(props.cardId, ev)}
      onDragEnter={ev => props.onDragEnter(props.cardId, ev)}
      onDragEnd={ev => props.onDragEnd(props.cardId, ev)}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      <div className={styles.CardContent}>
        <img
          className={styles.CardIcon}
          src={`data:image/png;base64,${props.icon}`}
          alt="application icon"
        />
        <span className={styles.CardText}>{props.name}</span>
        <CSSTransition
          classNames={removeButtonClassname}
          timeout={300}
          in={isShow}
        >
          <span
            className={styles.RemoveButton}
            onClick={ev => props.removeHotKeyMap()}
          >
            ×
          </span>
        </CSSTransition>
      </div>
    </section>
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
