/* eslint-disable no-useless-escape */
import { appleAuth } from "@invertase/react-native-apple-authentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Pressable,
  Platform,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from "react-native-fbsdk-next";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { LoginType } from "./login.web";
import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { save } from "../../storage";
import { storeActions, userAPI, userDataAPI, userLogin } from "../../store";
import { isStrongPassword } from "../SignUp/partial.tsx/strongPassword";

const GoogleButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.signinBtn,
        Platform.OS === "ios" ? { marginHorizontal: 20 } : { marginRight: 20 },
      ]}
      onPress={() => onPress()}
    >
      <Image
        source={require("../../assets/icons/googleLogin.png")}
        style={styles.btnGoogleIcon}
      />
    </TouchableOpacity>
  );
};

const FacebookButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.signinBtn} onPress={() => onPress()}>
      <Image
        source={require("../../assets/icons/facebookLogin.png")}
        style={styles.btnGoogleIcon}
      />
    </TouchableOpacity>
  );
};
// const TwitterButton = ({ onPress }) => {
//   return (
//     <TouchableOpacity
//       style={{
//         shadowColor: "#000",
//         shadowOffset: {
//           width: 0,
//           height: 4,
//         },
//         shadowOpacity: 0.2,
//         shadowRadius: 10,
//         elevation: 4,
//         backgroundColor: "white",
//         height: 44,
//         width: 44,
//         justifyContent: "center",
//         borderRadius: 22,
//       }}
//       onPress={() => onPress()}
//     >
//       <Image
//         source={require("../../assets/icons/twitter.png")}
//         style={[{ height: 28, width: 28, alignSelf: "center" }]}
//       />
//     </TouchableOpacity>
//   );
// };
const AppleButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
        backgroundColor: "white",
        height: 44,
        width: 44,
        justifyContent: "center",
        borderRadius: 22,
      }}
      onPress={() => onPress()}
    >
      <Image
        source={require("../../assets/icons/apple-logo.png")}
        style={[{ height: 28, width: 28, alignSelf: "center" }]}
      />
    </TouchableOpacity>
  );
};
export const Login = () => {
  const navigation = useNavigation<any>();
  const [emailAddress, setEmailAddress] = useState("");
  const [emailvalid, setEmailValid] = useState("");
  const [password, setPassword] = useState("");
  const [passwordvalid, setPasswordValid] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const dispatch = useDispatch<Dispatch<any>>();

  const back = () => {
    try {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate("Drawer");
      }
    } catch (error) {
      console.log(error);
      navigation.navigate("Drawer");
    }
  };
  const onGoogleButtonPress = () => {
    setLoginStatus(true);
    GoogleSignin.configure({
      webClientId:
        "550399240107-tortiplh2l49cjpdu65a6ubcgodjp6qs.apps.googleusercontent.com",
      iosClientId:
        "550399240107-u2u6bcts6evc5pf1bs40hrb8pj0k832t.apps.googleusercontent.com",
    });
    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          // console.log("hasPlayService", hasPlayService);
          GoogleSignin.signIn()
            .then(async (userInfo) => {
              // console.log("GOOGLE userInfo : ", JSON.stringify(userInfo));
              setLoginStatus(false);
              const data = {
                name: userInfo?.user.name,
                email: userInfo?.user.email,
                profileImg: userInfo?.user.photo,
                id: userInfo?.user.id,
                oAuth: LoginType.google,
              };

              const res: any = await dispatch(userAPI(data));
              // console.log(res.payload.data);
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
                save("userInfo", {
                  email: data.email,
                  oAuth: data.oAuth,
                });
                dispatch(storeActions.setUserData(newData));
                back();
                // navigation.navigate("Drawer");
              }
            })
            .catch((e) => {
              // console.log("Module ERR : ", JSON.stringify(e));
              console.log(e);
              setLoginStatus(false);
            });
        }
      })
      .catch((e) => {
        setLoginStatus(false);
        console.log("ERROR", e);
      });
  };

  // const [userInfo, setUserInfo] = useState<any>({});

  // const logoutWithFacebook = () => {
  //   LoginManager.logOut();
  //   setUserInfo({});
  // };

  const getInfoFromToken = (token: any) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: "id,name,first_name,last_name,picture,email",
      },
    };
    const profileRequest = new GraphRequest(
      "/me",
      { accessToken: token, parameters: PROFILE_REQUEST_PARAMS },
      async (error, user: any) => {
        if (error) {
          setLoginStatus(false);
          console.log("login info has error: " + error);
        } else {
          // setUserInfo(user);
          // console.log("result:", user);
          const data = {
            name: user?.name,
            email: user?.email,
            profileImg: user?.picture?.data?.url,
            id: user?.id,
            oAuth: LoginType.facebook,
          };

          const res: any = await dispatch(userAPI(data));
          console.log(res.payload.data);
          if (res.payload.data.message) {
            setError(res.payload.data.message);
            setLoginStatus(false);
            console.log("facebook error:", res.payload.data.message);
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
            save("userInfo", {
              email: data.email,
              oAuth: data.oAuth,
            });
            dispatch(storeActions.setUserData(newData));
            setLoginStatus(false);
            // navigation.navigate("Drawer");
            back();
          }
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const loginWithFacebook = () => {
    setLoginStatus(true);
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (login) => {
        if (login.isCancelled) {
          console.log("Login cancelled");
          setLoginStatus(false);
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        setLoginStatus(false);
        console.log("Login fail with error: " + error);
      },
    );
  };

  async function OnAppleButtonPress() {
    try {
      setLoginStatus(true);
      const appleAuthRequestResponse = await appleAuth.performRequest({
        nonceEnabled: false,
        requestedOperation: appleAuth.Operation.LOGIN,
        // Note: it appears putting FULL_NAME first is important, see issue #293
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );
      console.log("USER LOG APPLE", appleAuthRequestResponse);
      const { identityToken, fullName, user } = appleAuthRequestResponse;
      const { email } = jwt_decode(identityToken);
      console.log(email);
      let fullName_ = "";
      if (fullName.namePrefix)
        fullName_ = fullName_ + fullName.namePrefix + " ";
      if (fullName.givenName) fullName_ = fullName_ + fullName.givenName + " ";
      if (fullName.familyName)
        fullName_ = fullName_ + fullName.familyName + " ";
      if (fullName.nickname) fullName_ = fullName_ + fullName.nickname + " ";
      if (fullName.middleName)
        fullName_ = fullName_ + fullName.middleName + " ";
      if (fullName.nameSuffix)
        fullName_ = fullName_ + fullName.nameSuffix + " ";
      // use credentialState response to ensure the user is authenticated
      if (fullName_ === "") {
        const data = {
          email,
          oAuth: LoginType.apple,
        };
        const result: any = await dispatch(userDataAPI(data));
        if (result.payload.message) {
          console.log(result.payload.message);
          setLoginStatus(false);
        } else {
          save("userInfo", data);
          dispatch(storeActions.setUserData(result.payload.data || {}));
          dispatch(
            storeActions.setPreferences({
              preferredCategory: result.payload.data?.preferredCategory ?? [],
              preferredCountry: result.payload.data?.preferredCountry ?? [],
            }),
          );
          setLoginStatus(false);
          // navigation.navigate("Drawer");
          back();
        }
      } else {
        const data = {
          name: fullName_,
          email,
          profileImg: "",
          id: user,
          oAuth: LoginType.apple,
        };
        const res: any = await dispatch(userAPI(data));
        console.log(res.payload.data);
        if (res.payload.data.message) {
          setError(res.payload.data.message);
          setLoginStatus(false);
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

          save("userInfo", { email: data.email, oAuth: data.oAuth });
          dispatch(storeActions.setUserData(newData));
          setLoginStatus(false);
          // navigation.navigate("Drawer");
          back();
        }
      }
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        setLoginStatus(false);
      }
    } catch (error) {
      setLoginStatus(false);
      console.log(error);
    }
  }

  const openTerms = async () => {
    // console.log("Terms");
    navigation.navigate("WebViewScreen", {
      uri: "https://opennewsai.com/terms",
      title: "Terms of Service",
    });
  };

  const openPrivacy = async () => {
    // console.log("Privacy");
    navigation.navigate("WebViewScreen", {
      uri: "https://opennewsai.com/policy",
      title: "Privacy Policy",
    });
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
      save("userInfo", {
        email: data.email,
        oAuth: data.oAuth,
      });
      dispatch(storeActions.setUserData(data));
      back();
      // navigation.navigate("Drawer");
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/mobileAI.png")} // Replace with your image source
        style={{ flex: 1 }}
        resizeMethod="resize"
        resizeMode="cover"
      >
        <View
          style={{
            backgroundColor: "#000",
            opacity: 0.2,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 45, left: 20 }}
        >
          <Image
            source={require("../../assets/icon/back.png")}
            style={{ height: 40, width: 40 }}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={[
            {
              marginTop: 90,
              alignSelf: "center",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => {
            navigation.navigate("Drawer");
          }}
        >
          <Image
            source={require("../../assets/icon/logo.png")}
            style={{ width: 240, height: 60, resizeMode: "contain" }}
          />
        </Pressable>
        <View
          style={[
            { flex: 1 },
            Platform.OS === "ios"
              ? { justifyContent: "center" }
              : { marginTop: 20 },
          ]}
        >
          <View style={styles.socialButtons}>
            {Platform.OS === "ios" && (
              <AppleButton onPress={OnAppleButtonPress} />
            )}
            <GoogleButton onPress={onGoogleButtonPress} />
            <FacebookButton onPress={loginWithFacebook} />
            {/* <TwitterButton /> */}
          </View>
          <Text
            style={{
              color: "grey",
              justifyContent: "center",
              alignSelf: "center",
              fontStyle: "normal",
              fontSize: 18,
              marginVertical: 20,
            }}
          >
            or
          </Text>
          <View
            style={{
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: "#fff",
              alignSelf: "center",
              // justifyContent: "center",
              // height: "5%",
              width: "75%",
              shadowColor: "#c4c4c4",
              shadowOffset: {
                width: 0.4,
                height: 0.4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 2,
              padding: 10,
              // marginTop: "45%",
            }}
          >
            <TextInput
              onChangeText={(e) => {
                setEmailAddress(e.toLowerCase());
              }}
              placeholderTextColor="#8AA2CE"
              placeholder="Enter email address"
              allowFontScaling={false}
              textContentType="emailAddress"
              value={emailAddress}
              autoCapitalize="none"
              style={{ fontSize: 16, fontFamily: "Helvetica" }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              color: "red",
              width: "75%",
              alignSelf: "center",
            }}
          >
            {emailvalid ? emailvalid : " "}
          </Text>
          <View
            style={{
              marginTop: 10,
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "#fff",
              backgroundColor: "#fff",
              alignSelf: "center",
              justifyContent: "center",
              // height: "5%",
              width: "75%",
              shadowColor: "#c4c4c4",
              shadowOffset: {
                width: 0.4,
                height: 0.4,
              },
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 2,
              padding: 10,
              // marginTop: "5%",
            }}
          >
            <TextInput
              onChangeText={(e) => {
                setPassword(e);
              }}
              placeholderTextColor="#8AA2CE"
              placeholder="Enter password"
              allowFontScaling={false}
              textContentType="password"
              value={password}
              autoCapitalize="none"
              style={{ fontSize: 16, fontFamily: "Helvetica" }}
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              color: "red",
              width: "75%",
              alignSelf: "center",
              marginVertical: 5,
            }}
          >
            {passwordvalid ? passwordvalid : " "} {error ? error : ""}
          </Text>
          <Text
            style={{
              width: "75%",
              alignSelf: "center",
              fontSize: 16,
              fontFamily: FontFamily.InterMedium,
              textAlign: "right",
              // marginLeft: "1%",
              marginTop: 3,
              marginBottom: 15,
              color: "#007AFF",
            }}
            onPress={() => {
              navigation.navigate("Forgot");
            }}
          >
            Forgot password?
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#007AFF",
              marginVertical: 20,
              height: 50,
              paddingHorizontal: 45,
              borderRadius: 10,
              borderColor: "#007AFF",
              alignSelf: "center",
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: "28%",
            }}
            onPress={() => validateEmail(emailAddress)}
          >
            {loading ? (
              <ActivityIndicator
                style={{ width: 90 }}
                color="#fff"
                size="small"
              />
            ) : (
              <>
                <Text style={styles.signinInText}>Sign In</Text>
                <Image
                  source={require("../../assets/icon/right-arrow.png")}
                  style={{
                    height: 18,
                    width: 18,
                    resizeMode: "contain",
                    alignSelf: "center",
                    marginLeft: 10,
                    tintColor: "#FFF",
                  }}
                />
              </>
            )}
          </TouchableOpacity>

          <View
            style={[
              {
                bottom: 15,
                alignSelf: "center",
                width: Dimensions.get("screen").width - 80,
              },
              Platform.OS === "ios" && { position: "absolute", bottom: 40 },
            ]}
          >
            <Text style={styles.signupText}>
              {"New to Open News AI?  "}
              <Text
                style={{
                  color: "#007AFF",
                  textDecorationLine: "underline",
                  fontFamily: FontFamily.InterSemiBold,
                  fontSize: 16,
                }}
                onPress={() => navigation.navigate("signUp")}
              >
                Sign Up
              </Text>
            </Text>
            <Text style={styles.linktext}>
              By continuing, you agree to our {"\n"}
              <Text style={styles.primaryText} onPress={() => openPrivacy()}>
                {" "}
                Privacy Policy{" "}
              </Text>{" "}
              and
              <Text style={styles.primaryText} onPress={() => openTerms()}>
                {" "}
                Terms of use{" "}
              </Text>
            </Text>
          </View>
        </View>
        {loginStatus && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: "rgba(255, 255, 255, 0.3)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="small" color="#1C90FC" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};
