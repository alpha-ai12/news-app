import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";
export const Close = (props) => (
  <Svg
    width={250}
    height={250}
    viewBox="0 0 250 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h250v250H0z" />
    <Defs>
      <Pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <Use xlinkHref="#b" transform="scale(.00195)" />
      </Pattern>
      <Image
        id="b"
        width={512}
        height={512}
        xlinkHref="data:image/png;base64,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"
      />
    </Defs>
  </Svg>
);
