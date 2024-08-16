"use strict";
import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F7F9",
  },
  itemLeft: {
    width: Platform.OS === "ios" ? "25%" : "30%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: Platform.OS === "ios" ? 10 : 5,
  },
  itemCenter: {
    width: Platform.OS === "ios" ? "50%" : "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  itemRight: {
    width: Platform.OS === "ios" ? "25%" : "30%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: Platform.OS === "ios" ? 10 : 5,
  },
});
