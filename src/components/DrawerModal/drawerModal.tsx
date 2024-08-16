/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";

import { FontFamily } from "../../assets/fonts";
import { FlagElement } from "../flagItem/flagElement";
export const DrawerModal = ({
  modalVisible,
  setModalVisible,
  handleBackdropPress,
  navigation,
  setModel,
  userData,
  setKeyWord,
  country,
  setCountry,
}) => {
  const height = useWindowDimensions().height;
  const width = useWindowDimensions().width;
  const [hoveredItem, setHoveredItem] = useState(null);

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

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.pressableItem,
        item.key === hoveredItem && styles.hoveredItem,
        pressed && styles.pressedItem,
      ]}
      onPress={() => {
        handleBackdropPress();
        navigation.navigate(item.key);
      }}
      onHoverIn={() => setHoveredItem(item.key)}
      onHoverOut={() => setHoveredItem(null)}
    >
      <Text style={styles.itemText}>{item.title}</Text>
    </Pressable>
  );

  return (
    <View>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        // animationInTiming={300}
        // animationOutTiming={620}
        // swipeDirection={'right'}
        deviceWidth={1}
        isVisible={modalVisible}
        hasBackdrop={false}
        backdropOpacity={0.5}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
        backdropColor="blue" // Set the backdrop color to blue
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
        style={{
          flex: 1,
          elevation: 10,
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Pressable
            style={{
              flex: 1,
              height: "100%",
              opacity: 0.6,
            }}
            onPress={() => handleBackdropPress()}
          />
        </View>
        <View style={[styles.flatListView, { height }]}>
          <View
            style={{
              width: 75,
              zIndex: 9999,
            }}
          >
            {width <= 485 && (
              <FlagElement code={country} setCode={setCountry} />
            )}
          </View>
          <Pressable
            style={{ position: "absolute", height: 55, right: 10, top: 10 }}
            onPress={() => handleBackdropPress()}
          >
            <Image
              source={require("../../assets/icons/close.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
            />
          </Pressable>
          <FlatList
            data={menuItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
            scrollEnabled={false}
            style={{ marginTop: width <= 425 ? 11 : 55 }}
          />
          {width <= 615 && (
            <View style={{ marginTop: 8, flexWrap: "wrap", paddingBottom: 30 }}>
              {!userData?.name && (
                <Text
                  style={{
                    color: "#666666",
                    fontSize: 16,
                    fontFamily: FontFamily.InterBold,
                    borderColor: "lightgray",
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    borderRadius: 8,
                    textAlign: "center",
                    marginHorizontal: 10,
                    // marginRight: 10,
                  }}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("login", { back: true });
                  }}
                >
                  Sign In
                </Text>
              )}
              {width <= 570 && (
                <>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontFamily: FontFamily.InterBold,
                      borderColor: "lightgray",
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderRadius: 8,
                      textAlign: "center",
                      backgroundColor: "#000000",
                      marginHorizontal: 10,
                      marginTop: 10,
                      // marginRight: 5,
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        !userData?.name
                          ? setModel(true)
                          : navigation.navigate("MyView");
                      }, 200);
                    }}
                  >
                    My View
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 16,
                      fontFamily: FontFamily.InterBold,
                      borderColor: "lightgray",
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderWidth: 1,
                      borderRadius: 8,
                      textAlign: "center",
                      backgroundColor: "#000000",
                      marginHorizontal: 10,
                      marginTop: 10,
                      // marginRight: 5,
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      setTimeout(() => {
                        if (userData?.name) {
                          navigation.navigate("Saved");
                        } else {
                          setKeyWord(2);
                          setModel(true);
                        }
                      }, 200);
                    }}
                  >
                    Saved
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  itemText: {
    fontSize: 15,
    fontFamily: FontFamily.InterMedium,
    marginVertical: 2,
  },
  pressableItem: {
    padding: 10,

    marginVertical: 1,
    borderRadius: 5,
    width: "95%",
    alignSelf: "center",
  },
  pressedItem: {
    backgroundColor: "gray",
  },
  hoveredItem: {
    backgroundColor: "lightblue",
  },
  flatListView: {
    minWidth: 180,
    backgroundColor: "#fff",
    alignSelf: "flex-end",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
});
