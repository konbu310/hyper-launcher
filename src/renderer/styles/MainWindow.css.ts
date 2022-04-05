import { style } from "@vanilla-extract/css";

export const mainWindow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vh",
  borderRadius: "5px",
  backgroundImage: "linear-gradient(45deg, #fa709a 0%, #fee140 100%)",
});
