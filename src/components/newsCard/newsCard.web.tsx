import Skeleton from "react-loading-skeleton";
import {
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import "react-loading-skeleton/dist/skeleton.css";
import { FontFamily } from "../../assets/fonts";
import { formatTime } from "../timeFormat/formatTime";
export const NewsCard = ({ item, index, navigation }) => {
  // const date = new Date(item.pubDate).toDateString();
  const width = useWindowDimensions().width;
  return (
    <Pressable
      key={"TodaysNews_" + index}
      style={{
        backgroundColor: "#F0F0F0",
        width:
          width > 1280
            ? width > 1440
              ? 456
              : (width - 70) / 3
            : width > 660
              ? (width - 60) / 2
              : "100%",
        marginVertical: 10,
        flexDirection: "row",
        padding: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "grey",
        elevation: 5,
        marginHorizontal: 5,
      }}
      onPress={() => navigation.navigate("HeadLine", { id: item.slugid })}
    >
      {item?.title ? (
        item?.image_url ? (
          <Image
            key={"TodaysNews" + index}
            source={{ uri: item.image_url }}
            borderRadius={20}
            style={{
              alignItems: "center",
              width: "28%",
              aspectRatio: 1,
              borderRadius: 20,
            }}
          />
        ) : (
          <View
            style={{
              backgroundColor: "#969696",
              borderRadius: 20,
              aspectRatio: 1,
              width: "28%",
            }}
          >
            <Image
              source={require("../../assets/icon/logo.png")}
              borderRadius={20}
              style={{
                width: "90%",
                height: "90%",
                alignSelf: "center",
              }}
              resizeMode="contain"
            />
          </View>
        )
      ) : (
        <View
          style={{
            borderRadius: 20,
            aspectRatio: 1,
            width: "28%",
          }}
        >
          <Skeleton width="100%" style={{ aspectRatio: 1, borderRadius: 20 }} />
        </View>
      )}
      <View
        style={{
          width: "72%",
          paddingVertical: 4,
          paddingHorizontal: 10,
          justifyContent: "space-between",
        }}
      >
        {item?.title ? (
          <Text
            style={{
              fontFamily: FontFamily.InterBold,
              fontSize: 16,
              color: "#000",
            }}
            numberOfLines={3}
          >
            {item?.title}
          </Text>
        ) : (
          <Skeleton count={3} style={{ fontSize: 16 }} />
        )}
        {item?.category ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 12, textTransform: "capitalize" }}
            >{`${item?.source_id}`}</Text>
            <Text style={{ fontSize: 12 }}>
              {formatTime(item.pubDate).split(" -")[0]}
            </Text>
          </View>
        ) : (
          <Skeleton style={{ marginTop: 10 }} />
        )}
      </View>
    </Pressable>
  );
};
