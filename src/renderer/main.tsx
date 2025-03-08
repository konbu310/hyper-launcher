import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { IconProvioder } from "./components/Icon";
import "./styles/entry.css";
import { HotkeyMapProvider } from "./useHotkeyMap";

window.api.getHotkeyMap().then((data) => {
  const container = document.getElementById("root")!;
  const root = createRoot(container);
  document.getElementById("root-loader")?.remove();
  root.render(
    <StrictMode>
      <HotkeyMapProvider hotKeyMap={data}>
        <main className="main-window">
          <IconProvioder />
          <App />
        </main>
      </HotkeyMapProvider>
    </StrictMode>
  );
});
