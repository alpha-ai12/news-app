import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
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
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../assets/fonts";
import { Logo } from "../../components";
import { nonceCheck, resetPassword } from "../../store";
import { checkPassword } from "../SignUp/partial.tsx/passwordCheck";
import { isStrongPassword } from "../SignUp/partial.tsx/strongPassword";

export const ChangePassword = ({ route }) => {
  const nonce = route.params.nonce ?? "";
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const navigation = useNavigation<any>();
  const ref1 = useRef<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordvalid, setPasswordvalid] = useState("");
  const [conformvalid, setConformvalid] = useState("");
  const [strength, setStrength] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const validatePassword = () => {
    setPasswordvalid("");
    setConformvalid("");
    const passwordCheck = isStrongPassword(Password);
    if (Password.length < 6 || passwordCheck) {
      if (Password.length < 6)
        setPasswordvalid(
          "Password must contain of at least 6 alpha Numeric characters",
        );
      else if (passwordCheck) {
        setPasswordvalid(passwordCheck);
      }
    } else if (confirmPassword.length === 0) {
      setConformvalid("Please conform your password");
    } else if (Password !== confirmPassword) {
      setPasswordvalid("The password is not Matching");
      setConformvalid("The password is not Matching");
    } else {
      reset();
    }
  };

  useEffect(() => {
    noncecheck();
  }, [nonce]);
  const noncecheck = async () => {
    const data: any = await dispatch(nonceCheck(nonce));

    if (data.payload.data.response) {
      setEmail(data.payload.data.response.email);
    } else {
      alert(data.payload.data.message);
      navigation.navigate("login", { back: false });
    }
  };
  const reset = async () => {
    setLoading(true);
    const data: any = await dispatch(
      resetPassword({
        email,
        password: Password,
      }),
    );
    setLoading(false);
    if (data.payload.data.message === "Password change successfully") {
      // alert(data.payload.data.message);
      navigation.navigate("login", { back: false });
    } else {
      setError(data.payload.data.message);
      // alert(data.payload.data.message);
    }
  };
  return (
    <SafeAreaView style={{ flexDirection: "row", flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={
            width > 475
              ? require("../../assets/images/AIBackground.webp")
              : require("../../assets/images/mobileWebAI.webp")
          }
          style={{
            width,
            height: height > 450 ? height : "auto",
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
                  flex: 1,
                  flexDirection: width > 800 ? "row" : "column",
                  alignItems: width > 800 ? "center" : "flex-start",
                },
              ]}
            >
              <View
                style={[
                  {
                    alignItems: width > 800 ? "center" : "flex-start",
                  },
                  width > 800 && { flex: 1 },
                ]}
              >
                <View
                  style={{
                    width: width > 800 ? "80%" : "100%",
                  }}
                >
                  <Text
                    style={{
                      fontSize: width > 800 ? 48 : 40,
                      color: "#B52813",
                      fontFamily: FontFamily.InterRegular,
                    }}
                  >
                    # Change Your Password
                  </Text>
                  <Text
                    style={{
                      fontSize: width > 800 ? 20 : 18,
                      color: "#404040",
                      fontFamily: FontFamily.InterRegular,
                      // width: "80%",
                      marginTop: width > 800 ? 20 : 15,
                    }}
                  >
                    It's important to keep your account secure. If you wish to
                    change your password, you can do so here.
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#404040",
                      // fontFamily: FontFamily.InterRegular,
                      // width: "80%",
                      marginTop: 5,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          marginTop: 5,
                          color: "#404040",
                        }}
                      >
                        Password must include at least:
                      </Text>
                      <View
                        style={{
                          marginLeft: 10,
                          flexWrap: "wrap",
                          flexDirection: "row",
                          marginBottom: 5,
                          marginTop: 3,
                        }}
                      >
                        <Text
                          style={{
                            width: "50%",
                            color: "#404040",
                          }}
                        >
                          • 6 characters
                        </Text>
                        <Text
                          style={{
                            width: "50%",
                            color: "#404040",
                          }}
                        >
                          • Upper and lowercase letters
                        </Text>
                        <Text
                          style={{
                            width: "50%",
                            color: "#404040",
                          }}
                        >
                          • 1 number
                        </Text>
                        <Text
                          style={{
                            width: "50%",
                            color: "#404040",
                          }}
                        >
                          • 1 special character
                        </Text>
                      </View>
                    </View>
                  </Text>
                </View>
              </View>
              <View
                style={[
                  {
                    alignItems: "center",
                  },
                  width > 800 && { flex: 1 },
                  width <= 800 && { width: "100%", marginTop: 15 },
                ]}
              >
                <View
                  style={{
                    width: width > 800 ? "70%" : "100%",
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 20,
                    shadowColor: "#d3d3d3",
                    shadowOffset: { width: 0.5, height: 0.5 },
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#404040",
                      marginTop: 24,
                      fontFamily: FontFamily.InterRegular,
                    }}
                  >
                    New Password
                  </Text>
                  <Pressable
                    style={{
                      borderColor: "lightgray",
                      borderWidth: 1,
                      borderRadius: 5,
                      marginTop: 5,
                      backgroundColor: "#fff",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      height: 36,
                    }}
                    onPress={() => ref1.current.focus()}
                  >
                    <TextInput
                      ref={ref1}
                      style={{
                        padding: 8,
                        fontSize: 16,
                        flex: 1,
                      }}
                      secureTextEntry
                      value={Password}
                      onChangeText={(text) => {
                        if (text.length > 1) {
                          const str = checkPassword(text);
                          setStrength(str);
                        } else {
                          setStrength("");
                        }
                        setPassword(text);
                      }}
                    />
                    <Text
                      style={{
                        color:
                          strength === "Poor"
                            ? "red"
                            : strength === "Good"
                              ? "#ffbf00"
                              : "green",
                        alignSelf: "center",
                        width: 50,
                        backgroundColor: "#fff",
                        fontFamily: FontFamily.InterMedium,
                      }}
                    >
                      {strength ? strength : ""}
                    </Text>
                  </Pressable>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "red",
                    }}
                  >
                    {passwordvalid ? passwordvalid : " "}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#404040",
                      marginTop: 24,
                      fontFamily: FontFamily.InterRegular,
                    }}
                  >
                    Confirm Password
                  </Text>
                  <TextInput
                    style={{
                      height: 36,
                      borderColor: "lightgray",
                      borderWidth: 1,
                      borderRadius: 5,
                      padding: 8,
                      fontSize: 16,
                      marginTop: 5,
                      backgroundColor: "#fff",
                    }}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={(t) => setConfirmPassword(t)}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: "red",
                    }}
                  >
                    {conformvalid ? conformvalid : " "}
                    {error ? error : ""}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      validatePassword();
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator
                        style={{
                          backgroundColor: "#000",
                          marginVertical: 15,
                          paddingVertical: 7.5,
                          paddingHorizontal: 20,
                          borderRadius: 8,

                          width: 175,
                          alignSelf: "center",
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
                          //   width: 120,
                          alignSelf: "center",
                        }}
                      >
                        Change password
                      </Text>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("login", { back: false })
                    }
                    activeOpacity={0.7}
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      alignSelf: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/icons/chevronLeft.png")}
                      style={{
                        height: 14,
                        width: 14,
                        resizeMode: "contain",
                        tintColor: "#404040",
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#404040",
                        textDecorationLine: "underline",
                        alignSelf: "center",
                        fontFamily: FontFamily.InterRegular,
                      }}
                    >
                      Back to Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};
