/*eslint no-unused-expressions: ["error", { "allowShortCircuit": true, "allowTernary": true }]*/
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import { useNavigation } from "@react-navigation/native";
import {
  NativeStackHeaderProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  Pressable,
  View,
  useWindowDimensions,
  Text,
} from "react-native";
import {
  Menu as MenuPop,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { Host } from "react-native-portalize";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import Cookies from "universal-cookie";

import { FontFamily } from "../assets/fonts";
import { DrawerModal, FlagElement, SignUpModel } from "../components";
import {
  ChangePassword,
  Contact,
  Discover,
  ForgetPassword,
  HeadLine,
  Login,
  MyView,
  NotFound,
  Policy,
  Profile,
  Saved,
  SignUp,
  Terms,
  TopRoute,
  VideoRoute,
  ViewAll,
  BusinessRoute,
  TopNewsRoute,
  EntertainmentRoute,
  WorldRoute,
  HealthRoute,
  ScienceRoute,
  SportsRoute,
  TechnologyRoute,
  PoliticsRoute,
  CountryRoute,
} from "../screens";
import { LoginType } from "../screens/Login/login.web";
import { Menu } from "../screens/Menu/menu";
import {
  getBusinessNews,
  getEntertainmentNews,
  getFeatureNews,
  getHealthNews,
  getIndiaNews,
  getMostRecent,
  getPoliticsNews,
  getScienceNews,
  getSportsNews,
  getTechnologyNews,
  getTopNews,
  getUSANews,
  getWorldNews,
  localNews,
  randColor,
  storeActions,
  userDataAPI,
} from "../store";

export type PrimaryParamList = {
  TopNews: undefined;
  Business: undefined;
  Entertainment: undefined;
  Health: undefined;
  Politics: undefined;
  Science: undefined;
  Sports: undefined;
  Technology: undefined;
  World: undefined;
  login: undefined;
  signUp: undefined;
  HeadLine: undefined;
  Profile: undefined;
  Discover: undefined;
  ViewAll: undefined;
  Video: undefined;
  Country: undefined;
  NotFound: undefined;
  Contact: undefined;
  Policy: undefined;
  Terms: undefined;
  Forgot: undefined;
  Change: undefined;
  MyView: undefined;
  Saved: undefined;
  Top: undefined;
};

const Stack = createNativeStackNavigator<PrimaryParamList>();

export const AuthStack = (props: any) => {
  const navigation = useNavigation<any>();
  const width = useWindowDimensions().width;
  const dispatch = useDispatch<Dispatch<any>>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [model, setModel] = useState(false);
  const [menuTrigger, setMenuTrigger] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [keywords, setKeywords] = useState(0);
  const [country, setCountry] = useState("");
  const handleBackdropPress = useCallback(() => {
    setModalVisible(false);
  }, [modalVisible]);
  const { userData } = useSelector((state: any) => ({
    userData: state.store.userData,
  }));
  useEffect(() => {
    userDataStatus();
    getData();
    dispatch(getMostRecent());
    dispatch(getBusinessNews(1));
    dispatch(getSportsNews(1));
    dispatch(getIndiaNews(1));
    dispatch(getUSANews(1));
    dispatch(getFeatureNews());
    dispatch(getHealthNews(1));
    dispatch(getEntertainmentNews(1));
    dispatch(getPoliticsNews(1));
    dispatch(getScienceNews(1));
    dispatch(getTechnologyNews(1));
    dispatch(getWorldNews(1));
    dispatch(getTopNews(1));
    window.addEventListener("SignUpModelon", (e: any) => {
      console.log(e.detail);
      if (e.detail === "saved") {
        setKeywords(2);
        setModel(true);
      } else {
        setKeywords(1);
        setModel(true);
      }
    });
    return () => {
      window.removeEventListener("SignUpModelon", () => {
        setKeywords(0);
        setModel(false);
      });
    };
  }, []);
  const userDataStatus = async () => {
    const cookies = new Cookies();
    const userInfo = cookies.get("userInfo");
    // console.log(userInfo);
    if (userInfo?.email !== undefined) {
      const result: any = await dispatch(userDataAPI(userInfo));
      // console.log(result.payload.data);
      if (result.payload.message) {
        console.log(result.payload.message);
      } else {
        dispatch(storeActions.setUserData(result.payload.data || {}));
        dispatch(
          storeActions.setPreferences({
            preferredCategory: result.payload.data?.preferredCategory ?? [],
            preferredCountry: result.payload.data?.preferredCountry ?? [],
          }),
        );
      }
    }
  };
  const getData = async () => {
    try {
      // const url = `https://ipinfo.io/?token=af484a9c1a749b`;
      const url = "https://api.country.is/";
      const response = await axios.get(url, {
        headers: {
          crossDomain: true,
        },
      });
      const region = response?.data?.country?.toLowerCase() ?? "in";
      setCountry(region);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    dispatch(storeActions.setLocalNewsData([]));
    if (
      country !== "in" &&
      country !== "us" &&
      country !== undefined &&
      country !== ""
    ) {
      dispatch(localNews(country));
    }
    setCountry(country);
    dispatch(storeActions.setRegionCode(country));
  }, [country]);

  const signOut = () => {
    const cookies = new Cookies();
    cookies.set("userInfo", {});
    if (userData.oAuth === LoginType.facebook) {
      FacebookLoginClient.logout((res) => console.log(res));
    }
    dispatch(storeActions.setUserData({}));
    if (
      window.location.href === "https://opennewsai.com/profile" ||
      window.location.href === "https://opennewsai.com/my-view" ||
      window.location.href === "https://opennewsai.com/saved"
    ) {
      navigation.navigate("TopNews");
    }
  };

  return (
    <Host>
      <Stack.Navigator
        initialRouteName="TopNews"
        screenOptions={({ route, navigation }) => ({
          headerShown: false,
          gestureEnabled: true,
          headerShadowVisible: false,
          header: (props: NativeStackHeaderProps) => {
            return (
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 55,
                    borderBottomWidth: 0.5,
                    borderBottomColor: "lightgray",
                  },
                  width > 1440 && {
                    maxWidth: 1440,
                    alignSelf: "center",
                    width: "100%",
                  },
                ]}
              >
                <View
                  style={{
                    width: 280,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Pressable onPress={() => navigation.navigate("TopNews")}>
                    <Image
                      source={require("../assets/icon/logo.png")}
                      style={{ width: 240, height: 50, resizeMode: "contain" }}
                    />
                  </Pressable>
                </View>

                {width > (userData?.name ? 1310 : 1360) && (
                  <Menu route={props.route} />
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingRight: 15,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        navigation.navigate("Discover");
                      }}
                    >
                      <Image
                        source={require("../assets/icons/search.png")}
                        style={{ width: 22, height: 22, resizeMode: "contain" }}
                      />
                    </Pressable>

                    {width > 570 && (
                      <MenuPop
                        renderer={renderers.Popover}
                        rendererProps={{ preferredPlacement: "bottom" }}
                        onOpen={() => {
                          setTrigger(true);
                        }}
                        onClose={() => {
                          setTrigger(false);
                        }}
                      >
                        <MenuTrigger
                          style={{
                            flexDirection: "row",
                            marginLeft: 10,
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "#666666",
                              fontSize: 14,
                              fontFamily: FontFamily.InterBold,

                              paddingVertical: 8,

                              textAlign: "center",
                            }}
                          >
                            My View
                          </Text>
                          <Image
                            source={require("../assets/icons/down.png")}
                            style={[
                              {
                                height: 13,
                                width: 13,
                                resizeMode: "contain",
                                marginHorizontal: 2,
                              },
                              trigger && {
                                transform: [{ rotate: "180deg" }],
                              },
                            ]}
                          />
                        </MenuTrigger>
                        <MenuOptions
                          optionsContainerStyle={{
                            borderColor: "#D3D3D3",
                            borderWidth: 1,
                            borderRadius: 5,
                          }}
                        >
                          <MenuOption
                            onSelect={() => {
                              // navigation.navigate("Profile");
                              userData?.name
                                ? navigation.navigate("MyView")
                                : setModel(true);
                            }}
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#D3D3D3",
                            }}
                            text="My View"
                            customStyles={{
                              optionText: {
                                padding: 10,
                                fontFamily: FontFamily.InterRegular,
                                color: "black",
                              },
                            }}
                          />

                          <MenuOption
                            onSelect={() => {
                              // signOut();
                              if (userData?.name) {
                                navigation.navigate("Saved");
                              } else {
                                setModel(true);
                                setKeywords(2);
                              }
                            }}
                            customStyles={{
                              optionText: {
                                padding: 10,
                                fontFamily: FontFamily.InterRegular,
                                color: "black",
                              },
                            }}
                            text="Saved"
                          />
                        </MenuOptions>
                      </MenuPop>
                    )}
                    {width > 485 && (
                      <FlagElement code={country} setCode={setCountry} />
                    )}
                    {width > 615 && !userData?.name && (
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
                        }}
                        onPress={() =>
                          //  setModel(true)
                          navigation.navigate("login", { back: true })
                        }
                      >
                        Sign In
                      </Text>
                    )}

                    {userData?.name && (
                      <MenuPop
                        renderer={renderers.Popover}
                        rendererProps={{ preferredPlacement: "bottom" }}
                        onOpen={() => {
                          setMenuTrigger(true);
                        }}
                        onClose={() => {
                          setMenuTrigger(false);
                        }}
                      >
                        <MenuTrigger
                          style={{
                            flexDirection: "row",
                            marginLeft: 10,
                            alignItems: "center",
                          }}
                        >
                          {userData?.profileImg &&
                          userData.oAuth !== LoginType.opennewsai ? (
                            <Image
                              source={{ uri: userData?.profileImg }}
                              style={{
                                height: 40,
                                width: 40,
                                resizeMode: "contain",
                                borderRadius: 20,
                              }}
                            />
                          ) : (
                            <Text
                              style={{
                                backgroundColor: randColor(userData.name),
                                color: "black",
                                height: 40,
                                width: 40,
                                borderRadius: 20,
                                fontSize: 20,
                                fontFamily: FontFamily.InterRegular,
                                textAlign: "center",
                                paddingVertical: 8,
                              }}
                            >
                              {userData.name.charAt(0)}
                            </Text>
                          )}
                          <Image
                            source={require("../assets/icons/down.png")}
                            style={[
                              {
                                height: 15,
                                width: 15,
                                resizeMode: "contain",
                                marginHorizontal: 2,
                              },
                              menuTrigger && {
                                transform: [{ rotate: "180deg" }],
                              },
                            ]}
                          />
                        </MenuTrigger>
                        <MenuOptions
                          optionsContainerStyle={{
                            borderColor: "#D3D3D3",
                            borderWidth: 1,
                            borderRadius: 5,
                          }}
                        >
                          <MenuOption
                            onSelect={() => {
                              navigation.navigate("Profile");
                            }}
                            style={{
                              borderBottomWidth: 1,
                              borderColor: "#D3D3D3",
                            }}
                            text="Profile"
                            customStyles={{
                              optionText: {
                                padding: 10,
                                fontFamily: FontFamily.InterRegular,
                                color: "black",
                              },
                            }}
                          />

                          <MenuOption
                            onSelect={() => {
                              signOut();
                            }}
                            customStyles={{
                              optionText: {
                                padding: 10,
                                fontFamily: FontFamily.InterRegular,
                                color: "black",
                              },
                            }}
                            text="Logout"
                          />
                        </MenuOptions>
                      </MenuPop>
                    )}
                    {width <= (userData?.name ? 1310 : 1360) && (
                      <Pressable
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                      >
                        <Image
                          source={require("../assets/icons/menu.png")}
                          style={{
                            width: 22,
                            height: 22,
                            resizeMode: "contain",
                            marginLeft: 10,
                          }}
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
              </View>
            );
          },
        })}
      >
        <Stack.Screen
          name="TopNews"
          component={TopNewsRoute}
          options={{ headerShown: true, title: "Open News AI" }}
        />
        <Stack.Screen
          name="HeadLine"
          component={HeadLine}
          options={({ navigation, route }: any) => ({
            headerShown: true,
            title: route?.params?.id?.replaceAll("-", " ") ?? "Open News AI",
          })}
          getId={({ params }: any) => params?.id}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Discover"
          component={Discover}
          options={{
            headerShown: true,
            headerTitle: "",
            headerLeft: (props) => {
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Image
                    source={require("../assets/icon/back.png")}
                    style={{ height: 40, width: 40 }}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            },
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewAll"
          component={ViewAll}
          options={{
            headerShown: true,
            headerTitle: "",
            headerLeft: (props) => {
              return (
                <Pressable onPress={() => navigation.goBack()}>
                  <Image
                    source={require("../assets/icon/back.png")}
                    style={{ height: 40, width: 40 }}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            },
          }}
        />
        <Stack.Screen
          name="Business"
          component={BusinessRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Entertainment"
          component={EntertainmentRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Health"
          component={HealthRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Politics"
          component={PoliticsRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Science"
          component={ScienceRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Sports"
          component={SportsRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Technology"
          component={TechnologyRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="World"
          component={WorldRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Video"
          component={VideoRoute}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Country"
          component={CountryRoute}
          options={({ navigation, route }: any) => ({
            headerShown: true,
            title: route?.params?.region ?? "World",
          })}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFound}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Policy"
          component={Policy}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MyView"
          component={MyView}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Saved"
          component={Saved}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="Forgot"
          component={ForgetPassword}
          options={{ headerShown: false, title: "Forgot Password" }}
        />
        <Stack.Screen
          name="Change"
          component={ChangePassword}
          options={{ headerShown: false, title: "Change Password" }}
        />
        <Stack.Screen
          name="Top"
          component={TopRoute}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
      {width <= (userData?.name ? 1310 : 1360) && modalVisible && (
        <DrawerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          handleBackdropPress={handleBackdropPress}
          navigation={navigation}
          setModel={setModel}
          userData={userData}
          setKeyWord={setKeywords}
          country={country}
          setCountry={setCountry}
        />
      )}
      <SignUpModel
        model={model}
        setModel={setModel}
        navigation={navigation}
        keyword={keywords}
        setKeyWord={setKeywords}
      />
    </Host>
  );
};
