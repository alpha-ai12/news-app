/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";

import { DateRange } from "./partial";
import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { formatTime, HoverLinkText, RenderFooter } from "../../components";

const RenderSearchCard = ({ item, navigation }) => {
  return (
    <View style={[styles.listView, { paddingHorizontal: 10 }]}>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Image
          source={{ uri: item?.image_url }}
          style={{
            width: "100%",
            flex: 1,
            resizeMode: "contain",
            alignContent: "center",
          }}
        />
      </View>
      <View
        style={{
          marginVertical: 5,
          flex: 4,
          marginLeft: 10,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            marginVertical: 2,
            textTransform: "capitalize",
          }}
        >
          {item.category && item.category.join(", ")}
        </Text>
        {item?.title ? (
          <HoverLinkText
            text={item?.newTitle ?? item.title}
            style={{
              color: "#404040",
              fontSize: 15,
              fontFamily: FontFamily.InterSemiBold,
              marginVertical: 1,
              textTransform: "capitalize",
            }}
            onPress={() => {
              item.slugid && navigation.navigate("HeadLine", { item });
            }}
            numberOfLines={2}
          />
        ) : (
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            style={{
              fontSize: 15,
              fontFamily: FontFamily.InterSemiBold,
              marginVertical: 1,
            }}
          />
        )}
        <Text style={{ fontSize: 12 }} numberOfLines={2} ellipsizeMode="tail">
          {item.description}
        </Text>
        <Text
          style={{
            fontSize: 10,
            marginVertical: 2,
            color: "#666666",
          }}
        >
          {formatTime(item.pubDate).split(" -")[0]}{" "}
          {formatTime(item.pubDate).split(" -")[1]}
        </Text>
      </View>
    </View>
  );
};
const renderCategory = ({ item, index, state, setState }) => {
  return (
    <Pressable
      style={{
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 5,
        height: 30,
        paddingHorizontal: 20,
        backgroundColor: state === item.value ? "black" : "lightgray",
      }}
      onPress={() => setState(item.value)}
    >
      <Text
        style={{
          textAlign: "center",
          color: state === item.value ? "white" : "black",
        }}
      >
        {item.label}
      </Text>
    </Pressable>
  );
};
const filterValues = [
  { label: "All", value: "all" },
  { label: "Business", value: "business" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health", value: "health" },
  { label: "Politics", value: "politics" },
  { label: "Science", value: "science" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
  { label: "World", value: "world" },
];
const timeline = [
  { label: "Any time", value: "anytime" },
  { label: "Past 24 hours", value: "past24hours" },
  { label: "Past Week", value: "pastweek" },
  { label: "Past Month", value: "pastmonth" },
  { label: "Past Year", value: "pastyear" },
];

const dataSort = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];
export const Discover = () => {
  const navigation = useNavigation<any>();
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("newest");
  const [dateValue, setDateValue] = useState("anytime");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searched, setSearched] = useState<any>(false);
  const [page, setPage] = useState<number>(1);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [moreData, setMoreData] = useState(false);
  const [isLoad, setIsLoaded] = useState(false);
  useEffect(() => {
    if (input?.length > 3) {
      setLoading(true);
      const timer = setTimeout(() => {
        fetchData(1, selectedCategory, dateValue, value);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
      if (input?.length === 0) {
        setData([]);
        setFilteredData([]);
        setTotalSize(0);
        setSearched(false);
      }
    }
  }, [input, selectedCategory, dateValue, value]);
  const fetchData = async (
    page: number,
    category: any,
    range: any,
    order: any,
  ) => {
    if (page === 1) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    const currentDate = new Date();
    await fetch(
      `https://dev-api.opennewsai.com/news/keyword/${input}?page=${page}${
        category !== "all" ? `&category=${category}` : ""
      }${order !== "newest" ? `&orderBy=asc` : ""}${
        range !== "anytime"
          ? `&start_date=${moment(DateRange(range)).format(
              "YYYY-MM-DD",
            )}&end_date=${moment(currentDate).format("YYYY-MM-DD")}`
          : ""
      }`,
    )
      .then((res) => res.json())
      .then((res) => {
        setLoading(false);
        setSearched(true);
        if (page === 1) {
          setData(res.newsData);
          setFilteredData(res.newsData);
          setTotalSize(res.newsCount);
          setPage(1);
          res.newsCount > 20 ? setMoreData(true) : setMoreData(false);
        } else {
          const newArray = data.concat(res.newsData);
          setData(newArray);
          const newArray1 = filteredData.concat(res.newsData);
          setFilteredData(newArray1);
          res.newsCount > page * 20 ? setMoreData(true) : setMoreData(false);
        }
      })
      .catch((e) => console.error(e));
  };
  const onLoadMore = () => {
    setLoading(true);
    fetchData(page + 1, selectedCategory, dateValue, value);
    setPage(page + 1);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <View style={{ paddingHorizontal: 20, marginTop: 15 }}>
          <Text style={{ fontFamily: FontFamily.InterBold, fontSize: 36 }}>
            Discover
          </Text>
          <Text style={{ fontSize: 14, color: "gray" }}>
            News from all around the world
          </Text>

          <View
            style={{
              backgroundColor: "lightgray",
              justifyContent: "center",
              width: "100%",
              height: 45,
              borderRadius: 22,
              marginVertical: 15,
            }}
          >
            <Image
              source={require("../../assets/icons/search.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
                position: "absolute",
                left: 15,
                tintColor: "gray",
              }}
            />
            <TextInput
              placeholder="Search"
              onChangeText={(text: any) => {
                setInput(text);
              }}
              value={input}
              placeholderTextColor="#5A5A5A"
              style={{ width: "75%", height: "100%", alignSelf: "center" }}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 15 }}
              disabled
            >
              <Image
                source={require("../../assets/icon/filter.png")}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                  tintColor: "gray",
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          keyExtractor={(item: any, index: number) => "CategoryType" + index}
          renderItem={({ item, index }) =>
            renderCategory({
              item,
              index,
              setState: setSelectedCategory,
              state: selectedCategory,
            })
          }
          data={filterValues}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 25 }}
          style={{ paddingLeft: 15 }}
        />
        <FlatList
          keyExtractor={(item: any, index: number) => "Categorytime" + index}
          renderItem={({ item, index }) =>
            renderCategory({
              item,
              index,
              setState: setDateValue,
              state: dateValue,
            })
          }
          data={timeline}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 25 }}
          style={{ paddingLeft: 15, marginVertical: 10 }}
        />
        <View
          style={{
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <View
            style={{
              marginBottom: 15,
              flexDirection: "row",
              justifyContent: "space-between",

              alignItems: "center",
            }}
          >
            <Text>{totalSize} Results</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text> Sort by: </Text>
              <Dropdown
                data={dataSort}
                labelField="label"
                valueField="value"
                placeholder="Newest"
                value={value}
                onChange={(item) => {
                  if (value !== item.value) {
                    setValue(item.value);
                  }
                }}
                style={{
                  height: 38,
                  width: 135,
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 10,
                }}
                renderRightIcon={() => (
                  <Image
                    source={require("../../assets/icons/down.png")}
                    style={{
                      height: 16,
                      width: 16,
                      resizeMode: "contain",
                    }}
                  />
                )} // Render chevron icon
              />
            </View>
          </View>

          {loading && isLoad ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ alignSelf: "center", marginTop: 10 }}
            />
          ) : data?.length > 0 && filteredData?.length > 0 ? (
            <>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  width: "100%",

                  shadowColor: "#808080",

                  shadowOffset: {
                    width: 0,
                    height: 0,
                  },
                  shadowOpacity: 0.4,
                  shadowRadius: 10,
                  elevation: 12,
                }}
              >
                {filteredData?.map((item, index) => {
                  return (
                    <View key={"search:" + index}>
                      <RenderSearchCard item={item} navigation={navigation} />
                      {index !== filteredData.length - 1 && (
                        <View
                          style={{
                            height: 0.5,
                            backgroundColor: "#808080",
                            marginVertical: 10,
                          }}
                        />
                      )}
                    </View>
                  );
                })}
              </View>
              {moreData && (
                <RenderFooter loading={loading} onLoadMore={onLoadMore} />
              )}
            </>
          ) : searched ? (
            <View
              style={{
                backgroundColor: "#fff",
                width: "100%",
                marginTop: 10,
              }}
            >
              <Text>NO RESULTS FOUND</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
