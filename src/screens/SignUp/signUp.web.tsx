/* eslint-disable no-useless-escape */
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Text,
  SafeAreaView,
  ImageBackground,
  useWindowDimensions,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { CheckBox } from "react-native-web";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import Cookies from "universal-cookie";

import { checkPassword } from "./partial.tsx/passwordCheck";
import { isStrongPassword } from "./partial.tsx/strongPassword";
import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { Logo } from "../../components";
import { PolicyModel } from "../../components/policyModal/policyModal";
import { storeActions, userSignUp } from "../../store";
import { LoginType } from "../Login/login.web";
const renderFeature = ({ item, index }) => {
  return (
    <View
      key={`feat${index}`}
      style={{
        flexDirection: "row",
        minHeight: 34,
        marginVertical: 3,
        alignItems: "center",
      }}
    >
      <Image
        source={require("../../assets/icon/tick.png")}
        style={{ height: 15, width: 15 }}
      />
      <Text
        style={{
          fontSize: 16,
          color: "#404040",
          marginLeft: 10,
        }}
      >
        {item?.title}
      </Text>
    </View>
  );
};
export const SignUp = () => {
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<Dispatch<any>>();
  const [model, setModel] = useState(false);
  const [data, setData] = useState("policy");
  const ref1 = useRef<any>();
  const featureData = [
    {
      title: "Unlimited access to opennewsai.com",
    },
    {
      title: "Industry-focused newsletters, delivered to your inbox",
    },
    {
      title:
        "Access to My View, your personalized news feed for industry topics, companies, authors and law firms",
    },
    {
      title: "News at your fingertips with the Open News App",
    },
  ];

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [strength, setStrength] = useState("");
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
        const cookies = new Cookies();
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
        cookies.set("userInfo", { email: data.email, oAuth: data.oAuth });
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
        navigation.navigate("TopNews");
      }
      // console.log("error", result);
      // navigation.navigate("TopNews");
    }
  };
  const unload = () => {
    setEmailAddress("");
    setPassword("");
    setCheckboxState(false);
    setFirstName("");
    setLastName("");
    setError1(""); // Reset error states
    setError2("");
    setError3("");
    setError4("");
    setError5("");
    setError("");
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
                ? width > 1025
                  ? height
                  : height > 950
                    ? height
                    : "auto"
                : width > 1025
                  ? height > 600
                    ? height
                    : 600
                  : width > 600
                    ? 1025
                    : "auto",
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
                unload();
                navigation.navigate("TopNews");
              }}
            />
            <View
              style={[
                {
                  justifyContent: "center",
                  flex: width > 1025 && height > 620 ? 0.95 : 1,
                  flexDirection: width > 1025 ? "row" : "column",
                  alignItems: width > 1025 ? "center" : "flex-start",
                },
                // width > 1025 &&
                //   height > 620 && {
                //     marginTop: height > 720 ? -90 : -(height - 620),
                //   },
              ]}
            >
              <View
                style={[
                  {
                    alignItems: "center",
                    width: "100%",
                  },
                  width > 1025 && { flex: 1 },
                ]}
              >
                <View style={{ width: width > 1025 ? "80%" : "100%" }}>
                  <Text
                    style={{
                      fontSize: width > 475 ? 56 : 44,
                      color: "#B52813",
                      fontFamily: FontFamily.InterMedium,
                    }}
                  >
                    Open News AI
                  </Text>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#404040",
                      fontFamily: FontFamily.InterRegular,
                      // width: "80%",
                      marginTop: 10,
                    }}
                  >
                    Unlimited access to unbiased news
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#404040",
                      marginVertical: 10,
                    }}
                  >
                    Free registration on opennewsai.com gives you:
                  </Text>

                  {featureData.map((item, index) => {
                    return renderFeature({ item, index });
                  })}
                  {/* <View
                    style={{
                      height: 2,
                      backgroundColor: "#404040",

                      marginVertical: 20,
                    }}
                  />
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#404040",
                      }}
                    >
                      Are you a Open News AI legal customer?
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#404040",
                          fontFamily: FontFamily.InterRegular,
                        }}
                      >
                        {` Learn more`}
                      </Text>
                    </Text>
                  </View> */}
                </View>
              </View>
              <View
                style={[
                  {
                    alignItems: "center",
                    width: "100%",
                  },
                  width > 1025 && { flex: 1 },
                ]}
              >
                <View
                  style={{
                    width: width > 1025 ? "80%" : "100%",
                    backgroundColor: "#fff",
                    paddingVertical: 35,
                    borderRadius: 20,
                    shadowColor: "#d3d3d3",
                    shadowOffset: { width: 0.5, height: 0.5 },
                    marginTop: width > 1025 ? 0 : 10,
                  }}
                >
                  <View
                    style={{
                      width: "85%",
                      alignSelf: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: width > 475 ? "row" : "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ width: width > 475 ? "48%" : "100%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#404040",
                          }}
                        >
                          First name
                        </Text>
                        <TextInput
                          style={{
                            height: 42,
                            borderColor: "lightgray",
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 8,
                            fontSize: 16,
                            marginTop: 5,
                            backgroundColor: "#fff",
                          }}
                          value={firstName}
                          onChangeText={(text) => setFirstName(text)}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: "red",
                          }}
                        >
                          {error1 ? error1 : " "}
                        </Text>
                      </View>
                      <View style={{ width: width > 475 ? "48%" : "100%" }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#404040",
                          }}
                        >
                          Last name
                        </Text>
                        <TextInput
                          style={{
                            height: 42,
                            borderColor: "lightgray",
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 8,
                            fontSize: 16,
                            marginTop: 5,
                            backgroundColor: "#fff",
                          }}
                          value={lastName}
                          onChangeText={(text) => setLastName(text)}
                        />
                        <Text
                          style={{
                            fontSize: 12,
                            color: "red",
                          }}
                        >
                          {error2 ? error2 : " "}
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontSize: 18,
                        color: "#404040",
                        marginTop: 5,
                      }}
                    >
                      Email
                    </Text>
                    <TextInput
                      style={{
                        height: 42,
                        borderColor: "lightgray",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 8,
                        fontSize: 16,
                        marginTop: 5,
                        backgroundColor: "#fff",
                      }}
                      value={emailAddress}
                      onChangeText={(text) => setEmailAddress(text)}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: "red",
                      }}
                    >
                      {error3 ? error3 : " "}
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

                    <Pressable
                      style={{
                        height: 42,
                        borderColor: "lightgray",
                        borderWidth: 1,
                        borderRadius: 5,
                        marginTop: 5,
                        backgroundColor: "#fff",
                        flexDirection: "row",
                        justifyContent: "space-between",
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
                        value={password}
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
                      {error5 ? error5 : " "}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 20,
                        alignItems: "center",
                      }}
                    >
                      <CheckBox
                        color="#1e90ff"
                        value={checkboxState}
                        onChange={() => setCheckboxState(!checkboxState)}
                      />
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#404040",
                          marginLeft: 10,
                        }}
                      >
                        {"I agree to the "}
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#000",
                            textDecorationLine: "underline",
                            fontFamily: FontFamily.InterRegular,
                          }}
                          onPress={() => {
                            setModel(true);
                            setData("terms");
                          }}
                        >
                          Terms & Conditions
                        </Text>
                        {" and "}
                        <Text
                          style={{
                            fontSize: 16,
                            color: "#000",
                            fontFamily: FontFamily.InterRegular,
                            textDecorationLine: "underline",
                          }}
                          onPress={() => {
                            setModel(true);
                            setData("policy");
                          }}
                        >
                          Privacy Statement
                        </Text>
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "red",
                        marginTop: 2,
                        marginBottom: 10,
                      }}
                    >
                      {error4 ? error4 : " "}
                      {error ? error : ""}
                    </Text>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => signUpValidation()}
                      style={{
                        marginVertical: 5,
                        alignSelf: "center",
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <ActivityIndicator
                          style={{
                            backgroundColor: "#000",
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
                            paddingVertical: 8,
                            paddingHorizontal: 20,
                            borderRadius: 8,
                            textAlign: "center",
                            width: 120,
                          }}
                        >
                          Sign Up
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
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
      <PolicyModel setModel={setModel} model={model} data={data} />
    </SafeAreaView>
  );
};
