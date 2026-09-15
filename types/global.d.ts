import type { IpcRendererEvents } from "../electron/preload";

declare global {
  interface Window {
    api: IpcRendererEvents;
  }
}
