import React, { useState } from "react";
import { Text, Pressable, TextStyle } from "react-native";
interface HoverType {
  text: string;
  style: TextStyle;
  onPress?: any;
  numberOfLines?: number;
}
export const HoverLinkText = (props: HoverType) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const textStyle: TextStyle = {
    textDecorationLine: isHovered ? "underline" : "none",
  };

  return (
    <Pressable
      onPress={props.onPress}
      onHoverIn={handleMouseEnter}
      onHoverOut={handleMouseLeave}
    >
      <Text
        style={[props.style, textStyle]}
        numberOfLines={props.numberOfLines}
      >
        {props.text}
      </Text>
    </Pressable>
  );
};
