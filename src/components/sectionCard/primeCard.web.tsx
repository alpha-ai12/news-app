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
import { HoverLinkText } from "../hover_Text/hover_Text";
import { formatTime } from "../timeFormat/formatTime";
export const PrimeCard = ({ item, index, navigation }) => {
  const width = useWindowDimensions().width;
  return (
    <Pressable
      key={"SectionNews_" + index}
      style={{
        width: width > 800 ? "40%" : "100%",
        marginVertical: 10,
      }}
      onPress={() => navigation.navigate("HeadLine", { id: item.slugid })}
    >
      {item?.title ? (
        <HoverLinkText
          text={item?.newTitle ?? item.title}
          style={{
            fontFamily: FontFamily.InterBold,
            fontSize: 24,
            color: "#404040",
            marginTop: 5,
          }}
          numberOfLines={3}
          onPress={() => {
            navigation.navigate("HeadLine", { id: item.slugid });
          }}
        />
      ) : (
        <Skeleton count={3} style={{ fontSize: 16, marginTop: 5 }} />
      )}
      {item?.category ? (
        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <Text
            style={{ fontSize: 12, textTransform: "capitalize" }}
          >{`${item.country[0]}  `}</Text>
          <Text style={{ fontSize: 12 }}>
            {formatTime(item.pubDate).split(" -")[0]}
          </Text>
        </View>
      ) : (
        <Skeleton style={{ marginBlock: 10 }} />
      )}
      {item?.title ? (
        <Image
          key={"SectionNews_" + index}
          source={{ uri: item?.image_url }}
          style={{
            width: "100%",
            aspectRatio: 1.5,
            height: "auto",
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
        {item?.description !== undefined ? (
          <Text
            style={{
              color: "#404040",
              fontSize: 14,
              marginVertical: 5,
            }}
            numberOfLines={6}
          >
            {item?.newDescription ?? item?.description}
          </Text>
        ) : (
          <Skeleton count={3} />
        )}
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: "#404040" }} />
    </Pressable>
  );
};
