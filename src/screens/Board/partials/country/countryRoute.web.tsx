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

import Code from "./code.json";
import { FontFamily } from "../../../../assets/fonts";
import { Footer, SectionCard, UpperCard } from "../../../../components";
import { regionNews, storeActions } from "../../../../store";

const getCountryNameFromId = (id: string) => {
  let name = "";
  Code.forEach((i) => {
    const key = Object.keys(i)[0];
    if (i[key] === id) {
      name = key;
    }
  });
  return name;
};

const getCountryIdFromName = (name: string) => {
  let id = "";
  Code.forEach((i) => {
    const value = Object.values(i)[0];
    const newName = name.toLowerCase().replaceAll("-", " ");
    if (Object.keys(i)[0].toLowerCase() === newName) {
      id = value;
    }
  });
  return id;
};
export const CountryRoute = ({ route }) => {
  const region = route.params.region;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [page, setPage] = useState(1);
  const [moreData, setMoreData] = useState(true);
  const [loading, setLoading] = useState(false);
  const { regionNewsData } = useSelector((state: any) => ({
    regionNewsData: state.store.regionNewsData,
  }));
  const [code, setCode] = useState("");
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
    const regCode = getCountryIdFromName(region);
    setData([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
    if (regCode === "") {
      navigation.navigate("NotFound");
    } else {
      dispatch(storeActions.setRegionNewsData([]));
      setCode(regCode);
      dispatch(regionNews({ page: 1, region: regCode }));
    }
  }, [region]);
  useEffect(() => {
    if (
      regionNewsData.length > 0 &&
      regionNewsData[0]?.country.includes(
        region.toLowerCase().replaceAll("-", " "),
      )
    ) {
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
  }, [regionNewsData]);

  const onLoadMore = () => {
    setLoading(true);
    dispatch(regionNews({ page: page + 1, region: code }));
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
        {getCountryNameFromId(code)}
      </Text>
      <UpperCard
        data={data.filter((i: any) => i.image_url !== undefined)}
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
        {regionNewsData.length > 0
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
