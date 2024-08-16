import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Animated,
  Image,
} from "react-native";

import { FontFamily } from "../../assets/fonts";

export const TopTabItem = ({
  item,
  selectedItem,
  index,
  handleClick,
  handleHover,
  handleMouseLeave,
  hoveredItem,
  route,
  isContentHovered,
}) => {
  const [isHovered, setHovered] = useState(false);
  const animVal = new Animated.Value(0);
  // useEffect(() => {
  //   Animated.timing(animVal, {
  //     toValue: isHovered ? 1 : 0,
  //     duration: 200,
  //     useNativeDriver: true,
  //   }).start();
  // }, [isHovered]);

  useEffect(() => {
    Animated.timing(animVal, {
      toValue: isHovered || hoveredItem === item.title ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isHovered, hoveredItem]);

  return (
    <Pressable
      key={index + "comp"}
      style={[
        styles.menuItem,
        (isHovered || isContentHovered) &&
          selectedItem === item.title &&
          styles.activeMenuItem,
        route === item.key && styles.activeMenuItem,
        index > 0 && {
          //   marginLeft: width > 1440 ? width * 0.015 : 10,
          marginLeft: 10,
        },
      ]}
      onPress={() => handleClick(item.key, index)}
      // onHoverIn={() => console.log('YES HOVERED')}
      onHoverIn={() => {
        handleHover(item.title, index);
        setTimeout(() => {
          setHovered(true);
        }, 250);
      }}
      onHoverOut={() => {
        // console.log("LEFT HOVERED");
        handleMouseLeave();
        setHovered(false);
      }}
    >
      <View style={styles.menuItemInner}>
        <Text style={styles.menuItemText}>{item.title}</Text>
        <Animated.View
          style={[
            styles.iconContainer,
            hoveredItem === item.title && {
              transform: [
                {
                  rotate: animVal.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "180deg"],
                  }),
                },
              ],
            },
          ]}
        >
          <Image
            source={require("../../assets/icons/down.png")}
            style={{
              height: 12,
              width: 13,
              resizeMode: "contain",
              tintColor: hoveredItem === item.title ? "gray" : "black",
            }}
          />
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  menuItemInner: {
    flexDirection: "row",
  },
  menuItem: {
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  menuItemText: {
    fontFamily: FontFamily.InterBold,
    color: "#404040",
  },
  activeMenuItem: {
    borderColor: "#fb9660",
  },
  iconContainer: {
    alignSelf: "center",
    marginLeft: 3,
    marginTop: 3,
  },
});
