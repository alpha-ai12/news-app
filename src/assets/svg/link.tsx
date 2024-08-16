import * as React from "react";
import Svg, { Path } from "react-native-svg";
export const Link = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#666"
    width={18}
    height={18}
    viewBox="0 0 32 32"
    aria-hidden="true"
    style={{
      minHeight: 18,
      minWidth: 18,
    }}
    {...props}
  >
    <Path d="M15 6c.6 0 1 .4 1 1s-.4 1-1 1H9c-.6 0-1 .4-1 1v14a1.1 1.1 0 0 0 .2.6c.1.2.4.4.8.4h14c.6 0 1-.4 1-1v-6c0-.6.4-1 1-1s1 .4 1 1v6a3 3 0 0 1-3 3H9a3 3 0 0 1-2.2-.9A3 3 0 0 1 6 23V9a3 3 0 0 1 3-3Zm10 0 .4.1.5.5.1.4v6c0 .6-.4 1-1 1s-1-.4-1-1V9.4l-5.3 5.3a1 1 0 0 1-.7.3 1 1 0 0 1-.7-.3 1 1 0 0 1 0-1.4L22.6 8H19c-.6 0-1-.4-1-1s.4-1 1-1Z" />
  </Svg>
);
