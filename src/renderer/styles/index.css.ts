import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const mainWindow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  borderRadius: "5px",
  backgroundColor: vars.color.background,
});
