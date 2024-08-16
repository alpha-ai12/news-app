import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../assets/fonts";
import { ImageLoader, RenderFooter } from "../../components";
import {
  getCountryNameFromId,
  getStoreState,
  regionNews,
  storeActions,
} from "../../store";

const RenderItem = ({ item, index, navigation }) => {
  return (
    <Pressable
      style={{
        flexDirection: "column",
        alignItems: "center",
        paddingVertical: 30,
        paddingBottom: 10,
      }}
      onPress={() => navigation.navigate("HeadLine", { item })}
    >
      {item?.title ? (
        <ImageLoader
          source={{ uri: item.image_url }}
          style={{}}
          viewStyle={{
            alignSelf: "center",
            width: "95%",
            height: 260,
            borderRadius: 15,
          }}
        />
      ) : (
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          style={{
            alignSelf: "center",
            width: "95%",
            height: 260,
            borderRadius: 15,
          }}
        />
      )}
      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
        }}
      >
        {item?.title ? (
          <Text
            style={{
              color: "#363738",
              fontSize: 15,
              fontFamily: FontFamily.InterMedium,
              marginTop: 5,
              textTransform: "capitalize",
            }}
          >
            {item?.country}
          </Text>
        ) : (
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{
              fontSize: 15,
              fontFamily: FontFamily.InterMedium,
              marginTop: 5,
            }}
          />
        )}
        {item?.title ? (
          <Text
            style={{
              fontFamily: FontFamily.InterSemiBold,
              fontSize: 18,
              color: "#000",
              marginVertical: 5,
            }}
            numberOfLines={3}
          >
            {item?.newTitle ?? item?.title}
          </Text>
        ) : (
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            style={{ fontSize: 18, marginVertical: 5 }}
          />
        )}
        <View
          style={{
            flexDirection: "row",
            marginTop: 5,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/icons/logo.png")}
            style={{ height: 40, width: 40, borderRadius: 20 }}
          />
          {item?.title ? (
            <Text
              style={{
                fontSize: 12,
                justifyContent: "center",
                marginLeft: 15,
                textTransform: "capitalize",
              }}
            >{`${item.source_id} : ${item.category}`}</Text>
          ) : (
            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={{ fontSize: 12, justifyContent: "center", marginLeft: 15 }}
            />
          )}
        </View>
      </View>
    </Pressable>
  );
};
export const ViewAll = (props) => {
  const { key } = props.route.params;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
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
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const recentNewsData = useSelector(
    (rootState) => getStoreState(rootState).recentNewsData,
  );
  const regionNewsData = useSelector(
    (rootState) => getStoreState(rootState).regionNewsData,
  );
  const regionCode = useSelector(
    (rootState) => getStoreState(rootState).regionCode,
  );
  useEffect(() => {
    if (
      !regionNewsData[0]?.country.includes(
        getCountryNameFromId(regionCode).toLowerCase(),
      ) &&
      !key
    ) {
      dispatch(storeActions.setRegionNewsData([]));
      dispatch(regionNews({ page: 1, region: regionCode }));
    }
    if (key) {
      setData(recentNewsData);
    }
  }, [regionCode, key]);
  useEffect(() => {
    if (regionNewsData.length > 0 && !key) {
      setLoading(false);
      if (regionNewsData.length === data.length) {
        setMoreData(false);
      } else {
        if (page > 1 && regionNewsData.length - data.length < 20) {
          setMoreData(false);
        }
        if (page === 1 && regionNewsData.length < 20) {
          setMoreData(false);
        }
        setData(regionNewsData);
      }
    }
  }, [regionNewsData, key, recentNewsData]);
  const onLoadMore = () => {
    setLoading(true);
    dispatch(regionNews({ page: page + 1, region: regionCode }));
    setPage(page + 1);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: "#ffffff" }}
    >
      <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
        <Text style={{ fontFamily: FontFamily.InterSemiBold, fontSize: 36 }}>
          {key ? "Breaking News" : "Local Highlights"}
        </Text>
      </View>

      <View style={{ paddingBottom: 30, marginTop: 10 }}>
        {data.map((item: any, index: number) => {
          return (
            <View key={"TodaysNews_" + index}>
              <RenderItem item={item} index={index} navigation={navigation} />
              {index !== data.length - 1 && (
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
        {moreData && !key && (
          <RenderFooter loading={loading} onLoadMore={onLoadMore} />
        )}
      </View>
    </ScrollView>
  );
};
