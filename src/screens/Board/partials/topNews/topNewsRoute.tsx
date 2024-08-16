import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
  RefreshControl,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../../../assets/fonts";
import { ImageLoader, formatTime } from "../../../../components";
import CustomSlider from "../../../../components/carousel_Item/customeSlider";
import {
  getMostRecent,
  getStoreState,
  localNews,
  storeActions,
} from "../../../../store";
const RenderTodaysNews = ({ item, index, navigation }) => {
  return (
    <Pressable
      style={{
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
              fontFamily: FontFamily.InterSemiBold,
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
            style={{
              fontFamily: FontFamily.InterSemiBold,
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
            <Text style={{ fontSize: 12, textTransform: "capitalize" }}>{`${
              item?.creator ?? "Open News AI"
            } `}</Text>
          ) : (
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={{
                fontSize: 12,
                width: "50%",
              }}
            />
          )}
          {item?.title ? (
            <Text style={{ fontSize: 12 }}>
              {formatTime(item.pubDate).split("Updated")[1]}
            </Text>
          ) : (
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
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
export const TopNewsRoute = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [recentData, setRecentData] = useState<any>([
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
  const [localData, setLocalData] = useState<any>([
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
  const [refreshing, setRefreshing] = useState(false);
  const recentNewsData = useSelector(
    (rootState) => getStoreState(rootState).recentNewsData,
  );
  const localNewsData = useSelector(
    (rootState) => getStoreState(rootState).localNewsData,
  );
  const regionCode = useSelector(
    (rootState) => getStoreState(rootState).regionCode,
  );
  useEffect(() => {
    if (recentNewsData.length > 1) {
      setRecentData(recentNewsData);
    }
  }, [recentNewsData]);
  useEffect(() => {
    if (localNewsData.length > 1) {
      setLocalData(localNewsData.slice(0, 10));
    }
  }, [localNewsData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRecentData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    dispatch(storeActions.setRecentNewsData([]));
    dispatch(getMostRecent());
    setLocalData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    dispatch(storeActions.setLocalNewsData([]));
    dispatch(localNews(regionCode));
    setRefreshing(false);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#FFF" }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#1e90ff"
            />
          }
        >
          <View>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 10,
                marginTop: 20,
                marginLeft: 10,
              }}
            >
              <Text
                style={{ fontSize: 24, fontFamily: FontFamily.InterSemiBold }}
              >
                Breaking News
              </Text>
              <Text
                style={{
                  fontFamily: FontFamily.InterMedium,
                  fontSize: 16,
                  color: "#007AFF",
                }}
                onPress={() => {
                  navigation.navigate("HighLights", recentData);
                }}
              >
                View All
              </Text>
            </View>

            <CustomSlider data={recentData} navigation={navigation} />
          </View>

          <View style={{ marginTop: 10 }}>
            <View
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                paddingHorizontal: 20,
                marginBottom: 20,
              }}
            >
              <Text
                style={{ fontFamily: FontFamily.InterSemiBold, fontSize: 24 }}
              >
                Local Highlights
              </Text>
              <Text
                style={{
                  fontFamily: FontFamily.InterMedium,
                  fontSize: 16,
                  color: "#007AFF",
                }}
                onPress={() => {
                  navigation.navigate("ViewAll", { key: false });
                }}
              >
                View All
              </Text>
            </View>
          </View>
          <View style={{ paddingBottom: 30 }}>
            {localData.map((item, index) => {
              return (
                <View key={"TodaysNews_" + index}>
                  <RenderTodaysNews
                    item={item}
                    index={index}
                    navigation={navigation}
                  />
                  {index !== recentData.length - 1 && (
                    <View
                      style={{
                        height: 2,
                        backgroundColor: "lightgray",
                        marginHorizontal: 10,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default React.memo(TopNewsRoute);
