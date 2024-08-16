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
export const SectionCard = ({ item, index, navigation }) => {
  const width = useWindowDimensions().width;

  return (
    <Pressable
      key={"SectionNews_" + index}
      style={{
        width: width > 800 ? "20%" : width > 620 ? "49%" : "100%",
        marginVertical: 10,
        paddingHorizontal: 10,
      }}
      onPress={() => {
        navigation.navigate("HeadLine", { id: item.slugid });
      }}
    >
      {item?.title ? (
        <Image
          source={{ uri: item.image_url }}
          style={{
            width: "100%",
            height: "auto",
            alignSelf: "center",
            aspectRatio: 1.3,
          }}
        />
      ) : (
        <Skeleton
          style={{
            width: "100%",
            height: 160,
            alignSelf: "center",
          }}
        />
      )}

      <View
        style={{
          paddingVertical: 4,
          justifyContent: "space-between",
          marginTop: 5,
          flex: 1,
        }}
      >
        <View>
          {item?.category ? (
            <Text
              style={{
                fontFamily: FontFamily.InterRegular,
                fontSize: 14,
                color: "#000",
                textTransform: "capitalize",
              }}
            >
              {item.category.join(", ")}
            </Text>
          ) : (
            <Skeleton style={{ marginBottom: 5 }} />
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
            <Skeleton count={3} />
          )}
        </View>
        {item?.category ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{ fontSize: 12, textTransform: "capitalize" }}
            >{`${item?.source_id} `}</Text>
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
