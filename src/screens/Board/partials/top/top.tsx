import { ScrollView, Text } from "react-native";

import { FontFamily } from "../../../../assets/fonts";

export const TopRoute = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          marginTop: 15,
          marginLeft: 20,
          fontSize: 22,
          fontFamily: FontFamily.InterSemiBold,
        }}
      >
        Top
      </Text>
    </ScrollView>
  );
};
