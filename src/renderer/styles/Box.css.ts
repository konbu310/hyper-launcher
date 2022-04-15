import { style } from "@vanilla-extract/css";

export const box = style({
  margin: "10px",
  padding: "5px",
  width: "280px",
  borderRadius: "5px",
  backgroundColor: "#fff",
  boxShadow: "0 0 2px #808080",
  border: "1px solid #fff",
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
