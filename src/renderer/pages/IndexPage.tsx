import React from "react";
import { css } from "goober";
import { Box } from "../components/Box";
import { Card } from "../components/Card";
import { AppInfo, HotKeyMap } from "../../common/interface";
import { useEffect, useState, FC } from "react";
import { invokeGetHotKeyMap, invokeSetHotKeyMap } from "../ipcRenderer";
import {
  DragDropContext,
  DragDropContextProps,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import update from "immutability-helper";

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

export const IndexPage: FC = () => {
  const [hotKeyData, setHotKeyData] = useState<HotKeyMap | null>(null);

  const onDragEnd: DragDropContextProps["onDragEnd"] = async (result) => {
    const { source, destination } = result;
    if (!destination || !hotKeyData) return;
    const { droppableId: srcKey, index: srcIndex } = source;
    const { droppableId: destKey, index: destIndex } = destination;
    const srcItem = hotKeyData[srcKey][srcIndex];
    let nData: HotKeyMap;
    if (srcKey === destKey) {
      nData = update(hotKeyData, {
        [srcKey]: {
          $splice: [
            [srcIndex, 1],
            [destIndex, 0, srcItem],
          ],
        },
      });
    } else {
      nData = update(hotKeyData, {
        [srcKey]: { $splice: [[srcIndex, 1]] },
        [destKey]: { $splice: [[destIndex, 1, srcItem]] },
      });
    }
    setHotKeyData(nData);
    invokeSetHotKeyMap(nData);
  };

  const updateHotKeyMap = (boxKey: string) => (newApp: AppInfo) => {
    const nData = { ...hotKeyData };
    nData[boxKey].push(newApp);
    setHotKeyData(nData);
    invokeSetHotKeyMap(nData);
  };

  const removeHotKeyMap = (boxKey: string, cardIndex: number) => {
    const nData = { ...hotKeyData };
    nData[boxKey].splice(cardIndex, 1);
    setHotKeyData(nData);
    invokeSetHotKeyMap(nData);
  };

  useEffect(() => {
    invokeGetHotKeyMap().then((res) => {
      if (res) {
        setHotKeyData(res);
      }
    });
  }, []);

  if (!hotKeyData) {
    return <div>Loading...</div>;
  }

  // View
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.LauncherSection}>
        {Object.entries(hotKeyData).map(([boxKey, appList]) => (
          <Droppable key={boxKey} droppableId={boxKey}>
            {(provided) => (
              <Box
                key={`box-${boxKey}`}
                boxId={`box-${boxKey}`}
                header={`Ctrl + ${boxKey}`}
                updateHotKeyMap={updateHotKeyMap(boxKey)}
                provided={provided}
              >
                <div
                  ref={provided.innerRef}
                  className={styles.CardContainer}
                  {...provided.droppableProps}
                >
                  {appList.map((app, cardIndex) => (
                    <Draggable
                      key={app.path}
                      draggableId={app.path}
                      index={cardIndex}
                    >
                      {(provided) => (
                        <Card
                          key={`card-${app.name}`}
                          cardId={`card-${app.name}`}
                          icon={app.icon || ""}
                          name={app.name}
                          removeHotKeyMap={() =>
                            removeHotKeyMap(boxKey, cardIndex)
                          }
                          provided={provided}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </Box>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
