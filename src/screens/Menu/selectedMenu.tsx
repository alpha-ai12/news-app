import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Portal } from "react-native-portalize";

import { FontFamily } from "../../assets/fonts";
import { formatTime } from "../../components";

import "react-loading-skeleton/dist/skeleton.css";

const countryData = [
  { "United States of America": "U.S.A." },
  { "United Kingdom": "U.K." },
  { India: "India" },
  { Germany: "Germany" },
  { Canada: "Canada" },
  { Australia: "Australia" },
  { "South Africa": "South Africa" },
  { Singapore: "Singapore" },
];

export const SelectedMenu = ({
  selectedItem,
  handleClick,
  handleHover,
  handleMouseLeave,
  featureData,
  feature,
}) => {
  const navigation = useNavigation<any>();
  const [data, setData] = useState([{}, {}, {}, {}]);
  useEffect(() => {
    if (featureData.length > 0) {
      featureData.forEach((a, index) => {
        if (Object.keys(a)[0] === feature) {
          const obj: any = Object.values(a)[0];
          setData(
            obj?.filter((i: any) => i?.image_url !== undefined)?.slice(0, 4),
          );
        }
      });
    }
  }, [feature, featureData]);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      key={`render${index}`}
      style={styles.itemContainer}
      onPress={() => navigation.navigate("HeadLine", { id: item.slugid })}
    >
      <View
        key={`render${index}`}
        style={{
          width: "85%",
          flexDirection: "column",
        }}
      >
        {item?.title ? (
          <Text style={styles.text}>{item?.newTitle ?? item?.title}</Text>
        ) : (
          <Skeleton width="95%" count={3} />
        )}
        {item?.description !== undefined ? (
          <Text
            style={{
              width: "90%",
              fontSize: 12,
              marginVertical: 5,
              color: "#404040",
            }}
            numberOfLines={1}
          >
            {item?.newDescription ?? item.description}
          </Text>
        ) : (
          <Skeleton width="90%" style={{ marginBlock: 5, fontSize: 12 }} />
        )}
        {item?.pubDate ? (
          <Text
            style={{
              width: "90%",
              fontSize: 10,
              marginVertical: 2,
              color: "#666666",
            }}
            numberOfLines={1}
          >
            {formatTime(item.pubDate).split(" -")[0]}
          </Text>
        ) : (
          <Skeleton width="90%" style={{ fontSize: 10 }} />
        )}
      </View>
      {item?.title ? (
        <Image
          style={[
            styles.image,
            !item?.image_url && {
              resizeMode: "contain",
              backgroundColor: "#969696",
            },
          ]}
          source={
            item.image_url
              ? { uri: item.image_url }
              : require("../../assets/icon/logo.png")
          }
        />
      ) : (
        <Skeleton style={{ width: 75, height: 75 }} />
      )}
    </TouchableOpacity>
  );

  const renderTopCategory = ({ item, index }) => {
    return (
      <Text
        key={`top_category_${index}`}
        style={[{ textDecorationLine: "underline" }, styles.cell]}
        onPress={() => {
          navigation.navigate("Country", {
            region: Object.keys(item)[0].replaceAll(" ", "-"),
          });
        }}
      >
        {Object.values(item)}
      </Text>
    );
  };

  return (
    <Portal>
      <Pressable
        style={{
          backgroundColor: "#fff",
          width: "100%",
          top: 50,
          position: "absolute",
          zIndex: 999,
          justifyContent: "center",
          shadowColor: "lightgray",
          shadowOffset: { width: 1, height: 1 },
        }}
        key={`Menu_${selectedItem}`}
        onPress={() => handleClick(selectedItem)}
        onHoverOut={() => {
          handleMouseLeave();
        }}
        onHoverIn={handleHover}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 20,
            paddingLeft: 40,
            maxWidth: 1440,
            alignSelf: "center",
            width: "99%",
          }}
        >
          <View
            style={{
              width: "20%",
              paddingLeft: 30,
              borderRightWidth: 1,
              borderColor: "lightgray",
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontFamily: FontFamily.InterBold,
                marginBottom: 20,
              }}
            >
              Browse {selectedItem}
            </Text>
            <FlatList
              data={countryData}
              numColumns={2}
              renderItem={renderTopCategory}
            />
          </View>
          {/* <View
            style={{ borderWidth: 1, borderColor: "lightgray", height: 200 }}
          /> */}
          <View
            style={{
              width: "80%",
              paddingLeft: 40,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontFamily: FontFamily.InterBold,
                marginLeft: 10,
              }}
            >
              Latest in {selectedItem}
            </Text>
            <FlatList
              data={data}
              numColumns={2}
              showsVerticalScrollIndicator
              renderItem={renderItem}
              // keyExtractor={(item) => item?._id}
              scrollEnabled={false}
            />
          </View>
        </View>
      </Pressable>
    </Portal>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 20,
    fontFamily: FontFamily.InterBold,
    marginLeft: 20,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: "50%",
    marginBottom: 3,
    color: "#666666",
    fontSize: 16,
    letterSpacing: 0.2,
    marginRight: 5,
  },
  arrayView: {
    width: "20%",
  },
  latestNewsContainer: {
    width: "80%",
    backgroundColor: "transparent",
    padding: 10,
    marginLeft: "5%",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    width: "50%",
    height: "100%",
  },
  image: {
    width: 75,
    height: 75,
    padding: 20,
    marginLeft: 5,
    alignSelf: "center",
    borderRadius: 2,
    right: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: FontFamily.InterMedium,
    color: "#404040",
    marginRight: 10,
    width: "95%",
  },
});
