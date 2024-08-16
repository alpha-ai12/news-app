import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import * as React from "react";
import { Image, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../assets/fonts";
import { LoginType } from "../screens/Login/login.web";
import { save } from "../storage";
import { getStoreState, randColor, storeActions } from "../store";

export const CustomDrawer = (props) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const userData = useSelector(
    (rootState) => getStoreState(rootState).userData,
  );
  const signOut = async () => {
    const { index } = props.navigation.getState();
    // const cookies = new Cookies();
    // cookies.set("userInfo", {});
    save("userInfo", {});
    if (userData.oAuth === LoginType.facebook) {
    }
    if (userData.oAuth === LoginType.google) {
      await GoogleSignin.signOut();
    }
    dispatch(storeActions.setUserData({}));
    if (index === 2 || index === 3 || index === 4) {
      props.navigation.navigate("Board");
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {userData.name && (
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginBottom: 10,
            }}
          >
            {userData?.profileImg && userData.oAuth !== LoginType.opennewsai ? (
              <Image
                source={{ uri: userData?.profileImg }}
                style={{
                  height: 40,
                  width: 40,
                  resizeMode: "contain",
                  borderRadius: 20,
                }}
              />
            ) : (
              <Text
                style={{
                  backgroundColor: randColor(userData.name),
                  color: "black",
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                  fontSize: 20,
                  fontFamily: FontFamily.InterBold,
                  textAlign: "center",
                  paddingVertical: 8,
                  overflow: "hidden",
                  textTransform: "uppercase",
                }}
              >
                {userData.name.charAt(0)}
              </Text>
            )}
            <Text
              style={{
                fontSize: 20,
                marginLeft: 10,
                fontFamily: FontFamily.InterMedium,
                alignSelf: "center",
              }}
              numberOfLines={2}
            >
              Hello {userData.name}
            </Text>
          </View>
        )}
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      {!userData?.name ? (
        <View style={{ justifyContent: "flex-end", marginBottom: 10 }}>
          <Text
            style={{
              color: "#666666",
              fontSize: 16,
              fontFamily: FontFamily.InterBold,
              borderColor: "lightgray",
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderRadius: 10,
              textAlign: "center",
              marginHorizontal: 10,
              // marginRight: 10,
            }}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate("login", { back: true });
            }}
          >
            Sign In
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontFamily: FontFamily.InterBold,
              borderColor: "lightgray",
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderRadius: 10,
              textAlign: "center",
              backgroundColor: "#000000",
              marginHorizontal: 10,
              marginTop: 10,
              overflow: "hidden",
              // marginRight: 5,
            }}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate("signUp");
            }}
          >
            Register
          </Text>
        </View>
      ) : (
        <View style={{ justifyContent: "flex-end", marginBottom: 10 }}>
          <Text
            style={{
              color: "#666666",
              fontSize: 16,
              fontFamily: FontFamily.InterBold,
              borderColor: "lightgray",
              paddingVertical: 8,
              paddingHorizontal: 20,
              borderWidth: 1,
              borderRadius: 10,
              textAlign: "center",
              marginHorizontal: 10,
              // marginRight: 10,
            }}
            onPress={() => {
              signOut();
            }}
          >
            Sign Out
          </Text>
        </View>
      )}
      <Image
        source={require("../assets/icon/logo.png")}
        style={{
          width: 216,
          height: 45,
          resizeMode: "contain",
          alignSelf: "center",
          marginBottom: 40,
        }}
      />
    </View>
  );
};
