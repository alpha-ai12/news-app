/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/
import * as React from "react";
import { Pressable, Text, View, Image, Share } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import LinearGradient from "react-native-linear-gradient";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../assets/fonts";
import {
  getStoreState,
  saveNews,
  storeActions,
  unSaveNews,
  userDataAPI,
} from "../../store";
import Emitter from "../../utils";
import { ImageLoader } from "../imageLoader/imageLoader";
import { formatTime } from "../timeFormat/formatTime";
export const TopCard = (props: any) => {
  const { item, navigation } = props;
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  const dispatch = useDispatch<Dispatch<any>>();
  const userData = useSelector(
    (rootState) => getStoreState(rootState).userData,
  );
  const save = async () => {
    actionSheetRef.current?.hide();
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
    actionSheetRef.current?.hide();
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
    <View
      style={{
        marginTop: 5,
        marginHorizontal: 20,
        shadowColor: "black",
        shadowOffset: {
          width: 2,
          height: 8,
        },
        shadowRadius: 5,
        shadowOpacity: 0.3,
      }}
    >
      {item?.title ? (
        <Pressable onPress={() => navigation.navigate("HeadLine", { item })}>
          {/* <Image
            source={{ uri: item.image_url }}
            style={{
              width: "95%",
              height: 250,
              borderRadius: 25,
              alignSelf: "center",
              marginTop: 12,
            }}
            resizeMode="cover"
          /> */}
          <ImageLoader
            source={{ uri: item.image_url }}
            borderRadius={25}
            style={{}}
            viewStyle={{
              marginTop: 12,
              alignItems: "center",
              width: "95%",
              height: 250,
            }}
          />
        </Pressable>
      ) : (
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={{
            width: "95%",
            height: 250,
            borderRadius: 25,
            alignSelf: "center",
            marginTop: 12,
          }}
        />
      )}
      {item?.title ? (
        <Text
          style={{
            fontSize: 24,
            fontFamily: FontFamily.InterMedium,
            marginTop: 12,
          }}
          onPress={() => navigation.navigate("HeadLine", { item })}
        >
          {item?.newTitle ?? item.title}
        </Text>
      ) : (
        <ShimmerPlaceHolder
          LinearGradient={LinearGradient}
          style={{
            width: "100%",
            fontSize: 24,
            marginTop: 12,
          }}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          {item?.title ? (
            <Text style={{ fontSize: 16, fontFamily: FontFamily.InterRegular }}>
              {item?.creator ?? "Open News AI"}
            </Text>
          ) : (
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={{
                fontSize: 16,
              }}
            />
          )}
          {item?.pubDate ? (
            <Text style={{ fontSize: 16, fontFamily: FontFamily.InterRegular }}>
              {formatTime(item?.pubDate).split("Updated")[1]}
            </Text>
          ) : (
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              style={{
                fontSize: 16,
                marginTop: 5,
              }}
            />
          )}
        </View>
        <Pressable
          onPress={() => {
            actionSheetRef.current?.show();
          }}
        >
          <Image
            source={require("../../assets/icons/menu-dots.png")}
            style={{
              width: 24,
              height: 24,
              resizeMode: "contain",
            }}
          />
        </Pressable>
      </View>
      <ActionSheet
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        }}
        indicatorStyle={{
          width: 50,
          backgroundColor: "gray",
          marginTop: 15,
        }}
        gestureEnabled
      >
        <View
          style={{
            padding: 20,
            height: 150,
            flexDirection: "row",
            width: "100%",
          }}
        >
          <View style={{ flexGrow: 1 }}>
            <Pressable
              style={{
                width: "100%",
                marginBottom: 15,
                flexDirection: "row",
                alignItems: "center",
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
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  marginLeft: 5,
                }}
              />
              <Text style={{ fontSize: 22, marginLeft: 15 }}>Share</Text>
            </Pressable>
            <Pressable
              style={{
                width: "100%",
                marginTop: 5,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                if (!userData?.name) {
                  actionSheetRef.current?.hide();
                  setTimeout(() => {
                    Emitter.emit("SignUpModel", {});
                  }, 200);
                } else {
                  userData?.saved_news?.includes(item._id) ? unSave() : save();
                }
              }}
            >
              <Image
                source={
                  userData?.saved_news?.includes(item._id)
                    ? require("../../assets/icons/bookmark-filled.png")
                    : require("../../assets/icons/bookmark.png")
                }
                style={{
                  marginLeft: 5,
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
              />
              <Text style={{ fontSize: 22, marginLeft: 15 }}>
                {userData?.saved_news?.includes(item._id) ? "UnSave" : "Save"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};
