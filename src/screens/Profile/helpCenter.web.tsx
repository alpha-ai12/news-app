import React, { useState } from "react";
import {
  Text,
  SafeAreaView,
  View,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";

import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { helpApi } from "../../store";

export const HelpCenter = ({ route, userData, dispatch }) => {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const width = useWindowDimensions().width;
  const onSubmit = async () => {
    setLoading(true);
    await dispatch(
      helpApi({
        userid: userData?._id,
        email: userData?.email,
        name: userData?.name,
        description,
        subject,
      }),
    );
    setLoading(false);
    Toast.show({
      type: "info",
      text1: "Thanks for contacting us. Expect a reply soon.",
      visibilityTime: 2500,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text
        style={{
          fontSize: 35,
          color: "black",
          fontFamily: FontFamily.InterMedium,
          width: "100%",
          letterSpacing: 0.5,
          marginBottom: 15,
        }}
      >
        Help Center
      </Text>
      <View
        style={{
          flex: 1,
          // padding: 10,
          width: width > 420 ? "100%" : width - 40,
          maxWidth: 550,
        }}
      >
        <Text style={[styles.inputlabel]}>Name</Text>
        <TextInput
          value={userData?.name}
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: 5,
            padding: 10,
            marginVertical: 10,
          }}
        />

        <Text style={styles.inputlabel}>Email</Text>
        <TextInput
          value={userData?.email}
          style={{
            backgroundColor: "#f2f2f2",
            borderRadius: 5,
            padding: 10,
            marginVertical: 10,
          }}
        />

        <Text style={styles.inputlabel}>Subject</Text>
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
        <Text style={styles.inputlabel}>Description</Text>
        <TextInput
          placeholder="Description"
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
            marginVertical: 10,
          }}
        />
        <TouchableOpacity
          style={{
            borderWidth: 1.5,
            padding: 5,
            backgroundColor: "#000",
            borderRadius: 5,
            borderColor: "#000",
            marginVertical: 10,
            justifyContent: "center",
            width: 200,
            alignSelf: "center",
          }}
          disabled={!(subject.length > 0 && description.length > 0)}
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
