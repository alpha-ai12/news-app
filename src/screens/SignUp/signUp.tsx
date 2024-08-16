/* eslint-disable no-useless-escape */
import CheckBox from "@react-native-community/checkbox";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  TextInput,
  Pressable,
  ImageBackground,
  KeyboardAvoidingView,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { isStrongPassword } from "./partial.tsx/strongPassword";
import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { save } from "../../storage";
import { storeActions, userSignUp } from "../../store";
import { customHeight } from "../../utils";
import { LoginType } from "../Login/login.web";

export const SignUp = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const width = useWindowDimensions().width;
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [checkboxState, setCheckboxState] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const signUpValidation = async () => {
    setError1(""); // Reset error states
    setError2("");
    setError3("");
    setError4("");
    setError5("");
    setError("");
    const passwordCheck = isStrongPassword(password);
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i;
    if (firstName.trim() === "") {
      setError1("Please enter a first name");
    }
    if (lastName.trim() === "") {
      setError2("Please enter a last name");
    }
    if (emailAddress.trim() === "" || !emailRegex.test(emailAddress)) {
      setError3("Please enter a email address");
    }
    if (password.length < 6 || passwordCheck) {
      if (password.length < 6)
        setError5(
          "Password must contain of at least 6 alpha Numeric characters",
        );
      else if (passwordCheck) {
        setError5(passwordCheck);
      }
    }
    if (!checkboxState) {
      setError4("Please agree to the terms and privacy policy");
      setCheckboxState(false);
    }
    if (
      checkboxState &&
      !passwordCheck &&
      password.length >= 6 &&
      lastName.trim() !== "" &&
      firstName.trim() !== "" &&
      emailAddress.trim() !== "" &&
      emailRegex.test(emailAddress)
    ) {
      setLoading(true);
      const result: any = await dispatch(
        userSignUp({
          name: `${firstName} ${lastName}`,
          email: emailAddress,
          profileImg: null,
          id: "",
          oAuth: LoginType.opennewsai,
          password,
        }),
      );
      setLoading(false);
      if (result.payload.data.message) {
        // alert(result.payload.data.message);
        setError(result.payload.data.message);
      } else {
        // alert("Sign up Successfully");

        const data = {
          name: `${firstName} ${lastName}`,
          email: emailAddress,
          profileImg: null,
          id: result.payload.data._id,
          oAuth: LoginType.opennewsai,
          preferredCategory: [],
          preferredCountry: [],
          saved_news: [],
        };
        save("userInfo", { email: data.email, oAuth: data.oAuth });
        dispatch(storeActions.setUserData(data));
        dispatch(
          storeActions.setPreferences({
            preferredCategory: [],
            preferredCountry: [],
          }),
        );
        // console.log("Perform signup operation");
        setEmailAddress("");
        setPassword("");
        setCheckboxState(false);
        setFirstName("");
        setLastName("");
        navigation.navigate("Drawer");
      }
      // console.log("error", result);
      // navigation.navigate("TopNews");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/mobileAI.png")} // Replace with your image source
        style={{ flex: 1, width }}
        // resizeMethod="cover"
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
          style={[styles.logo, { marginTop: 90 }]}
          onPress={() => {
            navigation.navigate("Drawer");
          }}
        >
          <Image
            source={require("../../assets/icon/logo.png")}
            style={{ width: 240, height: 60, resizeMode: "contain" }}
          />
        </Pressable>
        <ScrollView
          style={[
            {
              flex: 1,
              paddingHorizontal: 25,
            },
            customHeight > 700
              ? { marginTop: 100 }
              : { justifyContent: "center", height: "100%" },
          ]}
          scrollEnabled={Platform.OS === "android"}
          showsVerticalScrollIndicator={false}
          automaticallyAdjustKeyboardInsets={Platform.OS === "android"}
        >
          <KeyboardAvoidingView
            style={{
              width: "100%",
            }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.inputView}>
              <TextInput
                onChangeText={(text) => setFirstName(text)}
                placeholderTextColor="#8AA2CE"
                placeholder="First Name"
                // style={styles.textStyle}
                allowFontScaling={false}
                textContentType="name"
                value={firstName}
                autoCapitalize="none"
                style={{ fontSize: 16, fontFamily: "Helvetica" }}
              />
            </View>
            <Text style={styles.errorText}>{error1 ? error1 : " "}</Text>
            <View style={styles.inputView}>
              <TextInput
                onChangeText={(text) => setLastName(text)}
                placeholderTextColor="#8AA2CE"
                placeholder="Last Name"
                // style={styles.textStyle}
                allowFontScaling={false}
                textContentType="familyName"
                value={lastName}
                autoCapitalize="none"
                style={{ fontSize: 16, fontFamily: "Helvetica" }}
              />
            </View>
            <Text style={styles.errorText}>{error2 ? error2 : " "}</Text>

            <View style={styles.inputView}>
              <TextInput
                onChangeText={(text) => setEmailAddress(text.toLowerCase())}
                placeholderTextColor="#8AA2CE"
                placeholder="Enter email"
                // style={styles.textStyle}
                allowFontScaling={false}
                textContentType="emailAddress"
                value={emailAddress}
                autoCapitalize="none"
                style={{ fontSize: 16, fontFamily: "Helvetica" }}
              />
            </View>
            <Text style={styles.errorText}>{error3 ? error3 : " "}</Text>

            <View style={styles.inputView}>
              <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholderTextColor="#8AA2CE"
                placeholder="Enter password"
                // style={styles.textStyle}
                allowFontScaling={false}
                textContentType="password"
                value={password}
                autoCapitalize="none"
                style={{ fontSize: 16, fontFamily: "Helvetica" }}
              />
            </View>
            <Text style={styles.errorText}>{error5 ? error5 : " "} </Text>
            <View
              style={{
                alignSelf: "center",
                width: "80%",
                maxWidth: 240,
              }}
            >
              <CheckBox
                boxType="square"
                onChange={() => setCheckboxState(!checkboxState)}
                value={checkboxState}
                onFillColor="#007AFF"
                onTintColor="#007AFF"
                onCheckColor="white"
                // tintColors={{ false: "white" }}
                style={[
                  Platform.OS === "ios"
                    ? {
                        width: 20,
                        height: 20,
                        top: 20,
                        right: 25,

                        backgroundColor: "white",
                        opacity: 0.8,
                      }
                    : {
                        top: 26,
                        right: 25,
                      },
                ]}
              />
              <Text
                style={{
                  fontStyle: "normal",
                  fontFamily: FontFamily.InterRegular,
                  fontSize: 14,
                  textAlign: "center",
                  color: "#fff",
                  // left: 5,
                }}
              >
                By continuing, you agree to our {"\n "}
                <Text
                  style={styles.primaryText}
                  onPress={() => {
                    navigation.navigate("WebViewScreen", {
                      uri: "https://opennewsai.com/policy",
                      title: "Privacy Policy",
                    });
                  }}
                >
                  Privacy Policy{" "}
                </Text>
                and
                <Text
                  style={styles.primaryText}
                  onPress={() => {
                    navigation.navigate("WebViewScreen", {
                      uri: "https://opennewsai.com/terms",
                      title: "Terms of Service",
                    });
                  }}
                >
                  {" "}
                  Terms of use{" "}
                </Text>
              </Text>
              <Text style={styles.errorText}>
                {error4 ? error4 : " "} {error ? error : ""}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => signUpValidation()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Register</Text>
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
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
        {loading && (
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
