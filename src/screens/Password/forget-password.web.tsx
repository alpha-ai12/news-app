/* eslint-disable no-useless-escape */
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../assets/fonts";
import { Logo } from "../../components";
import { PolicyModel } from "../../components/policyModal/policyModal";
import { forgetPass } from "../../store";

export const ForgetPassword = ({ route }) => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [email, setEmail] = useState("");
  const [emailvalid, setEmailValid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [changed, setChanged] = useState(false);
  const [model, setModel] = useState(false);
  // const validateEmail = (email: any) => {
  //   return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  // };
  const validateEmail = (email: any) => {
    // return email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    setEmailValid("");
    setError("");
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

    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      reset();
    }
  };
  const reset = async () => {
    setLoading(true);
    const data: any = await dispatch(forgetPass(email));
    setLoading(false);
    if (data.payload.data.message === "email sent successfully") {
      setEmail("");
      setChanged(true);
      // navigation.navigate("login", { back: false });
    } else {
      setError(data.payload.data.message);
    }
  };
  const unload = () => {
    setChanged(false);
    setEmailValid("");
    setError("");
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
            height: height > 500 ? height : "auto",
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
                    Recover Password
                  </Text>
                  <Text
                    style={{
                      fontSize: width > 800 ? 20 : 18,
                      color: "#404040",
                      // fontFamily: FontFamily.InterRegular,
                      marginTop: width > 800 ? 20 : 15,
                    }}
                  >
                    Lost your password? No worries! Enter your registered email
                    address , and we'll send you a password reset link in just a
                    few minutes.
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#404040",
                      marginTop: 10,
                    }}
                  >
                    If you don't receive the email promptly, please check your
                    spam folder. For assistance, contact our support team at
                    [services@opennewsai.com].
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
                {changed ? (
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
                        fontSize: 20,
                        color: "#404040",
                        fontFamily: FontFamily.InterRegular,
                        marginTop: 8,
                        alignSelf: "center",
                      }}
                    >
                      Check your email
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#404040",
                        marginTop: 8,
                      }}
                    >
                      We just sent you an email with instructions for resetting
                      your password. If you don't receive an email,
                      <Text
                        style={{ color: "#0047AB" }}
                        onPress={() => {
                          setChanged(false);
                        }}
                      >
                        try again with a different username or email address
                      </Text>{" "}
                      or{" "}
                      <Text
                        style={{ color: "#0047AB" }}
                        onPress={() => {
                          setModel(true);
                        }}
                      >
                        contact us.
                      </Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        unload();
                        navigation.navigate("login", { back: false });
                      }}
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
                ) : (
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
                        fontSize: 20,
                        color: "#404040",
                        fontFamily: FontFamily.InterRegular,
                        marginTop: 8,
                      }}
                    >
                      Enter your email address and we’ll send you an email with
                      a link to reset your password.
                    </Text>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#404040",
                        marginTop: 24,
                        fontFamily: FontFamily.InterRegular,
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
                        marginTop: 5,
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
                      {error ? error : ""}
                    </Text>
                    <TouchableOpacity
                      disabled={loading}
                      onPress={() => {
                        validateEmail(email);
                      }}
                    >
                      {loading ? (
                        <ActivityIndicator
                          style={{
                            backgroundColor: "#000",
                            marginVertical: 15,
                            paddingVertical: 7,
                            paddingHorizontal: 20,
                            borderRadius: 8,

                            width: 160,
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
                          Reset password
                        </Text>
                      )}
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        unload();
                        navigation.navigate("login", { back: false });
                      }}
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
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      <PolicyModel setModel={setModel} model={model} data="contact" />
    </SafeAreaView>
  );
};
