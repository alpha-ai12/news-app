import { StyleSheet } from "react-native";

import { FontFamily } from "../../assets/fonts";
// const { width, height } = useWindowDimensions();

export const styles = StyleSheet.create({
  listView: {
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    shadowColor: "#000",
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainView: {
    backgroundColor: "#fff",
    maxWidth: 1440,
    width: "100%",
    alignSelf: "center",

    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 40,
    fontFamily: FontFamily.InterRegular,
    color: "#404040",
  },
  subView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
