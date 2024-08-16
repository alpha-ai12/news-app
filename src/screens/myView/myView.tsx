/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
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
import {
  formatTime,
  HoverLinkText,
  Preferences,
  RenderFooter,
} from "../../components";
import {
  getStoreState,
  saveNews,
  storeActions,
  unSaveNews,
  userDataAPI,
} from "../../store";

const RenderSearchCard = ({
  item,
  navigation,
  index,
  save,
  unSave,
  userData,
}) => {
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
          flex: 4,
          marginLeft: 10,
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
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              alignSelf: "center",
              textTransform: "capitalize",
            }}
          >
            {item.country ? item.country.join(", ") : " "}
          </Text>
          <View
            style={{
              flexDirection: "row",
            }}
          >
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
              onPress={() => {
                userData?.saved_news?.includes(item._id)
                  ? unSave(item._id)
                  : save(item._id);
              }}
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
                  source={
                    userData?.saved_news?.includes(item._id)
                      ? require("../../assets/icons/bookmark-filled.png")
                      : require("../../assets/icons/bookmark.png")
                  }
                  style={{
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                  }}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export const MyView = () => {
  const preferences = useSelector(
    (rootState) => getStoreState(rootState).preferences,
  );
  const userData = useSelector(
    (rootState) => getStoreState(rootState).userData,
  );
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [page, setPage] = useState<number>(1);
  // const [totalSize, setTotalSize] = useState<number>(0);
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preferredData, setPreferredData] = useState([]);
  const [searched, setSearched] = useState<any>(false);
  const [moreData, setMoreData] = useState(false);
  const [isLoad, setIsLoaded] = useState(false);
  useEffect(() => {
    if (userData.email) {
      fetchData(1);
    }
  }, [preferences]);
  const fetchData = async (page: number) => {
    setLoading(true);
    if (page === 1) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
    await fetch(
      `https://dev-api.opennewsai.com/user/preference?userid=${userData?._id}&page=${page}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setSearched(true);
        setLoading(false);
        // console.log(res);

        if (res.length > 0 && res[0]?.count) {
          // setPreferredData(res[0].results);
          if (page === 1) {
            setPreferredData(res[0].results);
            // setTotalSize(res[0].count);
            setPage(1);
            res[0].count > 20 ? setMoreData(true) : setMoreData(false);
          } else {
            const newArray = preferredData.concat(res[0].results);
            setPreferredData(newArray);
            res[0].count > page * 20 ? setMoreData(true) : setMoreData(false);
          }
        }
      })
      .catch((e) => console.error(e));
  };

  const onLoadMore = () => {
    setLoading(true);
    fetchData(page + 1);
    setPage(page + 1);
  };
  const save = async (id) => {
    const result: any = await dispatch(
      saveNews({
        userid: userData._id,
        newsid: id,
      }),
    );
    if (result.payload.data.message === "saved successfully") {
      updateData();
      Toast.show({
        type: "info",
        text1: "News saved successfully",
        visibilityTime: 2500,
      });
    } else {
      console.log(result.payload.data.message);
    }
  };
  const unSave = async (id) => {
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
        style={styles.container}
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
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 34,
                  fontFamily: FontFamily.InterSemiBold,
                  color: "#404040",
                }}
              >
                My View
              </Text>
              <Text style={{ fontSize: 14, color: "gray" }}>
                Your News, Your Preferences
              </Text>
            </View>
            <Pressable
              style={{
                height: 35,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: "#404040",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                paddingHorizontal: 8,
                paddingVertical: 6,
              }}
              onPress={() => setModel(true)}
            >
              <Image
                source={require("../../assets/icon/settings.png")}
                style={{ width: 17, height: 17 }}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 16,
                  fontFamily: FontFamily.InterMedium,
                  color: "#404040",
                }}
              >
                Preferences
              </Text>
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
                justifyContent: "center",
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
                }}
              >
                {preferredData?.map((item, index) => {
                  return (
                    <View key={"MyViewNews_" + index}>
                      <RenderSearchCard
                        item={item}
                        navigation={navigation}
                        index={index}
                        save={save}
                        unSave={unSave}
                        userData={userData}
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
              <Text style={{ alignSelf: "center" }}>
                No Preference Available Currently
              </Text>
            </View>
          ) : (
            <></>
          )}
        </View>
        <Preferences
          model={model}
          setModel={setModel}
          data={preferences}
          dispatch={dispatch}
          userData={userData}
        />
      </ScrollView>
    </View>
  );
};
