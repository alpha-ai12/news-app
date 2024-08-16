import { StyleSheet, Platform } from "react-native";

// const { width: screenWidth } = Dimensions.get("screen");
const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
  },
  title: {
    fontSize: 20,
  },
  item: {
    width: "100%",
    marginBottom: 15,
    // height: 300,
  },
  imageContainer: {
    borderRadius: 10,
    height: 328,
    marginBottom: Platform.select({ ios: 0, android: 1 }),
  },
  image: {
    resizeMode: "cover",
    borderRadius: 10,
    height: 295,
    // height: screenWidth * 0.7,
  },
  imagePixealXL: {
    resizeMode: "cover",
    borderRadius: 10,
    height: 305,
  },
  dotContainer: {
    backgroundColor: "rgb(230,0,0)",
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  inactiveDotStyle: {
    backgroundColor: "rgb(255,230,230)",
  },
  imagetext: {
    color: "#202020",

    lineHeight: 21.34,
    width: "100%",
    marginTop: 10,
    paddingLeft: 2,
    fontSize: 17,
    fontStyle: "normal",
    marginHorizontal: 0,
  },
});
export default styles;
