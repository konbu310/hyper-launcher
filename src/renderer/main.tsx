import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { IconProvioder } from "./components/Icon";
import "./styles/entry.css";
import { HotKeyMapProvider } from "./useHotKeyMap";

window.api.getHotKeyMap().then((data) => {
  const container = document.getElementById("root")!;
  const root = createRoot(container);
  document.getElementById("root-loader")?.remove();
  root.render(
    <StrictMode>
      <HotKeyMapProvider hotKeyMap={data}>
        <main className="main-window">
          <IconProvioder />
          <App />
        </main>
      </HotKeyMapProvider>
    </StrictMode>
  );
});
