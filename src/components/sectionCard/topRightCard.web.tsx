import Skeleton from "react-loading-skeleton";
import { Image, Pressable, Text, View } from "react-native";

import "react-loading-skeleton/dist/skeleton.css";
import { FontFamily } from "../../assets/fonts";
import { HoverLinkText } from "../hover_Text/hover_Text";
import { formatTime } from "../timeFormat/formatTime";
export const TopRightCard = ({ item, index, navigation }) => {
  return (
    <Pressable
      key={"SectionNews_" + index}
      style={{
        width: "50%",
        marginVertical: 10,
        paddingHorizontal: 10,
      }}
      onPress={() => navigation.navigate("HeadLine", { id: item.slugid })}
    >
      {item?.title ? (
        <Image
          key={"SectionNews_" + index}
          source={{ uri: item?.image_url }}
          style={{
            width: "100%",
            aspectRatio: 2,
          }}
          resizeMode="cover"
        />
      ) : (
        <Skeleton width="100%" style={{ height: 250, alignSelf: "center" }} />
      )}

      <View
        style={{
          paddingVertical: 4,
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        {item?.category ? (
          <Text
            style={{
              fontSize: 14,
              color: "#404040",
              textTransform: "capitalize",
            }}
          >
            {item?.category.join(", ")}
          </Text>
        ) : (
          <Skeleton />
        )}
        {item?.title ? (
          <HoverLinkText
            text={item?.newTitle ?? item.title}
            style={{
              fontFamily: FontFamily.InterBold,
              fontSize: 16,
              color: "#000",
              marginTop: 5,
            }}
            numberOfLines={3}
            onPress={() => {
              navigation.navigate("HeadLine", { id: item.slugid });
            }}
          />
        ) : (
          <Skeleton count={2} style={{ fontSize: 16, marginTop: 5 }} />
        )}
        {item?.category ? (
          <Text style={{ fontSize: 12, marginTop: 10 }}>
            {formatTime(item.pubDate).split(" -")[0]}
          </Text>
        ) : (
          <Skeleton style={{ marginTop: 10 }} />
        )}
      </View>
    </Pressable>
  );
};
