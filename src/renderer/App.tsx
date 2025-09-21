import { FC } from "react";
import { Box } from "./components/Box";
import { useHotkeyMap } from "./useHotkeyMap";

export const App: FC = () => {
  const { hotkeyMap } = useHotkeyMap();

  return (
    <div className="launcher-section">
      {Object.entries(hotkeyMap).map(([boxKey, appList]) => (
        <Box key={boxKey} boxKey={boxKey} appList={appList} />
      ))}
    </div>
  );
};
