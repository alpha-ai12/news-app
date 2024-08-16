import React, { memo, useCallback, useMemo } from "react";
import { Text, TouchableOpacity } from "react-native";
import {
  RTL_DIRECTION,
  // RTL_STYLE,
} from "react-native-dropdown-picker/src/constants";

import { Close } from "../../assets/svg/close";

function RenderBadge({
  rtl,
  label,
  props,
  value,
  textStyle,
  badgeStyle,
  badgeTextStyle,
  badgeDotStyle,
  getBadgeColor,
  getBadgeDotColor,
  showBadgeDot,
  onPress,
  THEME,
}) {
  /**
   * onPress.
   */
  const __onPress = useCallback(() => onPress(value), [onPress, value]);

  /**
   * The badge style.
   * @returns {object}
   */
  const _badgeStyle = useMemo(
    () => [
      RTL_DIRECTION(rtl, THEME.badgeStyle),
      ...[badgeStyle].flat(),
      {
        backgroundColor: getBadgeColor(value),
      },
    ],
    [THEME, rtl, badgeStyle, getBadgeColor],
  );

  /**
   * The badge dot style.
   * @return {object}
   */
  // const _badgeDotStyle = useMemo(
  //   () => [
  //     RTL_STYLE(rtl, THEME.badgeDotStyle),
  //     ...[{ width: 15, height: 15, marginRight: 8 }].flat(),
  //     {
  //       backgroundColor: getBadgeDotColor(value),
  //     },
  //   ],
  //   [THEME, rtl, badgeDotStyle, getBadgeDotColor],
  // );

  /**
   * The badge text style.
   * @returns {object}
   */
  const _badgeTextStyle = useMemo(
    () => [...[textStyle].flat(), ...[badgeTextStyle].flat()],
    [textStyle, badgeTextStyle],
  );

  return (
    <TouchableOpacity style={_badgeStyle} {...props} onPress={__onPress}>
      {showBadgeDot && (
        // <Image
        //   source={require("../../assets/icons/closeIcon.png")}
        //   style={_badgeDotStyle}
        // />
        <Close width={16} height={15} />
      )}
      <Text style={_badgeTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

const areEqual = (nextProps, prevProps) => {};

export default memo(RenderBadge, areEqual);
