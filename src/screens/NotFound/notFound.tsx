import React from "react";
import { Text, SafeAreaView, View } from "react-native";

import { FontFamily } from "../../assets/fonts";
export const NotFound = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
        <Text style={{ fontFamily: FontFamily.InterBold, fontSize: 36 }}>
          We can't find that page The page may have moved, or the address may
          have been entered incorrectly. Try using the navigation to find
          stories of interest, or browse our latest stories.{" "}
        </Text>
      </View>
    </SafeAreaView>
  );
};
