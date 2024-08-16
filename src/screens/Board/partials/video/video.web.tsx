import { useNavigation } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import "react-loading-skeleton/dist/skeleton.css";
import { Dispatch } from "redux";

import { FontFamily } from "../../../../assets/fonts";
import { Footer, SectionCard } from "../../../../components";
import { getWorldNews } from "../../../../store";

export const VideoRoute = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const { worldNewsData } = useSelector((state: any) => ({
    worldNewsData: state.store.worldNewsData,
  }));
  // const [itemIndex, setItemIndex] = useState(0);
  const [data, setData] = useState<any>([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
  ]);

  useEffect(() => {
    if (worldNewsData.length > 1) {
      setLoading(false);
      if (worldNewsData.length === data.length + 3) {
        setMoreData(false);
      } else {
        setData(worldNewsData?.slice(3));
      }
    }
  }, [worldNewsData]);

  const onLoadMore = () => {
    setLoading(true);
    dispatch(getWorldNews(page + 1));
    setPage(page + 1);
  };
  const reanderTodaySpecial = ({ item, index }) => {
    // const date = new Date(item?.pubDate).toDateString();
    return (
      <Pressable
        key={"SectionNews_" + index}
        style={{
          width: "100%",
          marginVertical: 10,
          paddingHorizontal: 10,
          maxWidth: 1440,
        }}
        onPress={() => navigation.navigate("HeadLine", { id: item.slugid })}
      >
        <View style={{ width: "100%", aspectRatio: 16 / 9 }}>
          {item?.title ? (
            // item?.video_url ? (
            <Video
              style={{
                height: "100%",
                width: "100%",
              }}
              videoStyle={{
                height: "100%",
                width: "100%",
              }}
              source={{
                uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
              }}
              useNativeControls
              resizeMode={ResizeMode.STRETCH}
              isLooping
              shouldPlay
            />
          ) : (
            // ) : (
            //   <View style={{ backgroundColor: "#969696" }}>
            //     <Image
            //       source={require("../../../../assets/icon/logo.png")}
            //       style={{
            //         width: "90%",
            //         height: 250,
            //         alignSelf: "center",
            //       }}
            //       resizeMode="contain"
            //     />
            //   </View>
            // )
            <Skeleton
              width="100%"
              style={{ aspectRatio: 16 / 9, alignSelf: "center" }}
            />
          )}
        </View>
        <View
          style={{
            paddingVertical: 4,
            justifyContent: "space-between",
            marginTop: 10,
            maxWidth: 1200,
          }}
        >
          {/* {item?.category ? (
            <Text
              style={{
                fontSize: 22,
                color: "#fff",
                textTransform: "capitalize",
              }}
            >
              {item?.category}
            </Text>
          ) : (
            <Skeleton />
          )} */}
          {item?.title ? (
            <Text
              style={{
                fontFamily: FontFamily.InterBold,
                fontSize: 24,
                color: "#fff",
                marginTop: 10,
              }}
              numberOfLines={3}
            >
              {item.title}
            </Text>
          ) : (
            <Skeleton count={3} style={{ fontSize: 16, marginTop: 10 }} />
          )}
          {item?.title ? (
            <Text
              style={{
                fontSize: 20,
                color: "#fff",
                marginTop: 10,
              }}
              numberOfLines={3}
            >
              {item.description}
            </Text>
          ) : (
            <Skeleton count={3} style={{ fontSize: 20, marginTop: 10 }} />
          )}

          {/* {item?.category ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                style={{ fontSize: 20, color: "#fff" }}
              >{`${item.source_id.toUpperCase()} : ${item.category}`}</Text>
              <Text style={{ fontSize: 20, color: "#fff" }}>{date}</Text>
            </View>
          ) : (
            <Skeleton style={{ marginTop: 10 }} />
          )} */}
        </View>
      </Pressable>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{
        flex: 1,
        // backgroundColor: "red",
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{
        // maxWidth: 1440,
        alignSelf: "center",
        width: "100%",
        alignItems: "center",
      }}
    >
      {/* <Text
        style={{
          marginTop: 15,
          marginLeft: 20,
          fontSize: 22,
          fontFamily: FontFamily.InterRegular,
        }}
      >
        World
      </Text> */}
      <View
        style={{
          alignItems: "center",
          // marginHorizontal: 10,
          backgroundColor: "#404040",
          width: "100%",
        }}
      >
        {[worldNewsData[0]].map((item, index) => {
          return reanderTodaySpecial({ item, index });
        })}
      </View>
      <View
        style={{
          marginTop: 10,
          flexWrap: "wrap",
          flexDirection: "row",
          marginHorizontal: 20,
          maxWidth: 1440,
        }}
      >
        {data.map((item, index) => {
          return (
            <SectionCard item={item} index={index} navigation={navigation} />
          );
        })}
      </View>
      {moreData && (
        <Pressable
          style={{
            width: 160,
            flexDirection: "row",
            borderColor: "#404040",
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            justifyContent: "space-around",
            alignItems: "center",
            alignSelf: "center",
            marginVertical: 20,
          }}
          onPress={() => {
            // setData(worldNewsData?.slice(0, data.length + 12));
            onLoadMore();
          }}
        >
          {!loading ? (
            <Image
              source={require("../../../../assets/icons/reload.png")}
              style={{ width: 20, height: 20, resizeMode: "contain" }}
            />
          ) : (
            <ActivityIndicator />
          )}
          <Text style={{ fontSize: 16, color: "blue" }}> Load More...</Text>
        </Pressable>
      )}
      <Footer />
    </ScrollView>
  );
};
