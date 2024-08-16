import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

import { SelectedMenu } from "./selectedMenu";
import { TopTabItem } from "./topTabItem";

let lastTimeoutId: any;

const menuItems = [
  { key: "TopNews", title: "Top News" },
  { key: "Business", title: "Business" },
  { key: "Entertainment", title: "Entertainment" },
  { key: "Health", title: "Health" },
  { key: "Politics", title: "Politics" },
  { key: "Science", title: "Science" },
  { key: "Sports", title: "Sports" },
  { key: "Technology", title: "Technology" },
  { key: "World", title: "World" },
];
// Add more menu items as needed

export const Menu = ({ route }) => {
  const navigation = useNavigation<any>();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isContentHovered, setContentHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | undefined>(-1);

  const { featureData } = useSelector((state: any) => ({
    featureData: state.store.featureData,
  }));
  const [feature, setFeature] = useState("sports");

  const handleHover = (item: any, index: number) => {
    clearTimeout(lastTimeoutId);
    const res = setTimeout(() => {
      setIsHovered(true); //root cause of hover item is dissappeared
      if (hoveredIndex !== index) {
        setHoveredItem(item);
        setHoveredIndex(index);
        setSelectedItem(item);
        setFeature(item === "Top News" ? "top" : item.toLowerCase());
      }
    }, 200);
    lastTimeoutId = res;
  };

  const handleClick = (item, index) => {
    console.log(`Opening page for ${item}`);
    if (item === "Top News") {
      clearTimeout(lastTimeoutId);
      const res = setTimeout(() => {
        navigation.navigate("TopNews");
        setHoveredItem(null);
        setHoveredIndex(null);
        setIsHovered(false);
        setContentHovered(false);
      }, 250);
      lastTimeoutId = res;
    } else {
      clearTimeout(lastTimeoutId);
      const res = setTimeout(() => {
        navigation.navigate(item);
        setHoveredItem(null);
        setHoveredIndex(null);
        setIsHovered(false);
        setContentHovered(false);
      }, 250);
      lastTimeoutId = res;
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(lastTimeoutId);
    const res = setTimeout(() => {
      hoveredItem == null && setIsHovered(false);
      setHoveredItem(null);
      setHoveredIndex(null);
      setIsHovered(false);
    }, 250);
    lastTimeoutId = res;
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        {menuItems.map((item, index) => {
          return (
            <TopTabItem
              key={"Item" + index}
              item={item}
              selectedItem={selectedItem}
              index={index}
              handleClick={handleClick}
              handleHover={handleHover}
              handleMouseLeave={handleMouseLeave}
              hoveredItem={hoveredItem}
              route={route.name}
              isContentHovered={isContentHovered}
            />
          );
        })}
      </View>
      {(isHovered || isContentHovered) && (
        <SelectedMenu
          selectedItem={selectedItem}
          handleClick={handleClick}
          handleHover={() => {
            setContentHovered(true);
            setIsHovered(true);
          }}
          handleMouseLeave={() => setContentHovered(false)}
          featureData={featureData}
          feature={feature}
        />
      )}
    </View>
  );
};
