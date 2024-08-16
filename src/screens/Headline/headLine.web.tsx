/*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  ScrollView,
  useWindowDimensions,
  Pressable,
} from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import RenderHtml from "react-native-render-html";
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

import { FontFamily } from "../../assets/fonts";
import { Footer, HoverLinkText, formatTime } from "../../components";
import { saveNews, storeActions, unSaveNews, userDataAPI } from "../../store";

const renderdata = ({ item, index, navigation, width }) => {
  return (
    <View
      style={{
        paddingVertical: 10,
        marginRight: 20,
        borderBottomWidth: 1,
        borderBottomColor: "lightgray",
        minWidth: width > 1440 ? 300 : width / 4.8,
      }}
    >
      {item?.category ? (
        <Text
          style={{
            color: "#404040",
            fontSize: 14,
            textTransform: "capitalize",
          }}
        >
          {item?.category}
        </Text>
      ) : (
        <Skeleton style={{ marginBottom: 10 }} />
      )}
      {item?.title ? (
        <HoverLinkText
          text={item?.newTitle ?? item.title}
          style={{
            color: "#404040",
            fontSize: 18,
            fontFamily: FontFamily.InterBold,
            textTransform: "capitalize",
            marginVertical: 10,
          }}
          onPress={() => {
            navigation.navigate("HeadLine", { id: item.slugid });
          }}
          numberOfLines={3}
          // onPress={() => props.jumpTo("Detail")}
        />
      ) : (
        <Skeleton count={3} />
      )}

      {item?.pubDate ? (
        <Text
          style={{
            color: "#404040",
            fontSize: 13,
          }}
        >
          {formatTime(item?.pubDate).split(" -")[0]}
        </Text>
      ) : (
        <Skeleton style={{ marginTop: 10 }} />
      )}
    </View>
  );
};
export const HeadLine = ({ route }) => {
  const slugId = route.params.id;
  const [newsData, setNewsData] = useState<any>({});
  const navigation = useNavigation<any>();
  // const [model, setModel] = useState(false);
  const { featureData } = useSelector((state: any) => ({
    featureData: state.store.featureData,
  }));
  const { userData } = useSelector((state: any) => ({
    userData: state.store.userData,
  }));

  const dispatch = useDispatch<Dispatch<any>>();
  const [visible, setVisible] = useState(false);
  const [linkIsCopied, setLinkIsCopied] = useState(false);
  const [ratio, setRatio] = useState(2);
  const width = useWindowDimensions().width;
  const [data, setData] = useState<any>([{}, {}, {}, {}, {}, {}]);
  const API_URL = "https://dev-api.opennewsai.com/news";
  const [selectedFontSizeLabel, setSelectedFontSizeLabel] =
    useState("Small Text");

  const [hoveredOption, setHoveredOption] = useState(null);
  const fontSizes = {
    "Small Text": 16,
    "Medium Text": 20,
    "Large Text": 24,
  };

  const fontSizeLabels = Object.keys(fontSizes);

  const handleFontSizeSelect = (label: any) => {
    setSelectedFontSizeLabel(label);
  };
  useEffect(() => {
    setNewsData({});
    setRatio(2);
    getData();
  }, [slugId]);
  useEffect(() => {
    if (featureData.length > 0 && newsData?.category) {
      featureData.forEach((a: any, index: number) => {
        if (Object.keys(a)[0] === newsData?.category[0]) {
          const obj: any = Object.values(a)[0];
          const result = obj.filter((a: any) => a._id !== newsData._id);
          setData(result.slice(0, 6));
        }
      });
    }
  }, [featureData, newsData.category]);
  const getData = async () => {
    const url = `${API_URL}/${slugId}`;
    const response = await axios.get(url, {
      headers: {
        crossDomain: true,
      },
    });
    if (response.data.length === 0) {
      navigation.navigate("TopNews");
    } else {
      Image.getSize(response.data[0]?.image_url, (width, height) => {
        const rate = width / height;
        setRatio(rate);
      });
      setNewsData(response?.data[0]);
      // console.log(
      //   "response  ",
      //   response?.data[0]?.source_id,
      //   "   link   ",
      //   response?.data[0]?.link
      // );
    }
  };
  const copyToClipboard = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        if (!visible) {
          Toast.show({
            type: "info",
            text1: "Link Copied!",
            visibilityTime: 2500,
          });
        }
        setLinkIsCopied(true);
        setTimeout(() => {
          setLinkIsCopied(false);
        }, 2000);
      })
      .catch(() => console.log("error", "Failed to copy text"));
  };

  const tagsStyles = React.useMemo(
    () => ({
      body: {
        fontSize: fontSizes[selectedFontSizeLabel],
        color: "#404040",
        fontFamily: "Arial,sans-serif",
      },
      a: {
        color: "#0080FE",
      },
    }),
    [selectedFontSizeLabel],
  );

  const getDateTime = (pubDate: any) => {
    const datetime = formatTime(pubDate).split(" -");
    return `${datetime[0]} ${datetime[1]} - ${datetime[2]}`;
  };
  const save = async () => {
    const result: any = await dispatch(
      saveNews({
        userid: userData._id,
        newsid: newsData._id,
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
  const unSave = async () => {
    const result: any = await dispatch(
      unSaveNews({
        userid: userData._id,
        newsid: newsData._id,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            maxWidth: 1080,
            width: width > 1080 ? "100%" : "90%",
            flexDirection: "row",
            alignSelf: "center",
            marginVertical: 28,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 5 }}>
            <View
              style={{
                paddingVertical: 10,
                marginRight: 10,
                // borderBottomWidth: 1,
                // marginTop: 5,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                {newsData.category !== undefined ? (
                  <Text
                    style={{
                      color: "#404040",
                      fontSize: 16,
                      fontFamily: FontFamily.InterRegular,
                      textTransform: "capitalize",
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderColor: "#666666",
                      borderRadius: 18,
                    }}
                  >
                    {newsData.category.join(", ")}
                  </Text>
                ) : (
                  <Skeleton
                    style={{
                      borderRadius: 18,
                      fontSize: 16,
                      fontFamily: FontFamily.InterRegular,
                      paddingBlock: 8,
                      paddingInline: 20,
                      borderWidth: 1,
                      borderColor: "#666666",
                    }}
                  />
                )}
              </View>
              {newsData.title !== undefined ? (
                <Text
                  style={{
                    color: "#404040",
                    fontSize: 40,
                    fontFamily: FontFamily.InterMedium,
                    textTransform: "capitalize",
                    marginVertical: 15,
                  }}
                >
                  {newsData?.newTitle ?? newsData.title}
                </Text>
              ) : (
                <Skeleton
                  style={{
                    fontSize: 40,
                    fontFamily: FontFamily.InterMedium,
                    marginBlock: 15,
                  }}
                  // count={2}
                />
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ maxWidth: "50%" }}>
                  {newsData?.creator !== undefined ? (
                    <Text
                      style={{
                        color: "#404040",
                        fontSize: 16,
                        fontFamily: FontFamily.InterRegular,
                      }}
                    >
                      By{" "}
                      <Text
                        style={{
                          color: "#404040",
                          fontSize: 16,
                          fontFamily: FontFamily.InterRegular,
                        }}
                      >
                        {newsData.creator !== undefined &&
                        newsData.creator !== null &&
                        newsData?.creator.length > 0
                          ? newsData?.creator[0] !== ""
                            ? newsData?.creator[0] ?? "Open AI News"
                            : "Open AI News"
                          : "Open AI News"}
                      </Text>
                    </Text>
                  ) : (
                    <Skeleton
                      style={{
                        fontSize: 16,
                        fontFamily: FontFamily.InterRegular,
                        width: 60,
                        paddingBlock: 8,
                        paddingInline: 20,
                        borderRadius: 15,
                      }}
                    />
                  )}
                  {newsData.pubDate !== undefined ? (
                    <Text
                      style={{
                        color: "#404040",
                        fontSize: 14,
                        fontFamily: FontFamily.InterRegular,
                        marginVertical: 10,
                      }}
                    >
                      {getDateTime(newsData.pubDate)}
                    </Text>
                  ) : (
                    <Skeleton
                      style={{
                        fontSize: 16,
                        fontFamily: FontFamily.InterRegular,
                        width: 100,
                        paddingBlock: 8,
                        paddingInline: 20,
                        borderRadius: 15,
                        marginBlock: 10,
                      }}
                    />
                  )}
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginRight: 5,
                  }}
                >
                  <Pressable
                    style={{ marginRight: 10 }}
                    onPress={() => {
                      !userData?.name
                        ? window.dispatchEvent(
                            new CustomEvent("SignUpModelon", {
                              detail: "saved",
                            }),
                          )
                        : userData?.saved_news?.includes(newsData._id)
                          ? unSave()
                          : save();
                    }}
                  >
                    <View
                      style={{
                        width: 42,
                        height: 42,
                        borderWidth: 1,
                        borderRadius: 10,
                        borderColor: "gray",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Image
                        source={
                          userData?.saved_news?.includes(newsData._id)
                            ? require("../../assets/icons/bookmark-filled.png")
                            : require("../../assets/icons/bookmark.png")
                        }
                        style={{
                          width: 28,
                          height: 28,
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                  </Pressable>
                  <Menu
                    onSelect={(value) => handleFontSizeSelect(value)}
                    style={{ marginRight: 10 }}
                  >
                    <MenuTrigger
                      customStyles={{
                        TriggerTouchableComponent: Pressable,
                      }}
                    >
                      <View
                        style={{
                          width: 42,
                          height: 42,
                          borderWidth: 1,
                          borderRadius: 10,
                          borderColor: "gray",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("../../assets/icons/fontIcon.png")}
                          style={{
                            width: 32,
                            height: 32,
                            resizeMode: "contain",
                          }}
                        />
                      </View>
                    </MenuTrigger>
                    <MenuOptions
                      optionsContainerStyle={{
                        borderColor: "#D3D3D3",
                        borderWidth: 1,
                      }}
                      customStyles={{
                        optionsContainer: {
                          width: 60,
                          borderRadius: 10,
                          marginTop: 45,
                          marginRight: 80,
                        },
                        optionText: {
                          padding: 10,
                          fontFamily: FontFamily.InterBold,
                          color: "black",
                        },
                        optionTouchable: {
                          activeOpacity: 0.6,
                          marginRight: 80,
                        },
                      }}
                    >
                      {fontSizeLabels.map((label, index) => (
                        <>
                          <Pressable
                            key={label}
                            onHoverIn={() => {
                              setHoveredOption(label);
                              setVisible(true);
                            }}
                            onHoverOut={() => {
                              setHoveredOption(null);
                              setVisible(false);
                            }}
                            onPressOut={() => setHoveredOption(null)}
                          >
                            <MenuOption
                              key={label}
                              value={label}
                              style={[
                                {
                                  backgroundColor:
                                    label !== selectedFontSizeLabel
                                      ? "#FFFFFF"
                                      : "#000",
                                },
                                index === 0 && {
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                },
                                index === 2 && {
                                  borderBottomLeftRadius: 10,
                                  borderBottomRightRadius: 10,
                                },
                              ]}
                            >
                              <Text
                                style={{
                                  fontSize: fontSizes[label],
                                  alignSelf: "center",

                                  color:
                                    label !== selectedFontSizeLabel
                                      ? "#000"
                                      : "#fff",
                                }}
                              >
                                A
                              </Text>
                            </MenuOption>
                            {hoveredOption === label && (
                              <Tooltip
                                show
                                textAlign="center"
                                fontWeight="900"
                                animation="fade"
                              >
                                <span>{hoveredOption}</span>
                              </Tooltip>
                            )}
                            {index !== 2 && (
                              <View
                                style={{
                                  width: "100%",
                                  height: 1,
                                  backgroundColor: "#d3d3d3",
                                }}
                              />
                            )}
                          </Pressable>
                        </>
                      ))}
                    </MenuOptions>
                  </Menu>
                  <Menu
                    renderer={renderers.Popover}
                    rendererProps={{ preferredPlacement: "bottom" }}
                  >
                    <MenuTrigger>
                      <View
                        style={{
                          width: 42,
                          height: 42,
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
                            width: 24,
                            height: 24,
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
                    >
                      <MenuOption>
                        <EmailShareButton
                          url={window.location.href}
                          subject="News From Open News Ai"
                          body={newsData?.newTitle ?? newsData?.title}
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
                          url={window.location.href}
                          quote={newsData?.newTitle ?? newsData?.title}
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
                          url={window.location.href}
                          title={newsData?.newTitle ?? newsData?.title}
                          summary={
                            newsData.newDescription ?? newsData.description
                          }
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
                          url={window.location.href}
                          title={newsData?.newTitle ?? newsData?.title}
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
                          url={window.location.href}
                          title={newsData?.newTitle ?? newsData?.title}
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
                            copyToClipboard(window.location.href);
                          }}
                          onHoverIn={() => {
                            setVisible(true);
                          }}
                          onHoverOut={() => {
                            setVisible(false);
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
                          show={visible}
                          hoverColor="white"
                          backgroundColor={linkIsCopied ? "#ffb6c1" : "white"}
                          hoverBackground="#3b0586"
                          animation="fade"
                        >
                          <span>
                            {linkIsCopied ? "Link Copied!" : "Copy link"}
                          </span>
                        </Tooltip>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </View>
              </View>
              {newsData.title !== undefined ? (
                <Image
                  source={{
                    uri: newsData?.image_url,
                  }}
                  style={{
                    width: "100%",
                    alignSelf: "center",
                    aspectRatio: ratio,
                    marginVertical: 10,
                    // backgroundColor: "#fff",
                  }}
                />
              ) : (
                <Skeleton
                  width="100%"
                  style={{ aspectRatio: 2, marginBlock: 10 }}
                />
              )}
              {newsData.description !== undefined ? (
                <Text
                  style={{
                    // fontSize: 16,
                    color: "#404040",
                    fontFamily: FontFamily.InterRegular,
                    marginVertical: 10,
                    // fontFamily: "Arial,sans-serif",
                    fontSize: fontSizes[selectedFontSizeLabel],
                  }}
                >
                  {newsData?.newDescription ?? newsData.description}
                </Text>
              ) : (
                <Skeleton
                  style={{
                    marginBlock: 5,
                    fontSize: 16,

                    fontFamily: FontFamily.InterRegular,
                  }}
                  count={3}
                />
              )}

              <View
                style={[
                  newsData.title === undefined && {
                    marginTop: 15,
                  },
                ]}
              >
                {newsData.title !== undefined ? (
                  newsData?.newContent ? (
                    <>
                      {!userData?.name ? (
                        <Pressable
                          style={{
                            alignSelf: "center",
                            borderColor: "lightgray",
                            borderWidth: 1,
                            paddingVertical: 8,
                            paddingHorizontal: 20,
                            marginTop: 15,
                            borderRadius: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a background color for the Pressable
                          }}
                          onPress={() => {
                            window.dispatchEvent(
                              new CustomEvent("SignUpModelon", {
                                detail: "read",
                              }),
                            );
                            // navigation.navigate("login", { back: true });
                          }}
                        >
                          <Text style={{}}>Sign In To Read More</Text>
                        </Pressable>
                      ) : (
                        <RenderHtml
                          contentWidth={width}
                          source={{
                            html: newsData?.newContent,
                          }}
                          tagsStyles={tagsStyles}
                          defaultTextProps={{
                            selectable: true,
                          }}
                          renderersProps={{
                            ul: {
                              markerBoxStyle: {
                                paddingRight: 3,
                                top: fontSizes[selectedFontSizeLabel] - 3,
                              },
                            },
                          }}
                          enableExperimentalMarginCollapsing
                        />
                      )}

                      {/* {!userData?.name && (
                        <Pressable
                          style={{
                            alignSelf: "center",
                            position: "absolute",
                            borderColor: "lightgray",
                            borderWidth: 1,
                            paddingVertical: 8,
                            paddingHorizontal: 20,
                            marginTop: 20,
                            borderRadius: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a background color for the Pressable
                          }}
                          onPress={() => {
                            navigation.navigate("login");
                          }}
                        >
                          <Text style={{}}>Sign In To Read More</Text>
                        </Pressable>
                      )} */}
                    </>
                  ) : (
                    <Text
                      style={{
                        marginVertical: 10,
                        fontSize: fontSizes[selectedFontSizeLabel],
                        color: "#404040",
                        fontFamily: FontFamily.InterRegular,
                        marginBottom: 50,
                      }}
                    >
                      {newsData?.newContent ?? newsData.content}
                    </Text>
                  )
                ) : (
                  <Skeleton
                    style={{
                      marginBlock: 5,
                      fontSize: 16,

                      fontFamily: FontFamily.InterRegular,
                    }}
                    count={5}
                  />
                )}
              </View>
            </View>
          </View>
          {width > 1025 && (
            <View
              style={{
                flex: 2,
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              <View style={{ flex: 2 }}>
                {newsData?.category ? (
                  <View
                    style={{
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FontFamily.InterRegular,
                        fontSize: 24,
                        textDecorationLine: "underline",
                        textTransform: "capitalize",
                      }}
                    >
                      {newsData.category[0]}
                    </Text>
                    <Image
                      source={require("../../assets/icon/right.png")}
                      style={{
                        marginLeft: 5,
                        marginTop: 5,
                        width: 14,
                        height: 14,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                ) : (
                  <Skeleton
                    style={{
                      fontSize: 24,
                      fontFamily: FontFamily.InterRegular,
                    }}
                    // count={2}
                  />
                )}
                {data.map((item, index) => {
                  return renderdata({ item, index, navigation, width });
                })}
              </View>
            </View>
          )}
        </View>
        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
};
