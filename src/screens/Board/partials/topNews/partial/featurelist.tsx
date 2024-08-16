import { useEffect, useRef, useState } from "react";
import { ScrollContainer } from "react-indiana-drag-scroll";
import Skeleton from "react-loading-skeleton";
import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import "react-indiana-drag-scroll/dist/style.css";
import "react-loading-skeleton/dist/skeleton.css";
import { Dropdown } from "react-native-element-dropdown";

import { FontFamily } from "../../../../../assets/fonts";
import { HoverLinkText, formatTime } from "../../../../../components";

const Category = [
  { id: "1New", name: "Technology" },
  { id: "2New", name: "Health" },
  { id: "3New", name: "World" },
  { id: "4New", name: "Entertainment" },
  { id: "5New", name: "Sports" },
  { id: "6New", name: "Science" },
  { id: "7New", name: "Business" },
  { id: "8New", name: "Politics" },
];
const CategoryValue = [
  { label: "Technology", value: "technology" },
  { label: "Health", value: "health" },
  { label: "World", value: "world" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Sports", value: "sports" },
  { label: "Science", value: "science" },
  { label: "Business", value: "business" },
  { label: "Politics", value: "politics" },
];
const RenderSectionNews = ({ item, index, navigation }) => {
  const width = useWindowDimensions().width;
  return (
    <Pressable
      key={"SectionNews_" + index}
      style={{
        width: width > 800 ? "20%" : width > 620 ? "49%" : "100%",
        marginVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
      }}
      onPress={() => {
        navigation.navigate("HeadLine", { id: item.slugid });
      }}
    >
      {item?.title ? (
        <Image
          source={{ uri: item.image_url }}
          style={{
            width: "100%",
            height: "auto",
            alignSelf: "center",
            aspectRatio: 1.3,
          }}
        />
      ) : (
        <Skeleton
          style={{
            width: "100%",
            height: 160,
            alignSelf: "center",
          }}
        />
      )}
      <View
        style={{
          paddingVertical: 4,
          justifyContent: "space-between",
          marginTop: 5,
          flex: 1,
        }}
      >
        {item?.category ? (
          <Text
            style={{
              fontFamily: FontFamily.InterRegular,
              fontSize: 14,
              color: "#000",
              textTransform: "capitalize",
            }}
          >
            {item.category.join(", ")}
          </Text>
        ) : (
          <Skeleton style={{ marginBottom: 5 }} />
        )}
        {item?.title ? (
          <HoverLinkText
            text={item?.newTitle ?? item.title}
            style={{
              fontFamily: FontFamily.InterBold,
              fontSize: 16,
              color: "#000",
              marginTop: 5,
            }}
            numberOfLines={3}
            onPress={() => {
              navigation.navigate("HeadLine", { id: item.slugid });
            }}
          />
        ) : (
          <Skeleton count={3} />
        )}
        {item.category ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
              flexWrap: "wrap",
            }}
          >
            <Text
              style={{ fontSize: 12, textTransform: "capitalize" }}
            >{`${item?.source_id} `}</Text>
            <Text style={{ fontSize: 12 }}>
              {formatTime(item.pubDate).split(" -")[0]}
            </Text>
          </View>
        ) : (
          <Skeleton style={{ marginTop: 10 }} />
        )}
      </View>
    </Pressable>
  );
};
export const FeatureList = ({ navigation, featureData }) => {
  const width = useWindowDimensions().width;
  const ref = useRef<any>(null);
  const [feature, setFeature] = useState("technology");
  const [data, setData] = useState([{}, {}, {}, {}, {}, {}, {}]);
  const [pos, setPos] = useState<any>(0);
  useEffect(() => {
    if (featureData.length > 0) {
      featureData.forEach((a: any, index: number) => {
        if (Object.keys(a)[0] === feature) {
          const obj: any = Object.values(a)[0];
          setData(obj?.filter((i: any) => i?.image_url !== undefined));
        }
      });
    }
  }, [feature, featureData]);

  const renderCategory = ({ item, index }) => {
    return (
      <Pressable
        style={{
          borderRadius: 15,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 5,
          height: 30,
          paddingHorizontal: 10,
          backgroundColor:
            item.name.toLowerCase() === feature ? "black" : "#F5F5F5",
          borderWidth: 1,
          borderColor: "gray",
        }}
        onPress={() => {
          if (feature !== item.name.toLowerCase()) {
            ref.current?.scrollTo({
              left: 0,
            });
            setFeature(item.name.toLowerCase());
          }
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: item.name.toLowerCase() === feature ? "white" : "black",
            fontFamily: FontFamily.InterRegular,
          }}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };
  return (
    <>
      <View
        style={{
          marginTop: 10,
          maxWidth: 1440,
          alignSelf: "center",
          width: "100%",
        }}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: width > 1440 ? 10 : 20,
            marginBottom: 10,
            marginLeft: width > 1440 ? 0 : 10,
          }}
        >
          <Text
            style={{
              fontFamily: FontFamily.InterBold,
              fontSize: 20,
              textDecorationLine: "underline",
              color: "#404040",
            }}
          >
            Latest Stories
          </Text>

          <Image
            source={require("../../../../../assets/icon/right.png")}
            style={{
              marginLeft: 5,
              marginTop: 5,
              width: 14,
              height: 14,
              resizeMode: "contain",
            }}
          />
        </View>
      </View>
      <View
        style={[
          {
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            alignItems: "center",
          },
          width > 1440 && {
            maxWidth: 1440,
            alignSelf: "center",
            width: "100%",
          },
        ]}
      >
        {width > 850 ? (
          <FlatList
            keyExtractor={(item: any, index: number) => "channel_" + index}
            renderItem={renderCategory}
            data={Category}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 5, paddingLeft: 5 }}
          />
        ) : (
          <Dropdown
            style={{
              height: 35,
              marginTop: 5,
              marginLeft: 10,
              alignSelf: "center",
              width: 125,
              borderWidth: 0.1,
              borderRadius: 8,
            }}
            placeholderStyle={{ fontSize: 12, marginLeft: 6 }}
            selectedTextStyle={{ fontSize: 12, marginLeft: 6 }}
            iconStyle={{ width: 20, height: 20 }}
            data={CategoryValue}
            search={false}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="technology"
            autoScroll={false}
            value={feature}
            onChange={(item) => {
              if (feature !== item.value) {
                ref.current?.scrollTo({
                  left: 0,
                });
                setFeature(item.value);
              }
            }}
          />
        )}
        <Pressable
          style={{ flexDirection: "row" }}
          onPress={() => {
            const cat = feature.slice(0, 1).toUpperCase() + feature.slice(1);
            navigation.navigate(cat);
          }}
        >
          <Text
            style={{
              borderWidth: 1,
              borderColor: "gray",
              fontSize: 14,
              fontFamily: FontFamily.InterRegular,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            See all
          </Text>
          {/* {feature} */}
        </Pressable>
      </View>
      <View
        style={{
          width: "100%",
          maxWidth: 1440,
          alignSelf: "center",
          marginHorizontal: 20,
        }}
      >
        <ScrollContainer
          ref={ref}
          style={{
            maxWidth: 1440,
            alignSelf: "center",
            width: "100%",
          }}
          onEndScroll={() => {
            setPos(ref?.current?.scrollLeft);
          }}
        >
          <View
            style={{
              paddingBottom: 30,
              flexDirection: "row",
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            {data.map((item, index) => {
              return (
                <RenderSectionNews
                  navigation={navigation}
                  item={item}
                  index={index}
                />
              );
            })}
          </View>
        </ScrollContainer>
        {pos > 0 && (
          <Pressable
            style={{
              position: "absolute",
              left: 30,
              bottom: 160,
              backgroundColor: "black",
              padding: 3,
              borderRadius: 16,
            }}
            onPress={() => {
              console.log("onPress", ref);
              ref.current?.scrollTo({
                left:
                  width > 800
                    ? ref.current.scrollLeft - (width / 5 - 5)
                    : width > 620
                      ? ref.current.scrollLeft - (width / 2 - 10)
                      : ref.current.scrollLeft - (width - 20),
              });
            }}
          >
            <Image
              source={require("../../../../../assets/icon/left-arrow.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
                alignSelf: "center",
                tintColor: "white",
              }}
            />
          </Pressable>
        )}
        {(width > 1440
          ? 1440 - pos - 20
          : width > 800
            ? width - pos - 20
            : width > 620
              ? width - pos / 4 - 40
              : width - pos / 9 - 40) > 0 && (
          <Pressable
            style={{
              position: "absolute",
              right: 20,
              bottom: 160,
              backgroundColor: "black",
              padding: 3,
              borderRadius: 16,
            }}
            onPress={() => {
              ref.current?.scrollTo({
                left:
                  width > 800
                    ? ref.current.scrollLeft + (width / 5 - 8)
                    : width > 620
                      ? ref.current.scrollLeft + (width / 2 - 20)
                      : ref.current.scrollLeft + (width - 40),
              });
            }}
          >
            <Image
              source={require("../../../../../assets/icon/right-arrow.png")}
              style={{
                width: 24,
                height: 24,
                resizeMode: "contain",
                alignSelf: "center",
                tintColor: "white",
              }}
            />
          </Pressable>
        )}
      </View>
    </>
  );
};
