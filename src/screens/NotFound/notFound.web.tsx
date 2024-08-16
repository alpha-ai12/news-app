import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, SafeAreaView, View } from "react-native";

import { FontFamily } from "../../assets/fonts";
import { Footer } from "../../components";

export const NotFound = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 25,
          maxWidth: 706,
          alignSelf: "center",
          flex: 1,
          // alignItems: "center",
        }}
      >
        <Text style={{ fontFamily: FontFamily.InterBold, fontSize: 34 }}>
          We can't find that page
        </Text>
        <Text style={{ fontSize: 24, marginVertical: 10 }}>
          The page may have moved, or the address may have been entered
          incorrectly.
        </Text>
        <Text style={{ fontSize: 24, marginVertical: 10 }}>
          Try using the navigation to find stories of interest, or browse our
          latest stories.{" "}
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 14,
            fontFamily: FontFamily.InterMedium,
            backgroundColor: "#000",
            marginVertical: 15,
            paddingVertical: 8,
            paddingHorizontal: 20,
            borderRadius: 8,
            textAlign: "center",
            alignSelf: "flex-start",
          }}
          onPress={() => {
            navigation.navigate("TopNews");
          }}
        >
          Go to The OpenNewsAi.com Homepage
        </Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
};
