import { FC } from "react";
import { Box } from "./components/Box";
import { useHotKeyMap } from "./useHotKeyMap";

export const App: FC = () => {
  const { hotKeyMap } = useHotKeyMap();

  return (
    <div className="launcher-section">
      {Object.entries(hotKeyMap).map(([boxKey, appList]) => (
        <Box key={boxKey} boxKey={boxKey} appList={appList} />
      ))}
    </div>
  );
};
