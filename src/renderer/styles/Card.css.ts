import { style } from "@vanilla-extract/css";

export const card = style({
  backgroundColor: "#ecf0f1",
  margin: "5px",
  padding: "2px",
  borderRadius: "5px",
  position: "relative",
  boxShadow: "0 0 5px lightgrey",
  flex: "0 0 60px",
  cursor: "pointer",
});

export const cardContainer = style({
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
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
    color: "rgba(217, 136, 128, 0.91)",
    opacity: 1,
    transition: "all 200ms",
  },
  ":active": {
    color: "rgba(169, 50, 38, 0.9)",
  },
});
