import {
  NavigationContainer,
  NavigationContainerRef,
  getPathFromState,
} from "@react-navigation/native";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { configureStore } from "@reduxjs/toolkit";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import React, { useEffect, useRef } from "react";
import { Linking, Platform, Text } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { Provider } from "react-redux";

import { firebaseConfig } from "./firebaseConfig";
import { AuthStack } from "./src/navigation/primary-navigator";
import { STORE_FEATURE_KEY, storeReducer } from "./src/store";

const injectWebCss = () => {
  if (!(Platform.OS === "web")) return;
  const style = document.createElement("style");
  style.textContent = `textarea, select, input, button { outline: none!important; }`;
  return document.head.append(style);
};
export const App = () => {
  // const path = window.location.href.split("/")[3] ?? "TopNews";
  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    getAnalytics(app);
    injectWebCss();
  }, []);
  const navigationRef = useRef<NavigationContainerRef<any>>();

  const linking = {
    prefixes: [
      "opennewsai://",
      "https://opennewsai.com",
      "http://localhost:19006",
      "https://www.opennewsai.com",
    ],
    config: {
      screens: {
        TopNews: { path: "" },
        Business: { path: "/Business" },
        Entertainment: { path: "/Entertainment" },
        Health: { path: "/Health" },
        Politics: { path: "/Politics" },
        Science: { path: "/Science" },
        Sports: { path: "/Sports" },
        Technology: { path: "/Technology" },
        World: { path: "/World" },
        login: { path: "/login" },
        signUp: { path: "/sign-up" },
        Country: { path: "/world/:region" },
        HeadLine: { path: "/:id" },
        Discover: { path: "/search" },
        Profile: { path: "/profile" },
        Contact: { path: "/contact" },
        Policy: { path: "/policy" },
        Terms: { path: "/terms" },
        NotFound: "*",
        Forgot: { path: "/forgot-password" },
        MyView: { path: "/my-view" },
        Saved: { path: "/saved" },
        Change: { path: "/change-password" },
        Top: { path: "/top" },
      },
    },
    getPathFromState: (state, options) => {
      const cleanState = {
        ...state,
        routes: state.routes.map((route) => {
          if (!route.params) {
            return route;
          }

          const cleanParams = {};
          for (const param in route.params) {
            const value = route.params[param];
            if (
              typeof value !== "object" &&
              typeof value !== "function" &&
              typeof value !== "boolean"
            ) {
              cleanParams[param] = value;
            }
          }
          return {
            ...route,
            params: cleanParams,
          };
        }),
      };
      return getPathFromState(cleanState, options); //imported from @react-navigation/native
    },
    async getInitialURL() {
      // Check if app was opened from a deep link
      const url = await Linking.getInitialURL();
      // console.log("getInitialURL", url);
      if (url != null) {
        return url;
      }
    },
  };

  const Store = configureStore({
    reducer: {
      [STORE_FEATURE_KEY]: storeReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
  });
  return (
    <Provider store={Store}>
      <GoogleOAuthProvider clientId="550399240107-tortiplh2l49cjpdu65a6ubcgodjp6qs.apps.googleusercontent.com">
        <MenuProvider>
          <NavigationContainer
            linking={linking}
            fallback={<Text>Loading...</Text>}
            ref={navigationRef}
          >
            <AuthStack />
          </NavigationContainer>
        </MenuProvider>
        <Toast position="top" />
      </GoogleOAuthProvider>
    </Provider>
  );
};
