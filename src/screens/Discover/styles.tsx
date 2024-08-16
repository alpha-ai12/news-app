import { StyleSheet } from "react-native";

import { FontFamily } from "../../assets/fonts";

export const styles = StyleSheet.create({
  filterView: {
    backgroundColor: "#FFFFFF",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 12,
  },
  filterText: {
    marginTop: 20,
    marginHorizontal: 25,
    fontFamily: FontFamily.InterMedium,
    fontSize: 14,
  },
  dropDownView: {
    backgroundColor: "pink",
    borderRadius: 5,
    width: "95%",
    height: "15%",
    marginHorizontal: 6,
    marginVertical: 5,
  },
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 35,
    marginVertical: 10,
    alignSelf: "center",
    width: "90%",
    borderWidth: 0.1,
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 12,
    marginLeft: 6,
  },
  selectedTextStyle: {
    fontSize: 12,
    marginLeft: 6,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  listView: {
    backgroundColor: "#fff",
    width: "100%",
    // justifyContent: "space-between",
    flexDirection: "row",
    shadowColor: "#000",
  },
});
