import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Platform, Pressable } from "react-native";
import { Host } from "react-native-portalize";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { DrawerNavigator } from "./drawer-navigator";
import { SignUpModel } from "../components";
import {
  Discover,
  HeadLine,
  HighLights,
  Login,
  SignUp,
  ViewAll,
  WebViewScreen,
} from "../screens";
import { ForgetPassword } from "../screens/Password";
import { load } from "../storage";
import {
  getBusinessNews,
  getEntertainmentNews,
  getFeatureNews,
  getHealthNews,
  getMostRecent,
  getPoliticsNews,
  getScienceNews,
  getSportsNews,
  getTechnologyNews,
  getWorldNews,
  localNews,
  storeActions,
  userDataAPI,
} from "../store";
import Emitter from "../utils";

const Stack = createNativeStackNavigator();

export const AuthStack = (props) => {
  const navigation = useNavigation<any>();
  const [country, setCountry] = useState(__DEV__ ? "in" : "");
  const dispatch = useDispatch<Dispatch<any>>();
  // Track Id Null
  const [model, setModel] = useState(false);
  useEffect(() => {
    // console.log("SHOW THE ROUTE VALUE ", route, " PROPS VALUE ", prop);
    userDataStatus();
    !__DEV__ && getData();
    dispatch(getMostRecent());
    dispatch(getBusinessNews(1));
    dispatch(getSportsNews(1));
    dispatch(getFeatureNews());
    dispatch(getHealthNews(1));
    dispatch(getEntertainmentNews(1));
    dispatch(getPoliticsNews(1));
    dispatch(getScienceNews(1));
    dispatch(getTechnologyNews(1));
    dispatch(getWorldNews(1));
    // dispatch(getTopNews(1));
    Emitter.on("SignUpModel", () => {
      setModel(true);
    });
    return () => {
      Emitter.off("SignUpModel", () => {
        setModel(false);
      });
    };
  }, []);
  const userDataStatus = async () => {
    const userInfo = await load("userInfo");
    // console.log(userInfo);
    if (userInfo?.email !== undefined) {
      const result: any = await dispatch(userDataAPI(userInfo));
      // console.log(result.payload.data);
      if (result.payload.message) {
        console.log(result.payload.message);
      } else {
        dispatch(storeActions.setUserData(result.payload.data || {}));
        dispatch(
          storeActions.setPreferences({
            preferredCategory: result.payload.data?.preferredCategory ?? [],
            preferredCountry: result.payload.data?.preferredCountry ?? [],
          }),
        );
      }
    }
  };
  const getData = async () => {
    try {
      // const url = `https://ipinfo.io/?token=af484a9c1a749b`;
      const url = "https://api.country.is/";
      const response = await axios.get(url, {
        headers: {
          crossDomain: true,
        },
      });
      console.log("data===>>", response.data);
      const region = response?.data?.country?.toLowerCase() ?? "in";
      // if (region !== "in" && region !== "us" && region !== undefined) {
      //   dispatch(localNews(region));
      // }
      setCountry(region);
      // dispatch(storeActions.setRegionCode(region));
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    dispatch(storeActions.setLocalNewsData([]));
    if (country !== undefined && country !== "") {
      dispatch(localNews(country));
    }
    setCountry(country);
    dispatch(storeActions.setRegionCode(country));
  }, [country]);

  return (
    <Host>
      <Stack.Navigator
        // initialRouteName="Menu"
        initialRouteName="Drawer"
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          headerShadowVisible: false,
        })}
      >
        <Stack.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            headerShown: false,
            gestureEnabled: Platform.OS !== "web",
          }}
        />
        <Stack.Screen name="HeadLine" component={HeadLine} />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgetPassword}
          options={{ headerShown: false, title: "Forgot Password" }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAll}
          options={{
            headerShown: true,
            headerTitle: "",
            headerLeft: (props) => {
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Image
                    source={require("../assets/icon/back.png")}
                    style={{ height: 40, width: 40 }}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            },
          }}
        />
        <Stack.Screen
          name="WebViewScreen"
          component={WebViewScreen}
          options={({ route, navigation }: any) => ({
            headerShown: true,
            headerTitle: route.params.title,
            headerLeft: (props) => {
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Image
                    source={require("../assets/icon/back.png")}
                    style={{ height: 40, width: 40 }}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            },
          })}
        />
        <Stack.Screen
          name="Discover"
          component={Discover}
          options={{
            headerShown: true,
            headerTitle: () => {
              return (
                <Image
                  source={require("../assets/icon/logo.png")}
                  style={{ width: 192, height: 40, resizeMode: "contain" }}
                />
              );
            },
            headerLeft: (props) => {
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Image
                    source={require("../assets/icon/back.png")}
                    style={{ height: 40, width: 40 }}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            },
          }}
        />
        <Stack.Screen name="HighLights" component={HighLights} />
        {/* <Stack.Screen name="HighLights" component={HighLights} />
      <Stack.Screen name="HeadLine" component={HeadLine} />
      <Stack.Screen name="Profile" component={Profile} />
      
      <Stack.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="signUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewAll"
        component={ViewAll}
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: (props) => {
            return (
              <Pressable onPress={() => navigation.goBack()}>
                <Image
                  source={require("../assets/icon/back.png")}
                  style={{ height: 40, width: 40 }}
                  resizeMode="contain"
                />
              </Pressable>
            );
          },
        }}
      /> */}
      </Stack.Navigator>
      <SignUpModel
        model={model}
        setModel={setModel}
        navigation={navigation}
        keyword={2}
        setKeyWord={() => {}}
      />
    </Host>
  );
};
