import { CSSProperties, FC, MouseEventHandler, ReactNode } from "react";

const iconDefs = {
  plus: {
    viewBox: "0 0 512 512",
    content: (
      // plus icon by Free Icons (https://free-icons.github.io/free-icons/)
      <path d="M 275.69232 19.692308 Q 274.46155 1.2307693 256 0 Q 237.53847 1.2307693 236.3077 19.692308 L 236.3077 236.3077 L 236.3077 236.3077 L 19.692308 236.3077 L 19.692308 236.3077 Q 1.2307693 237.53847 0 256 Q 1.2307693 274.46155 19.692308 275.69232 L 236.3077 275.69232 L 236.3077 275.69232 L 236.3077 492.30768 L 236.3077 492.30768 Q 237.53847 510.76923 256 512 Q 274.46155 510.76923 275.69232 492.30768 L 275.69232 275.69232 L 275.69232 275.69232 L 492.30768 275.69232 L 492.30768 275.69232 Q 510.76923 274.46155 512 256 Q 510.76923 237.53847 492.30768 236.3077 L 275.69232 236.3077 L 275.69232 236.3077 L 275.69232 19.692308 L 275.69232 19.692308 Z" />
    ),
  },
  cross: {
    viewBox: "0 0 512 512",
    content: (
      // cross icon by Free Icons (https://free-icons.github.io/free-icons/)
      <path d="M 463.60974 497.95123 Q 480.7805 512 497.95123 497.95123 Q 512 480.7805 497.95123 463.60974 L 291.90244 256 L 291.90244 256 L 497.95123 49.951218 L 497.95123 49.951218 Q 512 31.219513 497.95123 14.04878 Q 480.7805 0 463.60974 14.04878 L 256 220.09756 L 256 220.09756 L 49.951218 14.04878 L 49.951218 14.04878 Q 31.219513 0 14.04878 14.04878 Q 0 31.219513 14.04878 49.951218 L 220.09756 256 L 220.09756 256 L 14.04878 463.60974 L 14.04878 463.60974 Q 0 480.7805 14.04878 497.95123 Q 31.219513 512 49.951218 497.95123 L 256 291.90244 L 256 291.90244 L 463.60974 497.95123 L 463.60974 497.95123 Z" />
    ),
  },
} satisfies Record<string, { viewBox: string; content: ReactNode }>;

type IconKey = keyof typeof iconDefs;

export const IconProvioder: FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
      {Object.entries(iconDefs).map(([key, value]) => (
        <symbol key={key} id={key} viewBox={value.viewBox}>
          {value.content}
        </symbol>
      ))}
    </svg>
  );
};

export const Icon: FC<{
  type: IconKey;
  className?: string;
  style?: CSSProperties;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  fill?: CSSProperties["fill"];
  stroke?: CSSProperties["stroke"];
  size?: CSSProperties["width"] | CSSProperties["height"];
  onClick?: MouseEventHandler<SVGSVGElement>;
}> = ({
  type,
  className,
  style,
  size,
  width = size,
  height = size,
  fill,
  stroke,
  onClick,
}) => {
  return (
    <svg
      onClick={onClick}
      style={{
        width,
        height,
        fill,
        stroke,
        ...style,
      }}
      className={className}
    >
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};
