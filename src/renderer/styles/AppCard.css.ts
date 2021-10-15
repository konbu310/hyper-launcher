import { style } from "@vanilla-extract/css";
import { vars } from "./theme.css";

export const cardContainer = style({
  margin: "10px",
  padding: "5px",
  width: "280px",
  borderRadius: "5px",
  backgroundColor: vars.color.background,
  boxShadow: "0 0 2px lightgrey",
  border: "1px solid #fff",
  display: "flex",
  flexDirection: "column",
});

export const header = style({
  margin: "10px 20px",
  fontWeight: "bold",
});

export const addButton = style({
  float: "right",
  cursor: "pointer",
});

export const cardMain = style({
  backgroundColor: vars.color.background,
  margin: "5px",
  padding: "2px",
  borderRadius: "5px",
  position: "relative",
  boxShadow: "0 0 5px lightgrey",
  flex: "0 0 60px",
  cursor: "pointer",
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
