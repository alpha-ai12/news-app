import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  TextInput,
  ActivityIndicator,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { DateRange } from "./partial";
import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { Footer, formatTime, HoverLinkText } from "../../components";

const RenderSearchCard = ({ item, dispatch, navigation }) => {
  return (
    <View style={[styles.listView, { paddingHorizontal: 10 }]}>
      <View style={{ justifyContent: "center", flex: 1 }}>
        <Image
          source={{ uri: item?.image_url }}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: 2,
            alignContent: "center",
            aspectRatio: 2,
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
              item.slugid &&
                navigation.navigate("HeadLine", { id: item.slugid });
            }}
            numberOfLines={2}
          />
        ) : (
          <Skeleton count={2} />
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
const PageControl = ({ page, totalnum, pageBack, pageNext }: any) => {
  const num = page * 20;
  return (
    <View
      style={{
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "center",
      }}
    >
      <Pressable
        style={{
          padding: 5,
          borderColor: "#404040",
          borderRadius: 5,
          borderWidth: 1,
          marginRight: 15,
        }}
        onPress={pageBack}
      >
        <Image
          source={require("../../assets/icons/chevronLeft.png")}
          style={{
            width: 25,
            height: 25,
            resizeMode: "contain",
          }}
        />
      </Pressable>
      <Text style={{ fontSize: 16 }}>{`${num - 19} to ${
        num > totalnum ? totalnum : num
      } of ${totalnum}`}</Text>
      <Pressable
        style={{
          padding: 5,
          borderColor: "#404040",
          borderRadius: 5,
          borderWidth: 1,
          marginLeft: 15,
        }}
        onPress={pageNext}
      >
        <Image
          source={require("../../assets/icons/chevronRight.png")}
          style={{
            width: 25,
            height: 25,
            resizeMode: "contain",
          }}
        />
      </Pressable>
    </View>
  );
};
const dataSort = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];
export const Discover = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
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
        setData(res.newsData);
        setFilteredData(res.newsData);

        setLoading(false);
        setSearched(true);
        if (page === 1) {
          setTotalSize(res.newsCount);
          setPage(1);
        }
      })
      .catch((e) => console.error(e));
  };

  const pageBack = () => {
    if (page > 1) {
      setLoading(true);
      const newPage = page - 1;
      const timer = setTimeout(() => {
        fetchData(newPage, selectedCategory, dateValue, value);
        setPage(newPage);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };
  const pageNext = () => {
    if (page < Math.ceil(totalSize / 20)) {
      const newPage = page + 1;
      setLoading(true);
      const timer = setTimeout(() => {
        fetchData(newPage, selectedCategory, dateValue, value);
        setPage(newPage);
      }, 2000);
      return () => clearTimeout(timer);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          maxWidth: 1440,
          width: "100%",
          alignSelf: "center",
          flexWrap: "wrap",
        }}
      >
        <View style={{ width: width > 1000 ? "20%" : "100%" }}>
          <Text style={styles.filterText}>Filter by</Text>
          <View style={styles.filterView}>
            <Text style={styles.filterText}>Section</Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={filterValues}
              search={false}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="All"
              autoScroll={false}
              value={selectedCategory}
              onChange={(item) => {
                if (selectedCategory !== item.value) {
                  setSelectedCategory(item.value);
                }
              }}
            />

            <Text style={styles.filterText}>Date Range</Text>
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              data={timeline}
              search={false}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Any time"
              value={dateValue}
              onChange={(item) => {
                if (dateValue !== item.value) {
                  setDateValue(item.value);
                }
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: "grey",
              alignSelf: "center",
              marginHorizontal: 20,
            }}
          >
            We are continually enhancing our website, including our search
            experience. We welcome feedback which you can provide using the
            feedback tab on the right of the page.
          </Text>
        </View>

        <View
          style={{
            paddingHorizontal: width > 1000 ? 80 : 20,
            marginTop: 15,
            width: width > 1000 ? "60%" : "100%",
            alignSelf: "flex-start",
            minHeight: width > 1000 ? height - 110 : height - 380,
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.InterBold,
              fontSize: 19,
              alignSelf: "flex-start",
            }}
          >
            Search Open News AI
          </Text>
          <Text style={{ fontSize: 14, color: "gray" }}>
            News from all around the world
          </Text>
          <View
            style={{
              backgroundColor: "#ffffff",
              borderWidth: 1,
              borderColor: "#000",
              justifyContent: "center",
              height: 45,
              borderRadius: 10,
              marginVertical: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              placeholder="Search"
              onChangeText={(text: any) => {
                setInput(text);
              }}
              value={input}
              style={{
                width: "100%",
                height: "100%",
                alignSelf: "center",
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: "transparent",
              }}
            />
            {input.length > 0 ? (
              <Pressable
                style={{ marginRight: 15 }}
                onPress={() => setInput("")}
              >
                <Image
                  source={require("../../assets/icons/closeIcon.png")}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: "contain",
                  }}
                />
              </Pressable>
            ) : (
              <Image
                source={require("../../assets/icons/search.png")}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  marginRight: 15,
                  tintColor: "gray",
                }}
              />
            )}
          </View>
          <View
            style={{
              marginVertical: 15,
              height: "2%",
              flexDirection: "row",
              justifyContent: "space-between",
              // alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text>{totalSize} Results</Text>
            <View
              style={{
                flexDirection: "row",
                // justifyContent: "center",
                // alignContent: "center",
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

          {loading ? (
            <ActivityIndicator
              size="large"
              color="#000"
              style={{ alignSelf: "center" }}
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
                  paddingVertical: 10,
                }}
              >
                <FlatList
                  keyExtractor={(item: any, index: number) => "search:" + index}
                  renderItem={(item: any) => (
                    <RenderSearchCard
                      item={item.item}
                      dispatch={dispatch}
                      navigation={navigation}
                    />
                  )}
                  data={filteredData}
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        height: 0.5,
                        backgroundColor: "#808080",
                        marginVertical: 10,
                      }}
                    />
                  )}
                />
              </View>
              <PageControl
                page={page}
                totalnum={totalSize}
                pageBack={pageBack}
                pageNext={pageNext}
              />
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
      <Footer />
    </ScrollView>
  );
};
