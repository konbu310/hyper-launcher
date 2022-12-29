import React from "react";
import { createRoot } from "react-dom/client";
import { IndexPage } from "./pages/IndexPage";
import { mainWindow } from "./styles/MainWindow.css";
import "./styles/global.css";

const MainWindow = () => {
  return (
    <main className={mainWindow}>
      <IndexPage />
    </main>
  );
};

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(<MainWindow />);
