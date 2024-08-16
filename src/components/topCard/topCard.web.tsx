import * as React from "react";
import { Pressable, Text, View, Image } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";

import { FontFamily } from "../../assets/fonts";
export const TopCard = (props: any) => {
  const { item, navigation } = props;
  const actionSheetRef = React.useRef<ActionSheetRef>(null);
  return (
    <View style={{ marginTop: 5, marginHorizontal: 20 }}>
      <Image
        source={{ uri: item.image_url }}
        style={{
          // width: "95%",
          height: 250,
          aspectRatio: 1,
          borderRadius: 25,
          alignSelf: "center",
          marginTop: 12,
        }}
        resizeMode="cover"
      />
      <Text
        style={{
          fontSize: 24,
          fontFamily: FontFamily.InterMedium,
          marginTop: 12,
        }}
        onPress={() => navigation.navigate("HeadLine", { id: item.slugid })}
      >
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 10,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontFamily: FontFamily.InterRegular }}>
            {item?.creator ?? "Brain"}
          </Text>
          <Text style={{ fontSize: 16, fontFamily: FontFamily.InterRegular }}>
            6h ago
          </Text>
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
            <View
              style={{
                width: "100%",

                marginBottom: 15,
                flexDirection: "row",
                alignItems: "center",
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
            </View>
            <View
              style={{
                width: "100%",
                marginTop: 5,
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/icons/bookmark.png")}
                style={{
                  marginLeft: 5,
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
              />
              <Text style={{ fontSize: 22, marginLeft: 15 }}>Save</Text>
            </View>
          </View>
        </View>
      </ActionSheet>
    </View>
  );
};
