/*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  Share,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Platform,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { FloatingAction } from "react-native-floating-action";
import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";
import ImageHeaderScrollView from "react-native-image-header-scroll-view";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import RenderHTML from "react-native-render-html";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../assets/fonts";
import { formatTime } from "../../components";
import {
  getStoreState,
  saveNews,
  storeActions,
  unSaveNews,
  userDataAPI,
} from "../../store";
import Emitter from "../../utils";

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === "ios"
    ? TestIds.INTERSTITIAL
    : // ? "ca-app-pub-5386683070162029/4362951683"
      "ca-app-pub-5386683070162029/9104938634";

const interstitial = InterstitialAd.createForAdRequest(adUnitId);
export const HeadLine = ({ route }) => {
  const { item } = route.params;
  const navigation = useNavigation<any>();
  const width = useWindowDimensions().width;
  const navTitleView = useRef<any>();
  const titleView = useRef<any>();
  const userData = useSelector(
    (rootState) => getStoreState(rootState).userData,
  );
  const dispatch = useDispatch<Dispatch<any>>();
  const [fade, setFade] = useState(false);
  const [selectedFontSizeLabel, setSelectedFontSizeLabel] =
    useState("Small Text");
  const fontSizes = {
    "Small Text": 16,
    "Medium Text": 20,
    "Large Text": 24,
  };
  const actions = [
    {
      text: "Share",
      icon: require("../../assets/icons/social-share.png"),
      name: "Share",
      position: 1,
    },
    {
      text: userData?.saved_news?.includes(item._id) ? "UnSave" : "Save",
      icon: userData?.saved_news?.includes(item._id)
        ? require("../../assets/icons/bookmark-filled.png")
        : require("../../assets/icons/bookmark.png"),
      name: "Save",
      position: 0,
    },
  ];
  const fontSizeLabels = Object.keys(fontSizes);
  const handleFontSizeSelect = (label: any) => {
    setSelectedFontSizeLabel(label);
  };
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      },
    );
    interstitial.load();
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (loaded === true) {
      try {
        interstitial.show();
      } catch (error) {
        console.log(error);
      }
    }
  }, [loaded]);

  const tagsStyles = React.useMemo(
    () => ({
      body: {
        // whiteSpace: 'normal',
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
  const save = async () => {
    const result: any = await dispatch(
      saveNews({
        userid: userData._id,
        newsid: item._id,
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
        newsid: item._id,
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
    <View style={{ flex: 1 }}>
      <ImageHeaderScrollView
        maxHeight={400}
        minHeight={150}
        minOverlayOpacity={0.2}
        fadeOutForeground={false}
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
          if (e.nativeEvent.contentOffset.y > 125 && !fade) {
            setFade(true);
            navTitleView?.current?.fadeInUp(100);
            titleView?.current.fadeOut(100);
          }
          if (e.nativeEvent.contentOffset.y <= 125 && fade) {
            setFade(false);
            navTitleView?.current?.fadeOut(100);
            titleView?.current.fadeInUp(100);
          }
        }}
        disableHeaderGrow
        bounces={false}
        showsVerticalScrollIndicator={false}
        headerImage={{ uri: item?.image_url }}
        renderFixedForeground={() => (
          <Animatable.View
            style={{
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0,
              paddingRight: 56,
              paddingLeft: 52,
              paddingTop: 22,
            }}
            ref={navTitleView}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                backgroundColor: "transparent",
                fontFamily: FontFamily.InterBold,
              }}
              numberOfLines={3}
            >
              {item?.newTitle ?? item.title}
            </Text>
          </Animatable.View>
        )}
        renderForeground={() => (
          <Animatable.View
            style={{
              height: 360,
              paddingHorizontal: 40,
              justifyContent: "flex-end",
              // alignItems: "center",
              paddingVertical: 20,
            }}
            ref={titleView}
          >
            <Text
              style={{
                fontFamily: FontFamily.InterBold,
                fontSize: 24,
                color: "#FFF",
                marginVertical: 10,
              }}
            >
              {item?.newTitle ?? item.title}
            </Text>
            <Text style={{ fontSize: 14, color: "#FFF" }}>
              {formatTime(item?.pubDate).split(" -")[0]}
            </Text>
          </Animatable.View>
        )}
        contentContainerStyle={[
          Platform.OS === "android" && {
            marginTop: 200,
            backgroundColor: "transparent",
          },
        ]}
      >
        <View style={{ marginTop: Platform.OS === "ios" ? -40 : 0 }}>
          <View
            style={{
              flex: 1,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              backgroundColor: "#FFF",

              padding: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: FontFamily.InterBold,
                  fontSize: 24,
                  color: "#000",
                  marginVertical: 10,
                  textTransform: "capitalize",
                }}
              >
                {item?.source_id}
              </Text>
              <Image
                source={require("../../assets/icon/bluetick.png")}
                style={{ height: 24, width: 24, marginLeft: 8 }}
              />
            </View>
            {item?.newContent ? (
              <RenderHTML
                contentWidth={width}
                source={{
                  html: item?.newContent,
                }}
                tagsStyles={tagsStyles}
                defaultTextProps={{
                  selectable: true,
                }}
                enableExperimentalMarginCollapsing
              />
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
                {item?.newContent ?? item.content}
              </Text>
            )}
            {!userData.name && (
              <>
                <View
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                    opacity: 0.97,
                    alignSelf: "center",
                    marginTop: 155,
                  }}
                />
                <Pressable
                  style={{
                    alignSelf: "center",
                    paddingVertical: 9,
                    paddingHorizontal: 20,
                    borderRadius: 9,
                    backgroundColor: "#007AFF",
                    marginTop: 185,
                    position: "absolute",
                  }}
                  onPress={() => {
                    navigation.navigate("login");
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 17,
                      // fontFamily: "Helvetica",
                      fontFamily: FontFamily.InterMedium,
                    }}
                  >
                    Sign In To Read More
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </ImageHeaderScrollView>
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === "Share") {
            try {
              Share.share({
                message: `https://opennewsai.com/${item.slugid}`,
                title: "Open News AI",
              });
            } catch (error: any) {
              console.log(error);
            }
          }
          if (name === "Save") {
            !userData?.name
              ? setTimeout(() => {
                  Emitter.emit("SignUpModel", {});
                }, 100)
              : userData?.saved_news?.includes(item._id)
                ? unSave()
                : save();
          }
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 65,
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            left: 15,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/icon/back2.png")}
            style={{ width: 36, height: 36, resizeMode: "contain" }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
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
                  marginRight: 10,
                  width: 35,
                  height: 35,
                  backgroundColor: "rgba(255, 255, 255,0.3)",
                  borderRadius: 17.5,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/icons/fontIcon.png")}
                  style={{
                    width: 26,
                    height: 26,
                    resizeMode: "contain",
                    tintColor: "#fff",
                  }}
                />
              </View>
            </MenuTrigger>
            <MenuOptions
              optionsContainerStyle={{
                borderColor: "#D3D3D3",
                borderWidth: 1,
                marginTop: 45,
                marginLeft: -10,
              }}
              customStyles={{
                optionsContainer: {
                  width: 60,
                  borderRadius: 10,
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
                <Pressable key={label}>
                  <MenuOption
                    key={label}
                    value={label}
                    style={[
                      {
                        backgroundColor:
                          label !== selectedFontSizeLabel ? "#FFFFFF" : "#000",
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
                          label !== selectedFontSizeLabel ? "#000" : "#fff",
                      }}
                    >
                      A
                    </Text>
                  </MenuOption>

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
              ))}
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </View>
  );
};
