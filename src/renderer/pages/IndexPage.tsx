import React from "react";
import { Box } from "../components/Box";
import { Card } from "../components/Card";
import { AppInfo, HotKeyMap } from "../../common/interface";
import { useEffect, useState, FC } from "react";
import {
  DragDropContext,
  DragDropContextProps,
  Draggable,
  Droppable,
} from "react-beautiful-dnd";
import update from "immutability-helper";
import { launcherSection, cardContainer } from "../styles/IndexPage.css";

const { getHotKeyMap, setHotKeyMap } = window.electron!;

export const IndexPage: FC = () => {
  const [hotKeyData, setHotKeyData] = useState<HotKeyMap | null>(null);

  const onDragEnd: DragDropContextProps["onDragEnd"] = async (result) => {
    const { source, destination } = result;
    if (!(destination && hotKeyData)) {
      return;
    }
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
        [destKey]: { $splice: [[destIndex, 0, srcItem]] },
      });
    }
    setHotKeyData(nData);
    setHotKeyMap(nData);
  };

  const updateHotKeyMap = (boxKey: string) => (newApp: AppInfo) => {
    const nData = { ...hotKeyData };
    nData[boxKey].push(newApp);
    setHotKeyData(nData);
    setHotKeyMap(nData);
  };

  const removeHotKeyMap = (boxKey: string, cardIndex: number) => {
    const nData = { ...hotKeyData };
    nData[boxKey].splice(cardIndex, 1);
    setHotKeyData(nData);
    setHotKeyMap(nData);
  };

  useEffect(() => {
    getHotKeyMap().then((res) => {
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
      <div className={launcherSection}>
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
                  className={cardContainer}
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
