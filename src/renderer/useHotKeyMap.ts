import { AppInfo, HotkeyMap } from "../common/interface";
import constate from "constate";
import { useCallback, useReducer } from "react";

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
    case "add": {
      const appList = state[action.boxKey] ?? [];
      return { ...state, [action.boxKey]: [...appList, action.app] };
    }
    case "remove": {
      const appList = state[action.boxKey] ?? [];
      return {
        ...state,
        [action.boxKey]: appList.filter((_, index) => index !== action.cardIndex),
      };
    }
    case "toggle": {
      const appList = state[action.boxKey] ?? [];
      return {
        ...state,
        [action.boxKey]: appList.map((app, index) =>
          index === action.cardIndex ? { ...app, disabled: !app.disabled } : app,
        ),
      };
    }
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
  (v) => v.actions,
);
