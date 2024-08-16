import React from "react";
import { Platform, Text, View, useWindowDimensions } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import {
  TopNewsRoute,
  BusinessRoute,
  EntertainmentRoute,
  WorldRoute,
  HealthRoute,
  ScienceRoute,
  SportsRoute,
  TechnologyRoute,
  PoliticsRoute,
} from "./partials";
import { FontFamily } from "../../assets/fonts";

const adUnitId =
  // __DEV__
  //   ? TestIds.BANNER
  //   :
  Platform.OS === "ios"
    ? TestIds.BANNER
    : // ? "ca-app-pub-5386683070162029/6446899983"
      "ca-app-pub-5386683070162029/3713474178";

const renderScene = SceneMap({
  TopNews: TopNewsRoute,
  Business: BusinessRoute,
  Entertainment: EntertainmentRoute,
  Health: HealthRoute,
  Politics: PoliticsRoute,
  Science: ScienceRoute,
  Sports: SportsRoute,
  Technology: TechnologyRoute,
  World: WorldRoute,
});
export const Board = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "TopNews", title: "TopNews" },
    { key: "Business", title: "Business" },
    { key: "Entertainment", title: "Entertainment" },
    { key: "Health", title: "Health" },
    { key: "Politics", title: "Politics" },
    { key: "Science", title: "Science" },
    { key: "Sports", title: "Sports" },
    { key: "Technology", title: "Technology" },
    { key: "World", title: "World" },
  ]);

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => {
          return (
            <TabBar
              {...props}
              scrollEnabled
              style={{ backgroundColor: "#fff" }}
              tabStyle={{ width: "auto" }}
              indicatorStyle={{ backgroundColor: "red" }}
              renderLabel={({ route, focused, color }) => (
                <Text
                  style={{
                    color: "black",
                    padding: 8,
                    fontSize: 16,
                    fontFamily: focused
                      ? FontFamily.InterSemiBold
                      : FontFamily.InterRegular,
                  }}
                >
                  {route.title}
                </Text>
              )}
            />
          );
        }}
      />
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        // requestOptions={{
        //   requestNonPersonalizedAdsOnly: true,
        // }}
        onAdFailedToLoad={
          (error: Error) => console.log("Failed to load", error.message)
          // Alert.alert("Failed to load", error.message)
        }
      />
    </View>
  );
};
