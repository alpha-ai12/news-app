/* eslint-disable no-useless-escape */
import { FacebookLoginClient } from "@greatsumini/react-facebook-login";
import { useNavigation } from "@react-navigation/native";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  getAuth,
  signInWithPopup,
  TwitterAuthProvider,
  OAuthProvider,
} from "firebase/auth";
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  View,
  TextInput,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import Cookies from "universal-cookie";

import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { Logo } from "../../components";
import { storeActions, userAPI, userLogin } from "../../store";
import { isStrongPassword } from "../SignUp/partial.tsx/strongPassword";
export enum LoginType {
  google = "google",
  apple = "apple",
  twitter = "twitter",
  facebook = "facebook",
  opennewsai = "opennewsai",
}
export const Login = ({ route }) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [email, setEmail] = useState("");
  const [emailvalid, setEmailValid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordvalid, setPasswordValid] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const appleProvider = new OAuthProvider("apple.com");
  const provider = new TwitterAuthProvider();

  const back = () => {
    try {
      setEmail("");
      setPassword("");
      if (navigation.canGoBack() && route.params.back === true) {
        navigation.goBack();
      } else {
        navigation.navigate("TopNews");
      }
    } catch (error) {
      console.log(error);
      navigation.navigate("TopNews");
    }
  };
  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // fetching userinfo can be done on the client or the server
      try {
        const userInfo = await axios
          .get("https://www.googleapis.com/oauth2/v3/userinfo", {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          })
          .then((res) => res.data);
        const data = {
          name: userInfo?.name,
          email: userInfo?.email,
          profileImg: userInfo?.picture,
          id: userInfo?.sub,
          oAuth: LoginType.google,
        };

        const res: any = await dispatch(userAPI(data));
        console.log(res.payload.data);
        if (res.payload.data.message) {
          setError(res.payload.data.message);
        } else {
          const newData = {
            ...data,
            preferredCategory: res?.payload.data.preferredCategory,
            preferredCountry: res?.payload.data.preferredCountry,
            saved_news: res?.payload.data.saved_news,
            _id: res?.payload.data._id,
          };
          dispatch(
            storeActions.setPreferences({
              preferredCategory: newData.preferredCategory,
              preferredCountry: newData.preferredCountry,
            }),
          );
          const cookies = new Cookies();
          cookies.set("userInfo", { email: data.email, oAuth: data.oAuth });
          dispatch(storeActions.setUserData(newData));
          back();
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const loginApple = () => {
    appleProvider.addScope("email");
    const auth = getAuth();
    signInWithPopup(auth, appleProvider)
      .then(async (result) => {
        // The signed-in user info.
        const user = result.user;
        const data = {
          name: user?.displayName,
          email: user?.email,
          profileImg: user?.photoURL,
          id: user?.uid,
          oAuth: LoginType.apple,
        };
        const res: any = await dispatch(userAPI(data));
        console.log(res.payload.data);
        if (res.payload.data.message) {
          setError(res.payload.data.message);
        } else {
          const newData = {
            ...data,
            preferredCategory: res?.payload.data.preferredCategory,
            preferredCountry: res?.payload.data.preferredCountry,
            saved_news: res?.payload.data.saved_news,
            _id: res?.payload.data._id,
          };
          dispatch(
            storeActions.setPreferences({
              preferredCategory: newData.preferredCategory,
              preferredCountry: newData.preferredCountry,
            }),
          );
          const cookies = new Cookies();
          cookies.set("userInfo", { email: data.email, oAuth: data.oAuth });
          dispatch(storeActions.setUserData(newData));
          back();
        }
      })
      .catch((error) => {
        console.log("apple error", error);
      });
  };
  const loginTwitter = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        const data = {
          name: user?.displayName,
          email: user?.providerData[0].email,
          profileImg: user?.photoURL,
          id: user?.uid,
          oAuth: LoginType.twitter,
        };
        const res: any = await dispatch(userAPI(data));
        console.log(res.payload.data);
        if (res.payload.data.message) {
          setError(res.payload.data.message);
        } else {
          const newData = {
            ...data,
            preferredCategory: res?.payload.data.preferredCategory,
            preferredCountry: res?.payload.data.preferredCountry,
            saved_news: res?.payload.data.saved_news,
            _id: res?.payload.data._id,
          };
          dispatch(
            storeActions.setPreferences({
              preferredCategory: newData.preferredCategory,
              preferredCountry: newData.preferredCountry,
            }),
          );
          const cookies = new Cookies();
          cookies.set("userInfo", { email: data.email, oAuth: data.oAuth });
          dispatch(storeActions.setUserData(newData));
          back();
        }
      })
      .catch((error) => {
        console.log("twitter error", error);
      });
  };
  const loginFaceBook = () => {
    FacebookLoginClient.login(
      (res) => {
        console.log(res);
        FacebookLoginClient.getProfile(
          async (result: any) => {
            console.log(result);
            if (result.error) {
              console.log(result.error);
            } else {
              const data = {
                name: result?.name,
                email: result?.email,
                profileImg: result?.picture.data.url,
                id: result?.id,
                oAuth: LoginType.facebook,
              };

              const res: any = await dispatch(userAPI(data));
              console.log(res.payload.data);
              if (res.payload.data.message) {
                setError(res.payload.data.message);
              } else {
                const newData = {
                  ...data,
                  preferredCategory: res?.payload.data.preferredCategory,
                  preferredCountry: res?.payload.data.preferredCountry,
                  saved_news: res?.payload.data.saved_news,
                  _id: res?.payload.data._id,
                };
                dispatch(
                  storeActions.setPreferences({
                    preferredCategory: newData.preferredCategory,
                    preferredCountry: newData.preferredCountry,
                  }),
                );
                const cookies = new Cookies();
                cookies.set("userInfo", {
                  email: data.email,
                  oAuth: data.oAuth,
                });
                dispatch(storeActions.setUserData(newData));
                back();
              }
            }
          },
          { fields: "name,email,picture" },
        );
      },
      {
        scope: "public_profile, email",
      },
    );
  };

  const validateEmail = (email: any) => {
    setEmailValid("");
    setPasswordValid("");
    setError("");
    const passwordCheck = isStrongPassword(password);
    if (
      email.length === 0 ||
      !email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      if (email.length === 0) {
        setEmailValid("Enter your email address");
      } else {
        setEmailValid("Enter valid email address");
      }
    }

    if (password.length === 0 || password.length < 6 || passwordCheck) {
      if (password.length === 0) {
        setPasswordValid("Enter your password");
      } else {
        setPasswordValid(
          "Password must contain of at least 6 alpha Numeric characters",
        );
      }
    }
    if (
      !passwordCheck &&
      password.length >= 6 &&
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    ) {
      loginWithMail(email);
    }
  };
  const loginWithMail = async (email: any) => {
    setLoading(true);
    const result: any = await dispatch(
      userLogin({
        email,
        password,
      }),
    );
    setLoading(false);
    if (result.payload.data.status) {
      console.log("error", result.payload.data);
      setError(result.payload.data.message);
    } else {
      console.log("success", result.payload.data);
      const data = {
        name: result.payload.data?.name,
        email: result?.payload.data?.email,
        profileImg: result?.payload.data.profileImg,
        _id: result?.payload.data?._id,
        oAuth: LoginType.opennewsai,
        preferredCategory: result?.payload.data.preferredCategory,
        preferredCountry: result?.payload.data.preferredCountry,
        saved_news: result?.payload.data.saved_news,
      };
      dispatch(
        storeActions.setPreferences({
          preferredCategory: result?.payload.data.preferredCategory,
          preferredCountry: result?.payload.data.preferredCountry,
        }),
      );
      const cookies = new Cookies();
      cookies.set("userInfo", { email: data.email, oAuth: data.oAuth });

      dispatch(storeActions.setUserData(data));
      back();
    }
  };
  return (
    <SafeAreaView style={[styles.containerDark, { flexDirection: "row" }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={
            width > 475
              ? require("../../assets/images/AIBackground.webp")
              : require("../../assets/images/mobileWebAI.webp")
          }
          style={{
            width,
            height:
              height > 675
                ? width > 565
                  ? height
                  : height > 740
                    ? height
                    : "auto"
                : width > 1025
                  ? height > 590
                    ? height
                    : 590
                  : width > 600
                    ? 675
                    : 720,
            justifyContent: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
              opacity: 0.1,
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
          <View
            style={{
              maxWidth: 1440,
              padding: 32,
              alignSelf: "center",
              // position: "absolute",
              height: "100%",
              width: width < 1440 ? width : 1440,
            }}
          >
            <Logo
              onPress={() => {
                navigation.navigate("TopNews");
              }}
            />
            <View
              style={[
                {
                  flex: height > 620 && width > 565 ? 0.95 : 1,
                  flexDirection: width > 1025 ? "row" : "column",
                  alignItems: width > 1025 ? "center" : "flex-start",
                },
              ]}
            >
              <View
                style={[
                  {
                    alignItems: width > 1025 ? "center" : "flex-start",
                  },
                  width > 1025 && { flex: 1 },
                ]}
              >
                <View
                  style={{
                    width: width > 1025 ? "80%" : "100%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: width > 1025 ? 56 : 40,
                      color: "#B52813",
                      fontFamily: FontFamily.InterSemiBold,
                    }}
                  >
                    Welcome back
                  </Text>
                  <Text
                    style={{
                      fontSize: width > 1025 ? 20 : 18,
                      color: "#404040",
                      fontFamily: FontFamily.InterRegular,
                      // width: "80%",
                      marginTop: width > 1025 ? 30 : 15,
                    }}
                  >
                    Enter your email address and password to sign in to your
                    Open News AI account.
                  </Text>
                </View>
              </View>
              <View
                style={[
                  {
                    alignItems: "center",
                  },
                  width > 1025 && { flex: 1 },
                  width <= 1025 && { width: "100%", marginTop: 15 },
                ]}
              >
                <View
                  style={{
                    width: width > 1025 ? "70%" : "100%",
                    backgroundColor: "#fff",
                    paddingVertical: 30,
                    borderRadius: 20,
                    shadowColor: "#d3d3d3",
                    shadowOffset: { width: 0.5, height: 0.5 },
                  }}
                >
                  <Pressable
                    style={{
                      borderColor: "lightgray",
                      borderWidth: 1,
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      alignSelf: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "85%",
                    }}
                    onPress={() => {
                      loginFaceBook();
                    }}
                  >
                    <Image
                      source={require("../../assets/icon/FBIcon.png")}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: "#404040",
                        fontSize: 16,
                        fontFamily: FontFamily.InterRegular,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Continue with Facebook
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      borderColor: "lightgray",
                      borderWidth: 1,
                      marginTop: 10,
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      alignSelf: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "85%",
                    }}
                    onPress={() => loginGoogle()}
                  >
                    <Image
                      source={require("../../assets/icon/GoogleIcon.png")}
                      style={{ height: 20, width: 20 }}
                      resizeMode="contain"
                    />
                    <Text
                      style={{
                        color: "#404040",
                        fontSize: 16,
                        fontFamily: FontFamily.InterRegular,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Continue with Google
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      borderColor: "lightgray",
                      borderWidth: 1,
                      marginTop: 10,
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      alignSelf: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "85%",
                    }}
                    onPress={() => loginApple()}
                  >
                    <Image
                      source={require("../../assets/icons/apple-logo.png")}
                      style={{ height: 20, width: 20 }}
                      resizeMode="center"
                    />
                    <Text
                      style={{
                        color: "#404040",
                        fontSize: 16,
                        fontFamily: FontFamily.InterRegular,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Continue with Apple
                    </Text>
                  </Pressable>
                  <Pressable
                    style={{
                      borderColor: "lightgray",
                      borderWidth: 1,
                      marginTop: 10,
                      paddingVertical: 8,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                      alignSelf: "center",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "85%",
                    }}
                    onPress={() => loginTwitter()}
                  >
                    <Image
                      source={require("../../assets/images/twitter.png")}
                      style={{ height: 20, width: 20 }}
                      resizeMode="center"
                    />
                    <Text
                      style={{
                        color: "#404040",
                        fontSize: 16,
                        fontFamily: FontFamily.InterRegular,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Continue with Twitter
                    </Text>
                  </Pressable>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      marginVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        width: "40%",
                        height: 1,
                        backgroundColor: "lightgray",
                      }}
                    />
                    <Text
                      style={{
                        marginHorizontal: 10,
                        color: "#404040",
                        fontFamily: FontFamily.InterRegular,
                      }}
                    >
                      or
                    </Text>
                    <View
                      style={{
                        width: "40%",
                        height: 1,
                        backgroundColor: "lightgray",
                      }}
                    />
                  </View>
                  <View
                    style={{
                      width: "85%",
                      alignSelf: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#404040",
                      }}
                    >
                      Email
                    </Text>
                    <TextInput
                      style={{
                        height: 36,
                        borderColor: "lightgray",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 8,
                        fontSize: 16,
                        marginTop: 3,
                      }}
                      value={email}
                      onChangeText={(t) => setEmail(t)}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      {emailvalid ? emailvalid : " "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#404040",
                        marginTop: 5,
                      }}
                    >
                      Password
                    </Text>
                    <TextInput
                      style={{
                        height: 36,
                        borderColor: "lightgray",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 8,
                        fontSize: 16,
                        marginTop: 3,
                      }}
                      secureTextEntry
                      value={password}
                      onChangeText={(t) => setPassword(t)}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      {passwordvalid ? passwordvalid : " "}
                      {error ? error : " "}
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("Forgot")}
                      style={{ alignSelf: "center" }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#404040",
                          textDecorationLine: "underline",

                          marginTop: 3,
                        }}
                      >
                        Forgot password?
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        validateEmail(email);
                      }}
                      disabled={loading}
                      style={{ alignSelf: "center" }}
                    >
                      {loading ? (
                        <ActivityIndicator
                          style={{
                            backgroundColor: "#000",
                            marginVertical: 15,
                            paddingVertical: 7,
                            paddingHorizontal: 20,
                            borderRadius: 8,

                            width: 120,
                          }}
                          color="#fff"
                          size="small"
                        />
                      ) : (
                        <Text
                          style={{
                            color: "#fff",
                            fontSize: 16,
                            fontFamily: FontFamily.InterMedium,
                            backgroundColor: "#000",
                            marginVertical: 15,
                            paddingVertical: 8,
                            paddingHorizontal: 20,
                            borderRadius: 8,
                            textAlign: "center",
                            width: 120,
                          }}
                        >
                          Sign In
                        </Text>
                      )}
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", alignSelf: "center" }}>
                      <Text
                        style={{
                          fontSize: 14,
                          color: "#404040",
                          // fontFamily: FontFamily.InterRegular,
                        }}
                      >
                        Not signed up yet?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("signUp")}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={{
                            fontSize: 14,
                            color: "#000",
                            fontFamily: FontFamily.InterRegular,
                            textDecorationLine: "underline",
                          }}
                        >
                          {` Sign Up here`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};
