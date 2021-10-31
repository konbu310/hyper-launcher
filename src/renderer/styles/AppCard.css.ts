import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const cardContainer = style({
  margin: "10px",
  padding: "5px",
  width: "280px",
  borderRadius: "5px",
  backgroundColor: vars.color.background,
  border: "1px solid lightgrey",
  display: "flex",
  flexDirection: "column",
  boxShadow: "1.2px 2.4px 2.4px hsl(0deg 0% 0% / 0.46)",
});

export const header = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "0 0.25rem",
  color: "black",
});

export const addButton = style({
  cursor: "pointer",
});

export const cardMain = style({
  backgroundColor: vars.color.background,
  margin: "5px",
  padding: "2px",
  borderRadius: "5px",
  border: "1px solid lightgrey",
  position: "relative",
  flex: "0 0 60px",
  cursor: "pointer",
  boxShadow: "0.8px 1.6px 1.6px hsl(0deg 0% 0% / 0.48)",
});

export const cardContent = style({
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
});

export const appIcon = style({
  verticalAlign: "middle",
  flexBasis: "40px",
  height: "40px",
  margin: "0 10px 0 5px",
});

export const cardText = style({
  overflow: "hidden",
  flexBasis: "210px",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
});

export const removeButton = style({
  fontSize: "25px",
  marginLeft: "10px",
  flexBasis: "30px",
  color: "rgba(192, 57, 43, 0.9)",
  cursor: "pointer",
  opacity: 0,
  transition: "all 200ms",
  ":hover": {
    color: "rgba(217, 136, 128, 0.9)",
    opacity: 1,
    transition: "all 200ms",
  },
  selectors: {
    [`${cardMain}:hover &`]: {
      opacity: 1,
    },
  },
});
