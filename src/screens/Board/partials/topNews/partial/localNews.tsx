import {
  Text,
  View,
  useWindowDimensions,
  Pressable,
  Image,
} from "react-native";

import "react-indiana-drag-scroll/dist/style.css";
import { FontFamily } from "../../../../../assets/fonts";
import { SectionCard } from "../../../../../components";
import Code from "../../country/code.json";
import "react-loading-skeleton/dist/skeleton.css";

const getCountryNameFromId = (id: string) => {
  let name = "";
  Code.forEach((i) => {
    const key = Object.keys(i)[0];
    if (i[key] === id) {
      name = key;
    }
  });
  return name;
};
export const LocalComponent = ({ navigation, localNews, regionCode }) => {
  const width = useWindowDimensions().width;

  return (
    <>
      <View
        style={{
          marginTop: 10,
          maxWidth: 1440,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: width > 1440 ? 10 : 20,
            marginBottom: 20,
            // marginLeft: width > 1440 ? 0 : 10,
            marginHorizontal: width > 1440 ? 0 : 10,
          }}
        >
          <Pressable
            style={{ alignItems: "center", flexDirection: "row" }}
            onPress={() => {
              navigation.navigate("Country", {
                region: getCountryNameFromId(regionCode)
                  .toLowerCase()
                  .replace(" ", "-"),
              });
            }}
          >
            <Text
              style={{
                fontFamily: FontFamily.InterBold,
                fontSize: 20,
                textDecorationLine: "underline",
                color: "#404040",
              }}
            >
              {getCountryNameFromId(regionCode)}
            </Text>
            <Image
              source={require("../../../../../assets/icon/right.png")}
              style={{
                marginLeft: 5,
                marginTop: 5,
                width: 14,
                height: 14,
                resizeMode: "contain",
              }}
            />
          </Pressable>
        </View>
      </View>
      <View
        style={{
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent:
            localNews && localNews.length > 5 ? "space-between" : "flex-start",
          marginHorizontal: width > 1440 ? 0 : 10,
          paddingHorizontal: width > 1440 ? 10 : 20,
          maxWidth: 1440,
          alignSelf: "center",
          width: "100%",
        }}
      >
        {localNews.map((item, index) => {
          return (
            <SectionCard item={item} index={index} navigation={navigation} />
          );
        })}
      </View>
    </>
  );
};
