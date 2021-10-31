import React, { CSSProperties, FC } from "react";

export const Divider: FC<{
  axis?: "horizontal" | "vertical";
  color?: CSSProperties["color"];
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  inset?: string;
  margin?: CSSProperties["margin"];
  style?: CSSProperties;
  className?: string;
}> = (props) => {
  const {
    axis = "horizontal",
    color = "lightgrey",
    width,
    height,
    inset,
    margin,
    style,
    className,
  } = props;

  const baseStyles: CSSProperties =
    axis === "horizontal"
      ? {
          margin: margin ?? `${inset ?? "1rem"} auto`,
          width: width ?? "100%",
          borderBottom: `${height ?? "2px"} solid ${color}`,
        }
      : {
          margin: margin ?? `auto ${inset ?? "1rem"}`,
          paddingTop: height ?? "100%",
          borderRight: `${width ?? "2px"} solid ${color}`,
        };

  return <div className={className} style={{ ...baseStyles, ...style }} />;
};
