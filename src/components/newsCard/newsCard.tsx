import { Pressable, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

import { FontFamily } from "../../assets/fonts";
import { ImageLoader } from "../imageLoader/imageLoader";
import { formatTime } from "../timeFormat/formatTime";
export const NewsCard = ({ item, index, navigation }) => {
  return (
    <Pressable
      style={{
        // width: "100%",
        height: 100,

        marginVertical: 10,
        flexDirection: "row",
        paddingLeft: 20,
        paddingRight: 10,
      }}
      onPress={() => navigation.navigate("HeadLine", { item })}
    >
      {item?.title ? (
        <ImageLoader
          source={{ uri: item.image_url }}
          borderRadius={20}
          style={{}}
          viewStyle={{ alignItems: "center", width: "28%", height: 100 }}
        />
      ) : (
        <ShimmerPlaceHolder
          stopAutoRun
          LinearGradient={LinearGradient}
          style={{
            alignItems: "center",
            width: "28%",
            height: 100,
            borderRadius: 20,
          }}
        />
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
            {item?.newTitle ?? item?.title}
          </Text>
        ) : (
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            stopAutoRun
            style={{
              fontFamily: FontFamily.InterBold,
              fontSize: 16,
              width: "100%",
              height: 40,
            }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {item?.title ? (
            <Text
              style={{
                fontSize: 12,
                textTransform: "capitalize",
                maxWidth: "60%",
              }}
              numberOfLines={1}
            >{`${item?.creator ?? "Open News AI"} `}</Text>
          ) : (
            <ShimmerPlaceHolder
              stopAutoRun
              LinearGradient={LinearGradient}
              style={{
                fontSize: 12,
                width: "50%",
              }}
            />
          )}
          {item?.title ? (
            <Text style={{ fontSize: 12 }}>
              {formatTime(item?.pubDate).split(" -")[0]}
            </Text>
          ) : (
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              stopAutoRun
              style={{
                fontSize: 12,
                width: "30%",
              }}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};
