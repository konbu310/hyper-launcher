import { style } from "@vanilla-extract/css";

export const card = style({
  backgroundColor: "#fff",
  border: "1px solid rgb(216, 222, 227)",
  borderRadius: "5px",
  boxShadow: "0 1px 0 rgba(27,31,36,0.04)",
  margin: "5px",
  padding: "2px",
  position: "relative",
  flex: "0 0 60px",
  cursor: "pointer",
  ":hover": {
    boxShadow: "0 3px 6px rgba(140,149,159,0.15)",
  },
  // @ts-ignore
  "-webkit-app-region": "no-drag",
});

export const cardContainer = style({
  height: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const cardIcon = style({
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
  fontSize: "0.75rem",
  fontWeight: "500",
  color: "rgb(0,0,0)",
});

export const removeButton = style({
  color: "rgba(192, 57, 43, 0.9)",
  cursor: "pointer",
  opacity: 0,
  transition: "all 200ms",
  ":hover": {
    color: "rgba(217, 136, 128, 0.91)",
    opacity: 1,
    transition: "all 200ms",
  },
  ":active": {
    color: "rgba(169, 50, 38, 0.9)",
  },
  selectors: {
    [`${card}:hover &`]: {
      opacity: 1,
    },
  },
});
