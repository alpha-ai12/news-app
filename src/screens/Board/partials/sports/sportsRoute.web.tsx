import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../../../assets/fonts";
import { Footer, SectionCard, UpperCard } from "../../../../components";
import { getSportsNews } from "../../../../store";
export const SportsRoute = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const { sportsNewsData } = useSelector((state: any) => ({
    sportsNewsData: state.store.sportsNewsData,
  }));
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
    if (sportsNewsData.length > 0) {
      setLoading(false);
      if (sportsNewsData.length === data.length) {
        setMoreData(false);
      } else {
        if (page > 1 && sportsNewsData.length - data.length < 20) {
          setMoreData(false);
        }
        if (page === 1 && sportsNewsData.length < 20) {
          setMoreData(false);
        }
        setData(sportsNewsData);
      }
    }
  }, [sportsNewsData]);

  const onLoadMore = () => {
    setLoading(true);
    dispatch(getSportsNews(page + 1));
    setPage(page + 1);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{
        maxWidth: 1440,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <Text
        style={{
          marginTop: 15,
          marginLeft: 20,
          fontSize: 22,
          fontFamily: FontFamily.InterRegular,
        }}
      >
        Sports
      </Text>
      <UpperCard
        data={data.filter((i) => i.image_url !== undefined)}
        navigation={navigation}
      />
      <View
        style={{
          marginTop: 10,
          flexWrap: "wrap",
          flexDirection: "row",
          marginHorizontal: 20,
        }}
      >
        {sportsNewsData.length > 0
          ? data
              .filter((i) => i.image_url !== undefined)
              .slice(5)
              .map((item, index) => {
                return (
                  <SectionCard
                    item={item}
                    index={index}
                    navigation={navigation}
                  />
                );
              })
          : [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}].map(
              (item, index) => {
                return (
                  <SectionCard
                    item={item}
                    index={index}
                    navigation={navigation}
                  />
                );
              },
            )}
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
