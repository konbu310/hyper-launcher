import { CSSProperties } from "@vanilla-extract/css";
import React, { FC, HTMLAttributes } from "react";

type Style = HTMLAttributes<HTMLSpanElement>["style"];

export const Spacer: FC<{
  axis?: "horizontal" | "vertical";
  size?: string | number;
  style?: Style;
}> = ({ size = "1rem", axis = "horizontal", style = {}, ...delegated }) => {
  const width = axis === "vertical" ? 1 : size;
  const height = axis === "horizontal" ? 1 : size;

  const styles: Style = {
    display: "block",
    width,
    minWidth: width,
    height,
    minHeight: height,
    ...style,
  };

  return <span style={styles} {...delegated} />;
};
