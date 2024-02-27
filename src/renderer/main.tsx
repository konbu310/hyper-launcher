import React, { FC } from "react";
import { createRoot } from "react-dom/client";
import "./styles/entry.css";
import { IconProvioder } from "./components/Icon";
import { App } from "./App";

const Root: FC = () => {
  return (
    <main className="main-window">
      <IconProvioder />
      <App />
    </main>
  );
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<Root />);
