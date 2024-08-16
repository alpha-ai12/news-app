import React from "react";
import { Image, Pressable } from "react-native";

interface LogoType {
  onPress: any;
}
export const Logo = (props: LogoType) => {
  return (
    <Pressable
      style={{
        alignItems: "center",
        paddingHorizontal: 20,
        width: 260,
        height: 50,
        borderRadius: 5,
      }}
      onPress={() => {
        props.onPress();
      }}
    >
      <Image
        source={require("../../assets/icon/logo.png")}
        style={{ width: 240, height: 50, resizeMode: "contain" }}
      />
    </Pressable>
  );
};
