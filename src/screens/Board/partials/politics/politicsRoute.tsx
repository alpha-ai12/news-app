import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../../../assets/fonts";
import { RenderFooter } from "../../../../components";
import { NewsCard } from "../../../../components/newsCard/newsCard";
import { TopCard } from "../../../../components/topCard/topCard";
import {
  getPoliticsNews,
  getStoreState,
  storeActions,
} from "../../../../store";
export const PoliticsRoute = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const politicsNewsData = useSelector(
    (rootState) => getStoreState(rootState).politicsNewsData,
  );
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
    if (politicsNewsData.length > 0) {
      setLoading(false);
      if (politicsNewsData.length === data.length) {
        setMoreData(false);
      } else {
        if (page > 1 && politicsNewsData.length - data.length < 20) {
          setMoreData(false);
        }
        if (page === 1 && politicsNewsData.length < 20) {
          setMoreData(false);
        }
        setData(politicsNewsData);
      }
    }
  }, [politicsNewsData]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    dispatch(storeActions.setPoliticsNewsData([]));
    dispatch(getPoliticsNews(1));
    setPage(1);
    setRefreshing(false);
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    dispatch(getPoliticsNews(page + 1));
    setPage(page + 1);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="#1e90ff"
        />
      }
    >
      <Text
        style={{
          marginTop: 15,
          marginLeft: 20,
          fontSize: 22,
          fontFamily: FontFamily.InterSemiBold,
        }}
      >
        Politics
      </Text>
      <TopCard item={data[0]} navigation={navigation} />
      <View style={{ paddingBottom: 30, marginTop: 10 }}>
        {data.slice(1).map((item, index) => {
          return (
            <View key={"TodaysNews_" + index}>
              <NewsCard item={item} index={index} navigation={navigation} />
              {index !== data.length - 2 && (
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
        {moreData && <RenderFooter loading={loading} onLoadMore={onLoadMore} />}
      </View>
    </ScrollView>
  );
};
