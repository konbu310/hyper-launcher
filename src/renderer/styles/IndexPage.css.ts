import { style } from "@vanilla-extract/css";

export const launcherSection = style({
  width: "900px",
  height: "900px",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridAutoRows: "300px",
});

export const cardContainer = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  overflowY: "auto",
  overflowX: "hidden",
});
