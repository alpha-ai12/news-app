import React, { useState } from "react";
import { Text, SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { MyAccount } from "./myAccount";
import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { Preferences } from "../../components";
import { getStoreState } from "../../store";

export const Profile = ({ route }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const [model, setModel] = useState(false);
  const preferences = useSelector(
    (rootState) => getStoreState(rootState).preferences,
  );
  const userData = useSelector(
    (rootState) => getStoreState(rootState).userData,
  );
  return (
    <SafeAreaView style={[styles.safeAreaContainer]}>
      <View style={[styles.dataContainer]}>
        <Text
          style={{
            fontSize: 34,
            fontFamily: FontFamily.InterMedium,
            color: "#404040",
          }}
        >
          Account & Settings
        </Text>
        <Text style={{ fontSize: 14, color: "gray" }}>
          Profile Hub: Manage Your Identity
        </Text>
        {/* <View style={{ flexDirection: "row",alignSelf:'center' }}>
          <View>{renderMenuItem("My Account")}</View>
          <View>{renderMenuItem("Help Center")}</View>
        </View> */}
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
          <MyAccount
            userData={userData}
            preferences={preferences}
            setModel={setModel}
          />
        </View>
      </View>
      <Preferences
        model={model}
        setModel={setModel}
        data={preferences}
        dispatch={dispatch}
        userData={userData}
      />
    </SafeAreaView>
  );
};
