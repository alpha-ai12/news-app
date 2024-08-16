/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import Toast from "react-native-toast-message";
import Tooltip from "react-power-tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { Dispatch } from "redux";

import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import {
  Footer,
  formatTime,
  HoverLinkText,
  Preferences,
} from "../../components";
import { saveNews, storeActions, unSaveNews, userDataAPI } from "../../store";

const RenderSearchCard = ({
  item,
  navigation,
  visible,
  linkIsCopied,
  setVisible,
  index,
  setLinkIsCopied,
  save,
  unSave,
  userData,
  width,
}) => {
  const link = `https://opennewsai.com/${item?.slugid}`;
  return (
    <View style={styles.listView}>
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
            <Menu
              renderer={renderers.Popover}
              rendererProps={{ preferredPlacement: "bottom" }}
            >
              <MenuTrigger>
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
                    source={require("../../assets/icons/social-share.png")}
                    style={{
                      width: 17,
                      height: 17,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={{
                  borderColor: "#D3D3D3",
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                customStyles={{ optionsContainer: { flexDirection: "row" } }}
              >
                <MenuOption>
                  <EmailShareButton
                    url={link}
                    subject="News From Open News Ai"
                    body={item?.newTitle ?? item?.title}
                  >
                    <Image
                      source={require("../../assets/icon/email.png")}
                      style={{
                        width: 32,
                        height: 32,
                        resizeMode: "contain",
                      }}
                    />
                  </EmailShareButton>
                </MenuOption>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#d3d3d3",
                  }}
                />
                <MenuOption>
                  <FacebookShareButton
                    url={link}
                    quote={item?.newTitle ?? item?.title}
                  >
                    <FacebookIcon size={30} />
                  </FacebookShareButton>
                </MenuOption>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#d3d3d3",
                  }}
                />
                <MenuOption>
                  <LinkedinShareButton
                    url={link}
                    title={item?.newTitle ?? item?.title}
                    summary={item.newDescription ?? item.description}
                  >
                    <LinkedinIcon size={30} />
                  </LinkedinShareButton>
                </MenuOption>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#d3d3d3",
                  }}
                />
                <MenuOption>
                  <TwitterShareButton
                    url={link}
                    title={item?.newTitle ?? item?.title}
                  >
                    <TwitterIcon size={30} />
                  </TwitterShareButton>
                </MenuOption>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#d3d3d3",
                  }}
                />
                <MenuOption>
                  <WhatsappShareButton
                    url={link}
                    title={item?.newTitle ?? item?.title}
                  >
                    <WhatsappIcon size={30} />
                  </WhatsappShareButton>
                </MenuOption>
                <View
                  style={{
                    width: "100%",
                    height: 1,
                    backgroundColor: "#d3d3d3",
                  }}
                />
                <MenuOption>
                  <Pressable
                    onPress={() => {
                      navigator.clipboard
                        .writeText(link)
                        .then(() => {
                          if (visible === -1) {
                            Toast.show({
                              type: "info",
                              text1: "Link Copied!",
                              visibilityTime: 2500,
                            });
                          }
                          setLinkIsCopied(index);
                          setTimeout(() => {
                            setLinkIsCopied(-1);
                          }, 2000);
                        })
                        .catch(() =>
                          console.log("error", "Failed to copy text"),
                        );
                    }}
                    onHoverIn={() => {
                      setVisible(index);
                    }}
                    onHoverOut={() => {
                      setVisible(-1);
                    }}
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/link.png")}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                      }}
                    />
                  </Pressable>
                  <Tooltip
                    show={visible === index}
                    hoverColor="white"
                    backgroundColor={
                      linkIsCopied === index ? "#ffb6c1" : "white"
                    }
                    hoverBackground="#3b0586"
                    animation="fade"
                    position={width > 1525 ? "right center" : "left center"}
                  >
                    <span>
                      {linkIsCopied === index ? "Link Copied!" : "Copy link"}
                    </span>
                  </Tooltip>
                </MenuOption>
              </MenuOptions>
            </Menu>
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

const PageControl = ({ page, totalSize, pageBack, pageNext }: any) => {
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
        num > totalSize ? totalSize : num
      } of ${totalSize}`}</Text>
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

export const MyView = () => {
  const { userData, preferences } = useSelector((state: any) => ({
    userData: state.store.userData,
    preferences: state.store.preferences,
  }));
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const [page, setPage] = useState<number>(1);
  const [totalSize, setTotalSize] = useState<number>(0);
  const [model, setModel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(-1);
  const [linkIsCopied, setLinkIsCopied] = useState(-1);
  const [preferredData, setPreferredData] = useState([]);
  const [searched, setSearched] = useState<any>(false);
  useEffect(() => {
    if (userData.email) {
      fetchData(1);
    }
  }, [preferences]);
  const fetchData = async (page: number) => {
    setLoading(true);
    await fetch(
      `https://dev-api.opennewsai.com/user/preference?userid=${userData?._id}&page=${page}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setSearched(true);
        setLoading(false);
        // console.log(res);

        if (res.length > 0 && res[0]?.count) {
          setPreferredData(res[0].results);
          if (page === 1) {
            setTotalSize(res[0].count);
            setPage(1);
          }
        }
      })
      .catch((e) => console.error(e));
  };
  const pageBack = () => {
    if (page > 1) {
      setLoading(true);
      const newPage = page - 1;
      const timer = setTimeout(() => {
        fetchData(newPage);
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
        fetchData(newPage);
        setPage(newPage);
      }, 2000);
      return () => clearTimeout(timer);
    }
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={styles.container}
    >
      <View style={[styles.mainView, { minHeight: height - 120 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={styles.headerText}>My View</Text>
          <Pressable
            style={{
              height: 40,
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
              style={{ width: 20, height: 20 }}
            />
            <Text
              style={{
                marginLeft: 5,
                fontSize: 18,
                fontFamily: FontFamily.InterRegular,
                color: "#404040",
              }}
            >
              My Preferences
            </Text>
          </Pressable>
        </View>
        {loading ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
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
              paddingHorizontal: 20,
              marginTop: 10,
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
                paddingVertical: 10,
              }}
            >
              <FlatList
                keyExtractor={(item: any, index: number) => "search:" + index}
                renderItem={({ item, index }: any) => (
                  <RenderSearchCard
                    item={item}
                    navigation={navigation}
                    index={index}
                    setVisible={setVisible}
                    visible={visible}
                    linkIsCopied={linkIsCopied}
                    setLinkIsCopied={setLinkIsCopied}
                    save={save}
                    unSave={unSave}
                    userData={userData}
                    width={width}
                  />
                )}
                data={preferredData}
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
              totalSize={totalSize}
              pageBack={pageBack}
              pageNext={pageNext}
            />
          </View>
        ) : searched ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
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
      <Footer />
    </ScrollView>
  );
};
