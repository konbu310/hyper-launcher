import { CSSProperties, FC, VFC } from "react";
import * as React from "react";

const iconTypes = ["plus"] as const;
type IconType = typeof iconTypes[number];

export const Icon: VFC<{
  type: IconType;
  className: string;
  style: CSSProperties;
}> = (props) => {
  return (
    <svg>
      <use xlinkHref={`#${props.type}`} />
    </svg>
  );
};

export const IconProvider: VFC = () => {
  return (
    <svg display="none">
      {/* plus */}
      <Symbol id="plus" viewBox="0 0 25 25">
        <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
      </Symbol>
    </svg>
  );
};

const Symbol: FC<{ id: IconType; viewBox: string }> = (props) => {
  return (
    <symbol id={props.id} viewBox={props.viewBox}>
      {props.children}
    </symbol>
  );
};
