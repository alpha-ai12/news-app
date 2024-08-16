import React from "react";
import { View, useWindowDimensions } from "react-native";
import { Host } from "react-native-portalize";
import { TabView, SceneMap } from "react-native-tab-view";

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
import { HeadLine } from "../Headline/headLine";

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
  Detail: HeadLine,
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
    { key: "Detail", title: "Detail" },
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Host>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          swipeEnabled={index !== 0}
          renderTabBar={(props) => {
            return <></>;
          }}
        />
      </Host>
    </View>
  );
};
