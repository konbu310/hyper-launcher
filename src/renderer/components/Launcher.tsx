import * as React from "react";
import { css } from "emotion";
import { initialData, AppInfo, Shortcut } from "../util/initial-data";
import { Box } from "./Box";
import { Card } from "./Card";
import { nonNullableObj } from "../util/guard";

// ______________________________________________________
//
// @ Types
//
type DraggedItem = {
  boxKey: string | null;
  cardIndex: number | null;
};

// ______________________________________________________
//
// @ Styles
//
const styles = {
  LauncherSection: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 300px;
  `,
  CardContainer: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: scroll;
  `
};

// ______________________________________________________
//
// @ Launcher View
//
export const Launcher: React.FC = () => {
  // ショートカットのデータ
  const [shortcutData, setShortcutData] = React.useState<Shortcut>(initialData);

  // ドラッグ中アイテムのデータ
  const draggedItem = React.useRef<DraggedItem>({
    boxKey: null,
    cardIndex: null
  });

  // ドラッグ開始イベントのハンドラ
  const onDragStart = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    draggedItem.current = { boxKey, cardIndex };
    const dragElm = document.querySelector(`#${cardId}`);
    dragElm && ev.dataTransfer.setDragImage(dragElm, 0, 0);
    ev.dataTransfer.effectAllowed = "move";
  };

  // ドラッグ交差イベントのハンドラ
  const onDragEnter = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    if (draggedItem.current === { boxKey, cardIndex }) return;

    if (nonNullableObj(draggedItem.current)) {
      const newShortcutData = { ...shortcutData };
      const removedData = newShortcutData[draggedItem.current.boxKey].splice(
        draggedItem.current.cardIndex,
        1
      );
      newShortcutData[boxKey].splice(cardIndex, 0, ...removedData);
      setShortcutData(newShortcutData);
      draggedItem.current = { boxKey, cardIndex };
    }
  };

  // ドラッグ終了イベントのハンドラ
  const onDragEnd = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    draggedItem.current = { boxKey: null, cardIndex: null };
  };

  // View
  return (
    <section className={styles.LauncherSection}>
      {Object.keys(shortcutData).map((boxKey, boxIndex) => (
        <Box
          key={`box-${boxKey}`}
          boxId={`box-${boxKey}`}
          header={`Ctrl + ${boxKey}`}
        >
          <div className={styles.CardContainer}>
            {shortcutData[boxKey].map((app, cardIndex) => (
              <Card
                key={`card-${boxKey}${cardIndex}`}
                cardId={`card-${boxKey}${cardIndex}`}
                icon={app.icon}
                name={app.name}
                onDragStart={onDragStart(boxKey, cardIndex)}
                onDragEnter={onDragEnter(boxKey, cardIndex)}
                onDragEnd={onDragEnd(boxKey, cardIndex)}
              />
            ))}
          </div>
        </Box>
      ))}
    </section>
  );
};
