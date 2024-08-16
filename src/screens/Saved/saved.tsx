/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  Share,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { HoverLinkText, RenderFooter, formatTime } from "../../components";
import {
  getStoreState,
  storeActions,
  unSaveNews,
  userDataAPI,
} from "../../store";

const RenderSearchCard = ({ item, navigation, index, unSave }) => {
  return (
    <View style={styles.listView}>
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
          marginLeft: 10,
          flex: 4,
          justifyContent: "space-between",
        }}
      >
        <View>
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
                fontFamily: FontFamily.InterBold,
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
                fontFamily: FontFamily.InterBold,
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
        <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
          <Pressable
            style={{
              width: 30,
              height: 30,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "gray",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              try {
                Share.share({
                  message: `https://opennewsai.com/${item.slugid}`,
                  title: "Open News AI",
                });
              } catch (error: any) {
                console.log(error);
              }
            }}
          >
            <Image
              source={require("../../assets/icons/social-share.png")}
              style={{
                width: 17,
                height: 17,
                resizeMode: "contain",
              }}
            />
          </Pressable>

          <Pressable
            style={{ marginLeft: 10 }}
            onPress={() => unSave(item._id)}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "gray",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/bookmark-filled.png")}
                style={{
                  width: 19,
                  height: 18,
                  resizeMode: "contain",
                }}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export const Saved = () => {
  const userData = useSelector(
    (rootState) => getStoreState(rootState).userData,
  );
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [page, setPage] = useState<number>(1);
  // const [totalSize, setTotalSize] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [preferredData, setPreferredData] = useState([]);
  const [searched, setSearched] = useState<any>(false);
  const [input, setInput] = useState("");
  const [moreData, setMoreData] = useState(false);
  const [isLoad, setIsLoaded] = useState(false);
  useEffect(() => {
    if (userData.saved_news && input.length === 0) {
      fetchData(1);
    }
    if (input.length > 0) {
      searchData(1);
    }
  }, [userData?.saved_news, input]);

  const searchData = async (page: number) => {
    setLoading(true);
    if (page === 1) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    await fetch(
      `https://dev-api.opennewsai.com/user/keyword/${input}/?userid=${userData._id}&page=${page}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setSearched(true);
        setLoading(false);
        // setData(res.newsData);
        // console.log(res);
        if (res && res?.paginatedNews) {
          if (page === 1) {
            // setTotalSize(res.totalItems);
            setPage(1);
            setPreferredData(res.paginatedNews);
            res.totalItems > 20 ? setMoreData(true) : setMoreData(false);
          } else {
            const newArray = preferredData.concat(res.paginatedNews);
            setPreferredData(newArray);
            res.totalItems > page * 20 ? setMoreData(true) : setMoreData(false);
          }
        }
      })
      .catch((e) => console.error(e));
  };
  const fetchData = async (page: number) => {
    setLoading(true);
    if (page === 1) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    await fetch(
      `https://dev-api.opennewsai.com/user/save-news/${userData._id}?page=${page}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setSearched(true);
        setLoading(false);
        // setData(res.newsData);
        // console.log(res);

        if (res && res?.newsDetail) {
          if (page === 1) {
            setPreferredData(res.newsDetail);
            // setTotalSize(res.count);
            setPage(1);
            res.count > 20 ? setMoreData(true) : setMoreData(false);
          } else {
            const newArray = preferredData.concat(res.newsDetail);
            setPreferredData(newArray);
            res.count > page * 20 ? setMoreData(true) : setMoreData(false);
          }
        }
      })
      .catch((e) => console.error(e));
  };

  const onLoadMore = () => {
    setLoading(true);
    input.length > 3 ? searchData(page + 1) : fetchData(page + 1);
    setPage(page + 1);
  };

  const unSave = async (id: any) => {
    const result: any = await dispatch(
      unSaveNews({
        userid: userData._id,
        newsid: id,
      }),
    );
    if (result.payload.data.message === "unsaved successfully") {
      updateData();
      Toast.show({
        type: "info",
        text1: "News unsaved successfully",
        visibilityTime: 2500,
      });
    } else {
      console.log(result.payload.data.message);
    }
  };
  const updateData = async () => {
    const result: any = await dispatch(
      userDataAPI({ email: userData.email, oAuth: userData.oAuth }),
    );
    // console.log(result.payload.data);
    if (result.payload.messsage) {
      console.log(result.payload.message);
    } else {
      dispatch(storeActions.setUserData(result.payload.data || {}));
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ flex: 1, backgroundColor: "#fff" }}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View
          style={{
            backgroundColor: "#fff",
            width: "100%",
            alignSelf: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontSize: 34,
                fontFamily: FontFamily.InterSemiBold,
                color: "#404040",
              }}
            >
              Saved
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>
              Save & Savor: Your News, Your Interests
            </Text>
          </View>
          <View style={{ justifyContent: "center", marginTop: 10 }}>
            <TextInput
              placeholder="Search"
              onChangeText={(text: any) => {
                setInput(text);
              }}
              value={input}
              style={{
                // height: "100%",
                // width: "100%",
                height: 42,
                borderWidth: 1,
                borderColor: "#404040",
                borderRadius: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            />
            <Pressable
              style={{
                backgroundColor: "#AFAFAF",
                height: 40,
                width: 38,
                alignItems: "center",
                justifyContent: "center",
                borderTopRightRadius: 9.5,
                borderBottomRightRadius: 9.5,
                position: "absolute",
                alignSelf: "flex-end",
              }}
            >
              <Image
                source={require("../../assets/icons/search.png")}
                style={{
                  tintColor: "#FFF",
                  width: 21,
                  height: 21,
                }}
              />
            </Pressable>
          </View>
          {loading && isLoad ? (
            <View style={{ flex: 1, justifyContent: "center", marginTop: 20 }}>
              <ActivityIndicator
                size="large"
                color="#000"
                style={{ alignSelf: "center" }}
              />
            </View>
          ) : preferredData.length > 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "space-between",
                // paddingHorizontal: 20,
                marginTop: 20,
              }}
            >
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
                  // paddingVertical: 10,
                }}
              >
                {preferredData?.map((item, index) => {
                  return (
                    <View key={"savedNews_" + index}>
                      <RenderSearchCard
                        item={item}
                        navigation={navigation}
                        index={index}
                        unSave={unSave}
                      />
                      {index !== preferredData.length - 1 && (
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
            </View>
          ) : searched ? (
            <View style={{ flex: 1, justifyContent: "center", marginTop: 20 }}>
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 24,
                  fontFamily: FontFamily.InterSemiBold,
                  color: "#666666",
                }}
              >
                No News Found
              </Text>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: 10,
                  fontSize: 20,
                  fontFamily: FontFamily.InterMedium,
                  color: "#666666",
                }}
              >
                Looks like you haven't saved any news yet
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
