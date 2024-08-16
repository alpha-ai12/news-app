import { NavigationContainer } from "@react-navigation/native";
import { configureStore } from "@reduxjs/toolkit";
// import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";
import React, { useEffect } from "react";
import mobileAds from "react-native-google-mobile-ads";
import { MenuProvider } from "react-native-popup-menu";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

import { firebaseConfig } from "./firebaseConfig";
import { initFonts } from "./src/assets/fonts";
import { AuthStack } from "./src/navigation/primary-navigator";
import { STORE_FEATURE_KEY, storeReducer } from "./src/store";

export const App = () => {
  useEffect(() => {
    initFonts();
    initializeApp(firebaseConfig);
    // console.log("====>>>>", app);
    ads();
  }, []);

  const ads = async () => {
    try {
      await mobileAds()
        .initialize()
        .then((adapterStatuses) => {
          // Initialization complete!
          // console.log("Initialization complete", adapterStatuses);
        });
      // mobileAds().openDebugMenu("ca-app-pub-5386683070162029/6446899983");
    } catch (error) {
      console.log("error", error);
    }
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
      <MenuProvider>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </MenuProvider>
      <Toast position="top" />
    </Provider>
  );
};
