import * as React from "react";
import { css } from "goober";
import { Box } from "../components/Box";
import { Card, EmptyCard } from "../components/Card";
import { nonNullableObj } from "../guard";
import { AppInfo, HotKeyMap } from "../../common/interface";
import { useEffect, useState, FC, DragEvent } from "react";
import { invokeGetHotKeyMap, invokeSetHotKeyMap } from "../ipcRenderer";

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
  `,
};

// ______________________________________________________
//
// @ View
//
export const IndexPage: FC = () => {
  const [hotKeyData, setHotKeyData] = useState<HotKeyMap | null>(null);
  const [draggedItem, setDraggedItem] = useState<DraggedItem>({
    boxKey: null,
    cardIndex: null,
  });

  useEffect(() => {
    invokeGetHotKeyMap().then((res) => {
      if (res) {
        setHotKeyData(res);
      }
    });
  }, []);

  useEffect(() => {
    document.ondragover = document.ondrop = (ev) => {
      ev.preventDefault();
      return;
    };
  }, []);

  if (!hotKeyData) {
    return <div>Loading...</div>;
  }

  const onDragStart = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: DragEvent<HTMLElement>
  ) => {
    setDraggedItem({
      boxKey,
      cardIndex,
    });
    const dragElm = document.querySelector(`#${cardId}`);
    dragElm && ev.dataTransfer.setDragImage(dragElm, 0, 0);
    ev.dataTransfer.effectAllowed = "move";
  };

  const onDragEnter = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: DragEvent<HTMLElement>
  ) => {
    if (draggedItem.boxKey === boxKey && draggedItem.cardIndex === cardIndex)
      return;
    if (ev.dataTransfer.effectAllowed === "all") return;

    if (nonNullableObj(draggedItem)) {
      const newData = { ...hotKeyData };
      const removed = newData[draggedItem.boxKey].splice(
        draggedItem.cardIndex,
        1
      );
      newData[boxKey].splice(cardIndex, 0, ...removed);
      invokeSetHotKeyMap(newData).then(() => {
        setHotKeyData(newData);
        setDraggedItem({
          boxKey,
          cardIndex,
        });
      });
    }
  };

  const onDragEnd = (boxKey: string, cardIndex: number) => (
    cardId: string,
    ev: DragEvent<HTMLElement>
  ) => {
    setDraggedItem({
      boxKey: null,
      cardIndex: null,
    });
  };

  const updateHotKeyMap = (boxKey: string) => (newApp: AppInfo) => {
    const newData = { ...hotKeyData };
    newData[boxKey].push(newApp);
    invokeSetHotKeyMap(newData).then(() => {
      setHotKeyData(newData);
    });
  };

  const removeHotKeyMap = (boxKey: string, cardIndex: number) => {
    const newData = { ...hotKeyData };
    newData[boxKey].splice(cardIndex, 1);
    invokeSetHotKeyMap(newData).then(() => {
      setHotKeyData(newData);
    });
  };

  // View
  return (
    <div className={styles.LauncherSection}>
      {hotKeyData &&
        Object.entries(hotKeyData).map(([boxKey, appList], boxIndex) => (
          <Box
            key={`box-${boxKey}`}
            boxId={`box-${boxKey}`}
            header={`Ctrl + ${boxKey}`}
            updateHotKeyMap={updateHotKeyMap(boxKey)}
          >
            <div className={styles.CardContainer}>
              {hotKeyData[boxKey].length === 0 ? (
                <EmptyCard
                  cardId={`empty-card-${boxKey}0`}
                  onDragEnter={onDragEnter(boxKey, 0)}
                />
              ) : (
                appList.map((app, cardIndex) => (
                  <Card
                    key={`card-${app.name}`}
                    cardId={`card-${app.name}`}
                    icon={app.icon || ""}
                    name={app.name}
                    removeHotKeyMap={() => removeHotKeyMap(boxKey, cardIndex)}
                    onDragStart={onDragStart(boxKey, cardIndex)}
                    onDragEnter={onDragEnter(boxKey, cardIndex)}
                    onDragEnd={onDragEnd(boxKey, cardIndex)}
                  />
                ))
              )}
            </div>
          </Box>
        ))}
    </div>
  );
};
