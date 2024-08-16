import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { HelpCenter } from "./helpCenter";
import { MyAccount } from "./myAccount";
import { styles } from "./styles";
import { Footer, Preferences } from "../../components";

export const Profile = ({ route }) => {
  const dispatch = useDispatch<Dispatch<any>>();
  const width = useWindowDimensions().width;
  const [selectedItem, setSelectedItem] = useState("My Account");
  const [model, setModel] = useState(false);
  const { userData, preferences } = useSelector((state: any) => ({
    userData: state.store.userData,
    preferences: state.store.preferences,
  }));

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const renderMenuItem = (item) => {
    const isSelected = item === selectedItem;

    return (
      <TouchableOpacity
        onPress={() => handleItemClick(item)}
        style={[
          styles.menuItemContainer,
          width > 640 &&
            isSelected && {
              borderLeftColor: "lightblue",
              borderLeftWidth: 5,
              borderRadius: 5,
            },
          width <= 640 &&
            isSelected && {
              borderBottomColor: "lightblue",
              borderBottomWidth: 5,
              borderRadius: 5,
            },
        ]}
      >
        <Text style={styles.menuItem}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[styles.safeAreaContainer]}>
      <View
        style={[
          styles.dataContainer,
          {
            width:
              width > 1000
                ? "65%"
                : width > 660
                  ? "60%"
                  : width <= 640
                    ? width - 40
                    : "70%",
          },
        ]}
      >
        <Text style={styles.title}>Account & Settings</Text>
        <View style={[width <= 640 && { flexDirection: "row" }]}>
          <View>{renderMenuItem("My Account")}</View>
          <View>{renderMenuItem("Help Center")}</View>
        </View>
        <View
          style={[
            {
              flexDirection: "row",
              justifyContent: "flex-start",
              backgroundColor: "white",
              width: "100%",
            },
            width > 640 && { left: "35%", marginTop: -80, flex: 1 },
          ]}
        >
          {selectedItem === "My Account" ? (
            <MyAccount
              userData={userData}
              preferences={preferences}
              setModel={setModel}
            />
          ) : (
            <HelpCenter route={route} userData={userData} dispatch={dispatch} />
          )}
        </View>
      </View>
      <Preferences
        model={model}
        setModel={setModel}
        data={preferences}
        dispatch={dispatch}
        userData={userData}
      />
      <Footer />
    </SafeAreaView>
  );
};
