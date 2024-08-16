import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ProgressBar } from "react-native-paper";

import { FontFamily } from "../../assets/fonts";

const ProfilePhotoList = ({ item, index, navigation }) => {
  const [onloadingImage, setOnloadingImage] = React.useState(false);
  return (
    <View
      style={[
        style.profileImage,
        { backgroundColor: "#000", top: 0, left: 0, right: 0 },
      ]}
    >
      {onloadingImage && (
        <ActivityIndicator
          size="large"
          color="blue"
          style={style.loaderImage}
        />
      )}
      <Image
        onLoadStart={() => {
          setOnloadingImage(true);
        }}
        onLoadEnd={() => {
          setOnloadingImage(false);
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        source={{
          uri: item.image_url,
        }}
        resizeMode="cover"
      />
      <>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
          style={{ flex: 1, width: "100%" }}
        >
          <View style={style.dataContainer}>
            <View style={style.categoryContainer}>
              <Text style={style.categoryText}>{item.category}</Text>
            </View>
            <Text
              style={style.titleText}
              onPress={() => {
                navigation.navigate("HeadLine", { item });
              }}
            >
              {item.newTitle ?? item.title}
            </Text>
          </View>
        </LinearGradient>
      </>
    </View>
  );
};

export const HighLights = (props: any) => {
  const navigation = useNavigation();
  const [arrayIndex, setArrayIndex] = React.useState<number>(0);
  const recentData = props.route.params;
  const renderStatusBarItem = () => {
    return recentData.map((item, index) => {
      const isActive = index === arrayIndex;
      const progressBarColor = isActive ? "white" : "white";
      const progressBarHeight = isActive ? 1 : 1;

      return (
        <View
          style={{ flex: 1, marginHorizontal: 3, height: 2, borderRadius: 2 }}
          key={index}
        >
          <ProgressBar
            progress={isActive ? 1 : 0}
            color={progressBarColor}
            style={{ height: progressBarHeight, borderRadius: 2 }}
          />
          {isActive && (
            <View
              style={{
                backgroundColor: "white",
                position: "absolute",
                bottom: 1,
                height: 2,
                width: "100%",
                borderRadius: 2,
              }}
            />
          )}
        </View>
      );
    });
  };

  const onViewProfileRef = React.useRef((viewableItems) => {
    const { changed } = viewableItems;
    if (changed && changed.length > 0) {
      setArrayIndex(changed[0].index);
    }
  });

  const viewProfileConfigRef = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  });

  return (
    <View style={[style.container]}>
      <FlatList
        horizontal
        data={recentData}
        // extraData={profilePhotos}
        renderItem={({ item, index }) => (
          <ProfilePhotoList item={item} index={index} navigation={navigation} />
        )}
        keyExtractor={(item, index) => index.toString()}
        pagingEnabled
        bounces={false}
        onViewableItemsChanged={onViewProfileRef.current}
        viewabilityConfig={viewProfileConfigRef.current}
        scrollEventThrottle={16}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <View style={style.emptyProfile}>
            <Text style={{ fontSize: 15 }}>No Profile Image Available</Text>
          </View>
        }
      />
      <View style={style.containerTop}>
        <View style={style.progressContainer}>{renderStatusBarItem()}</View>
        <Pressable
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: "2%",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../assets/icon/back2.png")}
            style={{ height: 40, width: 40, marginLeft: "2%" }}
          />
          <Image
            source={require("../../assets/icon/menu2.png")}
            style={{ height: 40, width: 40, marginRight: "2%" }}
          />
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    position: "absolute",
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "ios" ? 30 : 10,
    width: "100%",
  },
  progressContainer: {
    flex: 0.01,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignContent: "center",
    // paddingHorizontal: scale(20),
    paddingBottom: 10,
    marginTop: 20,
  },
  dataContainer: {
    position: "absolute",
    bottom: Platform.OS === "android" ? 80 : 50,
    width: "100%",
    paddingHorizontal: "4%",
  },

  loaderImage: {
    alignItems: "center",
    position: "absolute",
    left: "45%",
    top: "45%",
  },
  profileImage: {
    flex: 1,

    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
  },

  emptyProfile: {
    height: Dimensions.get("screen").height,
    width: Dimensions.get("screen").width,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    // height: 28,
    alignSelf: "flex-start",
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  categoryText: {
    fontSize: 20,
    color: "black",
    fontFamily: FontFamily.InterBold,
    justifyContent: "center",
    textTransform: "capitalize",
    letterSpacing: 0.6,
  },
  titleText: {
    fontSize: 20,
    color: "white",
    fontFamily: FontFamily.InterBold,
    letterSpacing: 1,
    lineHeight: 45,
  },
});
