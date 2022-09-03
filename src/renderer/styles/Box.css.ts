import { style } from "@vanilla-extract/css";

export const box = style({
  margin: "10px",
  padding: "5px",
  width: "280px",
  borderRadius: "5px",
  backgroundColor: "rgb(245, 248, 250)",
  border: "1px solid rgb(216, 222, 227)",
  display: "flex",
  flexDirection: "column",
});

export const boxHeader = style({
  margin: "10px 20px",
  fontWeight: "500",
  fontSize: "0.9rem",
});

export const addButton = style({
  float: "right",
  cursor: "pointer",
  color: "grey",
  ":hover": {
    opacity: 0.8,
  },
});
