import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import { CustomDrawer } from "../components/custom_Drawer";
import { Board } from "../screens";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="TopNews"
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 180,
        },
        headerShown: false,
      }}
      useLegacyImplementation={false}
    >
      <Drawer.Screen
        name="Board"
        component={Board}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};
