import { useCallback, useReducer } from "react";
import { AppInfo, HotkeyMap } from "../common/interface";
import { constate } from "./constate";
import update from "immutability-helper";

type Action =
  | {
      type: "add";
      boxKey: string;
      app: AppInfo;
    }
  | {
      type: "remove";
      boxKey: string;
      cardIndex: number;
    }
  | {
      type: "toggle";
      boxKey: string;
      cardIndex: number;
    };

function reducer(state: HotkeyMap, action: Action) {
  switch (action.type) {
    case "add":
      return update(state, {
        [action.boxKey]: { $push: [action.app] },
      });
    case "remove":
      return update(state, {
        [action.boxKey]: { $splice: [[action.cardIndex, 1]] },
      });
    case "toggle":
      return update(state, {
        [action.boxKey]: {
          [action.cardIndex]: {
            $toggle: ["disabled"],
          },
        },
      });
    default:
      return state;
  }
}

const useHotkeyMapDef = ({ hotKeyMap }: { hotKeyMap: HotkeyMap }) => {
  const [state, dispatch] = useReducer(reducer, hotKeyMap);

  const addApp = useCallback((boxKey: string, app: AppInfo) => {
    dispatch({ type: "add", boxKey, app });
  }, []);

  const removeApp = useCallback((boxKey: string, cardIndex: number) => {
    dispatch({ type: "remove", boxKey, cardIndex });
  }, []);

  const toggleDisable = useCallback((boxKey: string, cardIndex: number) => {
    dispatch({ type: "toggle", boxKey, cardIndex });
  }, []);

  return {
    state: { hotKeyMap: state },
    actions: { addApp, removeApp, toggleDisable },
  };
};

export const [HotkeyMapProvider, useHotkeyMap, useHotkeyMapActions] = constate(
  useHotkeyMapDef,
  (v) => v.state,
  (v) => v.actions
);
