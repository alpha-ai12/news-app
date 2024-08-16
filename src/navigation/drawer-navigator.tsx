import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable } from "react-native";
import { useSelector } from "react-redux";

import { CustomDrawer } from "../components/custom_Drawer";
import {
  Board,
  ContactUs,
  CountryRoute,
  MyView,
  Profile,
  Saved,
} from "../screens";
import { getStoreState } from "../store";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const navigation = useNavigation<any>();
  const userData = useSelector(
    (rootState) => getStoreState(rootState).userData,
  );
  return (
    <Drawer.Navigator
      initialRouteName="Board"
      screenOptions={{
        headerRight: () => {
          return (
            <Pressable
              onPress={() => {
                navigation.navigate("Discover");
              }}
              style={{ marginRight: 10 }}
            >
              <Image
                source={require("../assets/icon/search.png")}
                style={{ height: 40, width: 40 }}
                resizeMode="contain"
              />
            </Pressable>
          );
        },
        headerTitle: () => {
          return (
            <Image
              source={require("../assets/icon/logo.png")}
              style={{ width: 192, height: 40, resizeMode: "contain" }}
            />
          );
        },
        headerLeft: () => {
          return (
            <Pressable
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 10 }}
            >
              <Image
                source={require("../assets/icon/menu.png")}
                style={{ height: 40, width: 40 }}
                resizeMode="contain"
              />
            </Pressable>
          );
        },

        headerTintColor: "black",
        headerShadowVisible: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
      useLegacyImplementation={false}
    >
      <Drawer.Screen
        name="Board"
        component={Board}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
        name="Country"
        component={CountryRoute}
        options={{ title: "Global Insights" }}
      />
      {userData?.name && (
        <>
          <Drawer.Screen
            name="Profile"
            component={Profile}
            options={{ title: "Profile" }}
          />
          <Drawer.Screen
            name="MyView"
            component={MyView}
            options={{ title: "My View" }}
          />
          <Drawer.Screen
            name="Saved"
            component={Saved}
            options={{ title: "Saved" }}
          />
        </>
      )}
      <Drawer.Screen
        name="Contact"
        component={ContactUs}
        options={{ title: "Contact Us" }}
      />
    </Drawer.Navigator>
  );
};
