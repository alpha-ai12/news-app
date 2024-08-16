import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import CountryPicker, { Country } from "react-native-country-picker-modal";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../../../assets/fonts";
import { RenderFooter } from "../../../../components";
import { NewsCard } from "../../../../components/newsCard/newsCard";
import { TopCard } from "../../../../components/topCard/topCard";
import {
  countryNews,
  getCountryNameFromId,
  getStoreState,
  storeActions,
} from "../../../../store";

export const CountryRoute = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const countryNewsData = useSelector(
    (rootState) => getStoreState(rootState).countryNewsData,
  );
  const regionCode = useSelector(
    (rootState) => getStoreState(rootState).regionCode,
  );
  const [code, setCode] = useState<any>(regionCode.toUpperCase());
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
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
    setPage(1);
    setData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    setMoreData(true);
    dispatch(storeActions.setCountryNewsData([]));
    dispatch(countryNews({ page: 1, region: code.toLowerCase() }));
    return () => {};
  }, [code]);

  useEffect(() => {
    if (
      countryNewsData.length > 0 &&
      countryNewsData[0]?.country.includes(
        getCountryNameFromId(code.toLowerCase()).toLowerCase(),
      )
    ) {
      setLoading(false);
      if (countryNewsData.length === data.length) {
        setMoreData(false);
      } else {
        if (page > 1 && countryNewsData.length - data.length < 20) {
          setMoreData(false);
        }
        if (page === 1 && countryNewsData.length < 20) {
          setMoreData(false);
        }
        setData(countryNewsData);
      }
    }
  }, [countryNewsData]);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    dispatch(storeActions.setCountryNewsData([]));
    dispatch(countryNews({ page: 1, region: code.toLowerCase() }));
    setPage(1);
    setRefreshing(false);
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    dispatch(countryNews({ page: page + 1, region: code.toLowerCase() }));
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
          fontFamily: FontFamily.InterRegular,
        }}
      >
        Global Insights
      </Text>
      <Text
        style={{
          marginTop: 5,
          marginLeft: 20,
          fontSize: 16,
          fontFamily: FontFamily.InterRegular,
        }}
      >
        Worldwide Headlines: Unveiling Stories Nation by Nation
      </Text>
      <CountryPicker
        countryCode={code}
        onSelect={(country: Country) => setCode(country.cca2)}
        containerButtonStyle={{
          alignSelf: "center",
          alignItems: "center",
          width: "90%",
          backgroundColor: "#d3d3d3",
          borderRadius: 20,
          marginTop: 15,
          borderColor: "#404040",
          borderWidth: 2,
        }}
        withCountryNameButton
        countryCodes={[
          "AF",
          "AO",
          "AR",
          "AU",
          "BD",
          "BB",
          "BM",
          "BT",
          "BR",
          "BG",
          "KH",
          "CM",
          "CA",
          "KY",
          "CN",
          "CR",
          "CU",
          "CY",
          "CZ",
          "DO",
          "ET",
          "FJ",
          "FI",
          "FR",
          "GA",
          "GE",
          "DE",
          "GH",
          "GR",
          "HU",
          "IN",
          "ID",
          "IE",
          "IL",
          "IT",
          "JM",
          "JP",
          "KE",
          "KW",
          "KG",
          "LY",
          "LT",
          "MO",
          "MW",
          "MY",
          "MV",
          "MT",
          "MX",
          "MM",
          "NA",
          "NP",
          "NL",
          "NZ",
          "NG",
          "OM",
          "PK",
          "PH",
          "PT",
          "RO",
          "RU",
          "WS",
          "SM",
          "SA",
          "SG",
          "SK",
          "SB",
          "SO",
          "ZA",
          "KR",
          "ES",
          "LK",
          "SD",
          "SE",
          "CH",
          "TJ",
          "TZ",
          "TH",
          "TR",
          "TM",
          "UG",
          "AE",
          "GB",
          "US",
          "VE",
          "ZM",
          "ZW",
        ]}
        withFilter
      />
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
