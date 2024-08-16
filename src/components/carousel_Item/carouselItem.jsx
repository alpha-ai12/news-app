import React from "react";
import { View, Text, Pressable, Image, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

import styles from "./styles";
import { FontFamily } from "../../assets/fonts";
import { formatTime } from "../timeFormat/formatTime";
export const CarouselItem = ({ item, index, navigation }, parallaxProps) => {
  const { width } = Dimensions.get("screen");
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("HeadLine", { item });
      }}
    >
      <View
        style={[
          styles.item,
          {
            shadowColor: "black",
            shadowOffset: {
              width: 2,
              height: 8,
            },
            shadowRadius: 5,
            shadowOpacity: 0.3,
          },
        ]}
      >
        {item?.title ? (
          <Image
            source={{ uri: item.image_url }}
            style={{
              borderRadius: 25,
              height: 245,
              width: width - 60,
            }}
            resizeMode="cover"
            {...parallaxProps}
          />
        ) : (
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={{
              borderRadius: 25,
              height: 245,
              width: width - 60,
            }}
            resizeMode="cover"
            {...parallaxProps}
          />
        )}
        <View
          style={{
            backgroundColor: "#000",
            opacity: 0.7,
            borderRadius: 25,
            height: 245,
            width: width - 60,
            position: "absolute",
          }}
        />
        <View
          style={{
            position: "absolute",
            top: 20,
            left: 10,
            paddingHorizontal: 10,
            backgroundColor: "#007AFF",
            borderRadius: 20,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.InterRegular,
              fontSize: 16,
              color: "#FFF",
              textTransform: "capitalize",
            }}
          >
            {item.category}
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 10,
            paddingHorizontal: 10,
            right: 20,
          }}
        >
          <View style={{ flexDirection: "row", marginVertical: 3 }}>
            {item.title ? (
              <Text
                style={{
                  fontFamily: FontFamily.InterRegular,
                  fontSize: 16,
                  color: "#FFF",
                  textTransform: "capitalize",
                }}
              >
                {item.source_id ?? "Open News AI"}
              </Text>
            ) : (
              <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                style={{
                  fontFamily: FontFamily.InterRegular,
                  fontSize: 16,
                  width: "40%",
                }}
              />
            )}
            <Image
              source={require("../../assets/icon/bluetick.png")}
              style={{ height: 20, width: 20, marginLeft: 8 }}
            />
            {item.title ? (
              <Text
                style={{
                  fontFamily: FontFamily.InterRegular,
                  fontSize: 16,
                  color: "#FFF",
                  marginLeft: 8,
                }}
              >
                {formatTime(item.pubDate).split("Updated")[1]}
              </Text>
            ) : (
              <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                style={{
                  fontFamily: FontFamily.InterRegular,
                  fontSize: 16,
                  width: "20%",
                  marginLeft: 8,
                }}
              />
            )}
          </View>
          {item.title ? (
            <Text
              style={{
                fontFamily: FontFamily.InterBold,
                fontSize: 18,
                color: "#FFF",
              }}
              numberOfLines={2}
            >
              {item.newTitle ?? item.title}
            </Text>
          ) : (
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={{
                fontFamily: FontFamily.InterRegular,
                fontSize: 16,
                height: 32,
              }}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default CarouselItem;
