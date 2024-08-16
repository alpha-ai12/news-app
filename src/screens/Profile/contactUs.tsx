import React from "react";
import { Text, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { HelpCenter } from "./helpCenter";
import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { getStoreState } from "../../store";

export const ContactUs = ({ route }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const userData = useSelector(
    (rootState) => getStoreState(rootState).userData,
  );

  return (
    <SafeAreaView style={[styles.safeAreaContainer]}>
      <View
        style={[
          {
            display: "flex",
            marginTop: 10,
            backgroundColor: "#fff",
            alignSelf: "flex-start",
            marginHorizontal: 20,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 32,
            fontFamily: FontFamily.InterMedium,
            color: "#404040",
          }}
        >
          Contact Us
        </Text>
        <Text style={{ fontSize: 14, color: "gray", marginBottom: 15 }}>
          We're Here to Hear You
        </Text>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "flex-start",
              backgroundColor: "white",
              width: "100%",
            },
          ]}
        >
          <HelpCenter route={route} userData={userData} dispatch={dispatch} />
        </View>
      </View>
    </SafeAreaView>
  );
};
