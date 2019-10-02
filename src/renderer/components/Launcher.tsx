import * as React from "react";
import { css } from "emotion";
import { initialData, AppInfo, Shortcut } from "../util/initial-data";
import { Box } from "./Box";
import { Card, EmptyCard } from "./Card";
import { nonNullableObj } from "../util/guard";
import { useImmer } from "use-immer";

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
    width: 900px;
    height: 900px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 300px;
  `,
  CardContainer: css`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  `
};

// ______________________________________________________
//
// @ Launcher View
//
export const Launcher: React.FC = () => {
  // ショートカットのデータ
  const [shortcutData, setShortcutData] = useImmer<Shortcut>(initialData);
  const [draggedItem, setDraggedItem] = useImmer<DraggedItem>({
    boxKey: null,
    cardIndex: null
  });

  React.useEffect(() => {
    document.ondragover = document.ondrop = ev => {
      ev.preventDefault();
      return;
    };
  }, []);

  // ドラッグ開始イベントのハンドラ
  const onDragStart = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    setDraggedItem(draft => {
      draft.boxKey = boxKey;
      draft.cardIndex = cardIndex;
    });
    const dragElm = document.querySelector(`#${cardId}`);
    dragElm && ev.dataTransfer.setDragImage(dragElm, 0, 0);
    ev.dataTransfer.effectAllowed = "move";
  };

  // ドラッグ交差イベントのハンドラ
  const onDragEnter = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    if (draggedItem === { boxKey, cardIndex }) return;
    if (ev.dataTransfer.effectAllowed === "all") return;

    if (nonNullableObj(draggedItem)) {
      setShortcutData(draft => {
        const removedData = draft[draggedItem.boxKey].splice(
          draggedItem.cardIndex,
          1
        );
        draft[boxKey].splice(cardIndex, 0, ...removedData);
      });
    }

    setDraggedItem(draft => {
      draft.boxKey = boxKey;
      draft.cardIndex = cardIndex;
    });
  };

  // ドラッグ終了イベントのハンドラ
  const onDragEnd = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    setDraggedItem(draft => {
      draft.boxKey = draft.cardIndex = null;
    });
  };

  const updateShortcutData = (boxKey: string) => (newApp: AppInfo) => {
    setShortcutData(draft => {
      draft[boxKey].push(newApp);
    });
  };

  // View
  return (
    <section className={styles.LauncherSection}>
      {Object.keys(shortcutData).map((boxKey, boxIndex) => (
        <Box
          key={`box-${boxKey}`}
          boxId={`box-${boxKey}`}
          header={`Ctrl + ${boxKey}`}
          updateShortcutData={updateShortcutData(boxKey)}
        >
          <div className={styles.CardContainer}>
            {shortcutData[boxKey].length === 0 ? (
              <EmptyCard
                cardId={`card-${boxKey}0`}
                onDragEnter={onDragEnter(boxKey, 0)}
              />
            ) : (
              shortcutData[boxKey].map((app, cardIndex) => (
                <Card
                  key={`card-${app.name}`}
                  cardId={`card-${boxKey}${cardIndex}`}
                  icon={app.icon}
                  name={app.name}
                  onDragStart={onDragStart(boxKey, cardIndex)}
                  onDragEnter={onDragEnter(boxKey, cardIndex)}
                  onDragEnd={onDragEnd(boxKey, cardIndex)}
                />
              ))
            )}
          </div>
        </Box>
      ))}
    </section>
  );
};
