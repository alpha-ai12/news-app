/* eslint-disable no-useless-escape */
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

import { FontFamily } from "../../assets/fonts";
import { contactApi, helpApi } from "../../store";

export const HelpCenter = ({ route, userData, dispatch }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [subError, setSubError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    return () => {
      setError(false);
      setNameError(false);
      setSubError(false);
    };
  }, [isFocused]);

  const onSubmit = async () => {
    setLoading(true);
    setError(false);
    setNameError(false);
    setSubError(false);
    if (userData?.name) {
      if (subject.length > 0 && description.length > 0) {
        await dispatch(
          helpApi({
            userid: userData?._id,
            email: userData?.email,
            name: userData?.name,
            description,
            subject,
          }),
        );
        Toast.show({
          type: "info",
          text1: "Thanks for contacting us. Expect a reply soon.",
          visibilityTime: 2500,
        });
      } else {
        setSubError(true);
      }
    } else {
      if (description.length === 0) {
        setSubError(true);
      }
      if (name.length === 0) {
        setNameError(true);
      }
      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        setError(true);
      }
      if (
        description.length > 0 &&
        name.length > 0 &&
        email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        await dispatch(
          contactApi({
            email,
            name,
            message: subject,
          }),
        );
        Toast.show({
          type: "info",
          text1: "Thanks for contacting us. Expect a reply soon.",
          visibilityTime: 2500,
        });
      }
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 5 }}>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FontFamily.InterMedium,
            // marginBottom: 10,
            textAlign: "left",
          }}
        >
          Name
        </Text>
        <TextInput
          value={userData?.name ?? name}
          editable={!userData?.name}
          onChangeText={(text: any) => setName(text)}
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
          }}
        />
        <Text
          style={{
            fontSize: 12,
            color: "red",
            marginLeft: 2,
            marginVertical: 7,
          }}
        >
          {nameError ? "Please enter your name" : " "}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: FontFamily.InterMedium,
            // marginBottom: 10,
            textAlign: "left",
          }}
        >
          Email
        </Text>
        <TextInput
          value={userData?.email ?? email}
          editable={!userData?.email}
          onChangeText={(text: any) => setEmail(text)}
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
          }}
        />
        <Text
          style={{
            fontSize: 12,
            color: "red",
            marginLeft: 2,
            marginVertical: 7,
          }}
        >
          {error ? "Enter valid email address" : " "}
        </Text>
        {userData?.name && (
          <>
            <Text
              style={{
                fontSize: 16,
                fontFamily: FontFamily.InterMedium,
                // marginBottom: 10,
                textAlign: "left",
              }}
            >
              Subject
            </Text>
            <TextInput
              placeholder="Subject"
              value={subject}
              onChangeText={(text: any) => setSubject(text)}
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#c2c2c2",
                borderRadius: 5,
                padding: 10,
                marginVertical: 10,
              }}
            />
          </>
        )}
        <Text
          style={{
            fontSize: 16,
            fontFamily: FontFamily.InterMedium,
            // marginBottom: 10,
            textAlign: "left",
          }}
        >
          {userData?.name ? "Description" : "Message"}
        </Text>
        <TextInput
          placeholder={userData?.name ? "Description" : "Message"}
          value={description}
          onChangeText={(text: any) => setDescription(text)}
          multiline
          numberOfLines={5}
          style={{
            backgroundColor: "#fff",
            borderWidth: 1,
            borderColor: "#c2c2c2",
            borderRadius: 5,
            padding: 10,
            marginTop: 10,
          }}
        />
        <Text
          style={{
            fontSize: 12,
            color: "red",
            marginLeft: 2,
            marginVertical: 7,
          }}
        >
          {subError
            ? userData.name
              ? "Please enter the necessary subject and description"
              : "Please enter the necessary message"
            : " "}
        </Text>
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            padding: 8,
            backgroundColor: "#007AFF",
            borderRadius: 8,
            borderColor: "#007AFF",
            marginVertical: 10,
            justifyContent: "center",
            width: 200,
            alignSelf: "center",
          }}
          // disabled={!(subject.length > 0 && description.length > 0)}
          onPress={() => {
            onSubmit();
          }}
        >
          {loading ? (
            <ActivityIndicator
              style={{
                alignSelf: "center",
              }}
              color="#fff"
              size="small"
            />
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontFamily: FontFamily.InterMedium,
                alignSelf: "center",
                color: "#fff",
              }}
            >
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
