import React from "react";
import { Text, SafeAreaView, TextInput } from "react-native";

import { FontFamily } from "../../assets/fonts";

export const Password = ({ route }) => {
  return (
    <SafeAreaView style={{ maxWidth: 650 }}>
      <Text
        style={{
          fontSize: 35,
          color: "black",
          fontFamily: FontFamily.InterMedium,
          width: "100%",
          letterSpacing: 0.5,
        }}
      >
        Change Password
      </Text>
      <Text style={{ fontSize: 22, marginVertical: 15 }}>
        Password must include at least: 8 characters, upper and lowercase
        letters, 1 number and 1 special character.
      </Text>
      <Text style={{ fontSize: 20 }}>Current Password</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          padding: 6,
          fontSize: 14,
          marginTop: 5,
          backgroundColor: "#fff",
        }}
      />
      <Text> </Text>
      <Text style={{ fontSize: 20 }}>New Password</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          padding: 6,
          fontSize: 14,
          marginTop: 5,
          backgroundColor: "#fff",
        }}
      />
      <Text> </Text>
      <Text style={{ fontSize: 20 }}>Confirm Password</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 5,
          padding: 6,
          fontSize: 14,
          marginTop: 5,
          backgroundColor: "#fff",
        }}
      />
    </SafeAreaView>
  );
};
