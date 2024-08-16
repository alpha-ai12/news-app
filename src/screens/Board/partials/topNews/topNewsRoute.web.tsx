import { Adsense } from "@ctrl/react-adsense";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { FeatureList } from "./partial/featurelist";
import { LocalComponent } from "./partial/localNews";
import { FontFamily } from "../../../../assets/fonts";
import {
  Footer,
  HoverLinkText,
  SectionCard,
  formatTime,
} from "../../../../components";
import { storeActions } from "../../../../store";

export const TopNewsRoute = () => {
  const navigation = useNavigation<any>();
  const width = useWindowDimensions().width;
  const dispatch = useDispatch<Dispatch<any>>();
  const {
    recentNewsData,
    featureData,
    indiaData,
    usaData,
    businessNewsData,
    sportsNewsData,
    regionCode,
    localNewsData,
  } = useSelector((state: any) => ({
    localNewsData: state.store.localNewsData,
    recentNewsData: state.store.recentNewsData,
    featureData: state.store.featureData,
    indiaData: state.store.indiaData,
    usaData: state.store.usaData,
    businessNewsData: state.store.businessNewsData,
    sportsNewsData: state.store.sportsNewsData,
    regionCode: state.store.regionCode,
  }));
  const [businessData, setBusinessData] = useState<any>([
    {},
    {},
    {},
    {},
    {},
    {},
  ]);
  const [IndiaNews, setIndiaNews] = useState<any>([{}, {}, {}, {}, {}]);
  const [USANews, setUSANews] = useState<any>([{}, {}, {}, {}, {}]);
  const [sportsData, setSportsData] = useState<any>([{}, {}, {}, {}, {}]);

  const [localData, setLocalsData] = useState<any>([{}, {}, {}, {}, {}]);
  useEffect(() => {
    if (localNewsData?.length > 1) {
      setLocalsData(
        localNewsData?.filter((i) => i.image_url !== undefined)?.slice(0, 5),
      );
    }
  }, [localNewsData]);
  useEffect(() => {
    if (businessNewsData.length > 1) {
      setBusinessData(
        businessNewsData?.filter((i) => i.image_url !== undefined)?.slice(0, 6),
      );
    }
  }, [businessNewsData]);
  useEffect(() => {
    if (sportsNewsData.length > 1) {
      setSportsData(
        sportsNewsData?.filter((i) => i.image_url !== undefined)?.slice(0, 5),
      );
    }
  }, [sportsNewsData]);

  useEffect(() => {
    if (indiaData?.length > 1) {
      setIndiaNews(
        indiaData?.filter((i) => i.image_url !== undefined)?.slice(0, 5),
      );
    }
  }, [indiaData]);
  useEffect(() => {
    if (usaData?.length > 1) {
      setUSANews(
        usaData?.filter((i) => i.image_url !== undefined)?.slice(0, 5),
      );
    }
  }, [usaData]);
  const AdBanner = () => {
    const adUnitId = "ca-pub-5386683070162029";

    return (
      <Adsense
        client={adUnitId}
        slot=""
        style={{
          display: "block",
          height: 650,
          width: 250,
        }}
        layoutKey="-f6+6+1a-6y+7n"
        format="fluid"
        adTest="on"
      />
    );
  };

  const renderdata = ({ item, index }) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          marginRight: 20,
          borderBottomWidth: 1,
          borderBottomColor: "lightgray",
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
            {item.category.join(", ")}
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
              dispatch(storeActions.setSelectedNews(item));
              navigation.navigate("HeadLine", { id: item.slugid });
            }}
            numberOfLines={3}
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
            {formatTime(item.pubDate).split(" -")[0]}
          </Text>
        ) : (
          <Skeleton style={{ marginTop: 10 }} />
        )}
      </View>
    );
  };
  const renderRight = ({ item, index }) => {
    return (
      <View
        style={{
          paddingVertical: 10,
          marginHorizontal: 10,
          borderBottomWidth: 1,
          marginTop: 5,
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
            {item.category.join(", ")}
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
              marginVertical: 5,
            }}
            onPress={() => {
              navigation.navigate("HeadLine", { id: item.slugid });
            }}
            numberOfLines={2}
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
            {formatTime(item.pubDate).split(" -")[0]}
          </Text>
        ) : (
          <Skeleton style={{ marginTop: 10 }} />
        )}
        {item?.title ? (
          <Image
            source={{ uri: item?.image_url }}
            style={{
              width: "100%",
              alignSelf: "center",
              aspectRatio: 2,
              marginTop: 10,
            }}
          />
        ) : (
          <Skeleton
            style={{
              width: "100%",
              aspectRatio: 2,
              marginTop: 10,
              alignSelf: "center",
            }}
          />
        )}
        {item?.description !== undefined ? (
          <Text
            style={{
              color: "#404040",
              fontSize: 12,
              marginTop: 5,
            }}
            numberOfLines={2}
          >
            {item?.newDescription ?? item?.description}
          </Text>
        ) : (
          <Skeleton count={2} />
        )}
      </View>
    );
  };
  const renderCenter = ({ item, index }) => {
    return (
      <Pressable
        style={{
          paddingVertical: 10,
          marginRight: 10,
          borderBottomWidth: 1,

          marginLeft: 10,
        }}
        onPress={() => {
          navigation.navigate("HeadLine", { id: item.slugid });
        }}
      >
        <Text
          style={{
            color: "#404040",
            fontSize: 14,
            fontFamily: FontFamily.InterRegular,
            textTransform: "capitalize",
          }}
        >
          {item?.category ?? <Skeleton />}
        </Text>
        {item?.title ? (
          <HoverLinkText
            text={item?.newTitle ?? item.title}
            style={{
              color: "#404040",
              fontSize: 28,
              fontFamily: FontFamily.InterBold,
              textTransform: "capitalize",
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

        {item?.pubDate ? (
          <Text
            style={{
              color: "#404040",
              fontSize: 14,
              fontFamily: FontFamily.InterRegular,
              marginTop: 5,
            }}
          >
            {formatTime(item.pubDate).split(" -")[0]}
          </Text>
        ) : (
          <Skeleton />
        )}
        {item?.title ? (
          <View
            style={{ backgroundColor: item?.image_url ? "#fff" : "#969696" }}
          >
            <Image
              source={{ uri: item?.image_url }}
              style={{
                width: "100%",
                height: "auto",
                alignSelf: "center",
                aspectRatio: 2,
                marginVertical: 10,
              }}
            />
          </View>
        ) : (
          <Skeleton
            width="100%"
            style={{ aspectRatio: 2, marginBlock: 10, alignSelf: "center" }}
          />
        )}
        {item?.description !== undefined ? (
          <Text
            style={{
              color: "#404040",
              fontSize: 14,
            }}
            numberOfLines={3}
          >
            {item?.newDescription ?? item?.description}
          </Text>
        ) : (
          <Skeleton count={3} />
        )}
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: width > 1020 ? 30 : 20,
              marginTop: 10,
              width: "100%",
              maxWidth: 1440,
              alignSelf: "center",
            }}
          >
            {width > 1020 && (
              <View style={{ flex: 2 }}>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <Pressable
                    style={{ alignItems: "center", flexDirection: "row" }}
                    onPress={() => {
                      navigation.navigate("Business");
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: FontFamily.InterRegular,
                        fontSize: 24,
                        textDecorationLine: "underline",
                      }}
                    >
                      Business
                    </Text>
                    <Image
                      source={require("../../../../assets/icon/right.png")}
                      style={{
                        marginLeft: 5,
                        marginTop: 5,
                        width: 14,
                        height: 14,
                        resizeMode: "contain",
                      }}
                    />
                  </Pressable>
                </View>
                {businessData.map((item, index) => {
                  return renderdata({ item, index });
                })}
              </View>
            )}
            <View
              style={{
                flex: 6.5,
                flexDirection: "row",
              }}
            >
              <View style={{ flex: 3 }}>
                {renderCenter({
                  item: recentNewsData[0],
                  index: 0,
                })}
                {renderCenter({
                  item: recentNewsData[1],
                  index: 1,
                })}
              </View>
              {width > 800 && (
                <View style={{ flex: 2 }}>
                  {[
                    recentNewsData[2],
                    recentNewsData[3],
                    recentNewsData[4],
                  ].map((item, index) => {
                    return renderRight({ item, index });
                  })}
                </View>
              )}
            </View>
            {width > 1020 && (
              <View
                style={{
                  flex: 2.5,

                  alignItems: "center",
                }}
              >
                <AdBanner />
              </View>
            )}
          </View>
          {width < 800 && (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                paddingHorizontal: 10,
              }}
            >
              {[recentNewsData[2], recentNewsData[3], recentNewsData[4]].map(
                (item, index) => {
                  return (
                    <View
                      key={`Right Index${index}`}
                      style={{
                        width: width > 600 ? "49%" : "100%",
                      }}
                    >
                      {renderRight({ item, index })}
                    </View>
                  );
                },
              )}
            </View>
          )}
          {width < 1020 && (
            <View style={{ paddingHorizontal: 20, marginVertical: 15 }}>
              <View
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Pressable
                  style={{ alignItems: "center", flexDirection: "row" }}
                  onPress={() => {
                    navigation.navigate("Business");
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FontFamily.InterRegular,
                      fontSize: 24,
                      textDecorationLine: "underline",
                    }}
                  >
                    Business
                  </Text>
                  <Image
                    source={require("../../../../assets/icon/right.png")}
                    style={{
                      marginLeft: 5,
                      marginTop: 5,
                      width: 14,
                      height: 14,
                      resizeMode: "contain",
                    }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {businessData.map((item, index) => {
                  return (
                    <View
                      key={`index${index}`}
                      style={{
                        width: width > 600 ? "49%" : "100%",
                      }}
                    >
                      {renderdata({ item, index })}
                    </View>
                  );
                })}
              </View>
            </View>
          )}
          {regionCode !== "in" && regionCode !== "us" ? (
            <LocalComponent
              navigation={navigation}
              regionCode={regionCode}
              localNews={localData}
            />
          ) : (
            <></>
          )}
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
                marginBottom: 20,
                marginHorizontal: width > 1440 ? 0 : 10,
              }}
            >
              <Pressable
                style={{ alignItems: "center", flexDirection: "row" }}
                onPress={() => {
                  navigation.navigate("Country", { region: "india" });
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
                  India
                </Text>
                <Image
                  source={require("../../../../assets/icon/right.png")}
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    width: 14,
                    height: 14,
                    resizeMode: "contain",
                  }}
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: width > 1440 ? 0 : 10,
              paddingHorizontal: width > 1440 ? 10 : 20,
              maxWidth: 1440,
              alignSelf: "center",
              width: "100%",
            }}
          >
            {IndiaNews.map((item, index) => {
              return (
                <SectionCard
                  item={item}
                  index={index}
                  navigation={navigation}
                />
              );
            })}
          </View>
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
                marginHorizontal: width > 1440 ? 0 : 10,
                paddingHorizontal: width > 1440 ? 10 : 20,
                marginBottom: 20,
              }}
            >
              <Pressable
                style={{ alignItems: "center", flexDirection: "row" }}
                onPress={() => {
                  navigation.navigate("Sports");
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
                  Sports
                </Text>
                <Image
                  source={require("../../../../assets/icon/right.png")}
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    width: 14,
                    height: 14,
                    resizeMode: "contain",
                  }}
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              maxWidth: 1440,
              alignSelf: "center",
              width: "100%",
              marginHorizontal: width > 1440 ? 0 : 10,
              paddingHorizontal: width > 1440 ? 10 : 20,
            }}
          >
            {sportsData.map((item: any, index: number) => {
              return (
                <SectionCard
                  item={item}
                  index={index}
                  navigation={navigation}
                />
              );
            })}
          </View>
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
                marginHorizontal: width > 1440 ? 0 : 10,
                paddingHorizontal: width > 1440 ? 10 : 20,
                marginBottom: 20,
              }}
            >
              <Pressable
                style={{ alignItems: "center", flexDirection: "row" }}
                onPress={() => {
                  navigation.navigate("Country", {
                    region: "United-states-of-america",
                  });
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
                  United States
                </Text>
                <Image
                  source={require("../../../../assets/icon/right.png")}
                  style={{
                    marginLeft: 5,
                    marginTop: 5,
                    width: 14,
                    height: 14,
                    resizeMode: "contain",
                  }}
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              maxWidth: 1440,
              alignSelf: "center",
              width: "100%",
              marginHorizontal: width > 1440 ? 0 : 10,
              paddingHorizontal: width > 1440 ? 10 : 20,
            }}
          >
            {USANews.map((item: any, index: number) => {
              return (
                <SectionCard
                  item={item}
                  index={index}
                  navigation={navigation}
                />
              );
            })}
          </View>
          <FeatureList navigation={navigation} featureData={featureData} />
          <Footer />
        </ScrollView>
      </View>
    </View>
  );
};
