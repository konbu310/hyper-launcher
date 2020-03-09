import * as React from "react";
import { css } from "emotion";
import { Box } from "./Box";
import { Card, EmptyCard } from "./Card";
import { nonNullableObj } from "../util/guard";
import { Shortcut, App, StoreKey } from "../../share/interface";
import { remote } from "electron";
import Store from "electron-store";

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
  const store = remote.getGlobal("store") as Store<StoreKey>;

  const [shortcutData, setShortcutData] = React.useState<Shortcut>(
    store.get("shortcut")
  );
  const [draggedItem, setDraggedItem] = React.useState<DraggedItem>({
    boxKey: null,
    cardIndex: null
  });

  React.useEffect(() => {
    document.ondragover = document.ondrop = ev => {
      ev.preventDefault();
      return;
    };
  }, []);

  const onDragStart = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    setDraggedItem({
      boxKey,
      cardIndex
    });
    const dragElm = document.querySelector(`#${cardId}`);
    dragElm && ev.dataTransfer.setDragImage(dragElm, 0, 0);
    ev.dataTransfer.effectAllowed = "move";
  };

  const onDragEnter = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    if (draggedItem.boxKey === boxKey && draggedItem.cardIndex === cardIndex)
      return;
    if (ev.dataTransfer.effectAllowed === "all") return;

    if (nonNullableObj(draggedItem)) {
      const newData = { ...shortcutData };
      const removed = newData[draggedItem.boxKey].splice(
        draggedItem.cardIndex,
        1
      );
      newData[boxKey].splice(cardIndex, 0, ...removed);
      setShortcutData(newData);
      store.set("shortcut", newData);

      setDraggedItem({
        boxKey,
        cardIndex
      });
    }
  };

  const onDragEnd = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: React.DragEvent<HTMLElement>
  ) => {
    setDraggedItem({
      boxKey: null,
      cardIndex: null
    });
  };

  const updateShortcut = (boxKey: string) => (newApp: App) => {
    const newData = { ...shortcutData };
    newData[boxKey].push(newApp);
    setShortcutData(newData);
    store.set("shortcut", newData);
  };

  const removeShortcut = (boxKey: string, cardIndex: number) => {
    const newData = { ...shortcutData };
    newData[boxKey].splice(cardIndex, 1);
    setShortcutData(newData);
    store.set("shortcut", newData);
  };

  // View
  return (
    <section className={styles.LauncherSection}>
      {shortcutData &&
        Object.entries(shortcutData).map(([boxKey, appList], boxIndex) => (
          <Box
            key={`box-${boxKey}`}
            boxId={`box-${boxKey}`}
            header={`Ctrl + ${boxKey}`}
            updateShortcut={updateShortcut(boxKey)}
          >
            <div className={styles.CardContainer}>
              {shortcutData[boxKey].length === 0 ? (
                <EmptyCard
                  cardId={`empty-card-${boxKey}0`}
                  onDragEnter={onDragEnter(boxKey, 0)}
                />
              ) : (
                appList.map((app, cardIndex) => (
                  <Card
                    key={`card-${app.name}`}
                    cardId={`card-${app.name}`}
                    icon={app.icon}
                    name={app.name}
                    removeShortcut={() => removeShortcut(boxKey, cardIndex)}
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
