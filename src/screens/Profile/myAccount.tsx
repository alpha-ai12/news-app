import React from "react";
import { Text, View, Pressable } from "react-native";

import { styles } from "./styles";
import { FontFamily } from "../../assets/fonts";
import { Edit } from "../../assets/svg/edit";
import { HoverLinkText } from "../../components";

const UserDetailsForm = ({ userData, toggleEditable, preferences }) => {
  return (
    <View>
      <View style={styles.field}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{userData?.name}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>Email address</Text>
        <Text style={styles.value}>{userData.email}</Text>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#c2c2c2",
          height: 1,
        }}
      />
      <View style={styles.textInputFields}>
        <View
          style={{
            marginTop: 11,
            marginBottom: 18,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 21,
              fontFamily: FontFamily.InterMedium,
              textAlign: "left",
              textAlignVertical: "bottom",
            }}
          >
            Preference
          </Text>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 10,
            }}
            onPress={() => {
              toggleEditable();
            }}
          >
            <Edit width={18} height={18} />
            <HoverLinkText
              text="Edit"
              style={{
                color: "#24a0ed",
                fontSize: 15,
                marginLeft: 3,
                marginTop: 4,
              }}
              onPress={() => {
                toggleEditable();
              }}
            />
          </Pressable>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <Text style={[styles.value, { textTransform: "capitalize" }]}>
            {preferences.preferredCategory.length > 0
              ? preferences.preferredCategory.join(", ")
              : "No Preferred Category"}
          </Text>
        </View>
        <View style={styles.field}>
          <Text style={styles.label}>Country</Text>
          <Text style={[styles.value, { textTransform: "capitalize" }]}>
            {preferences.preferredCountry.length > 0
              ? preferences.preferredCountry.join(", ")
              : "No Preferred Country"}
          </Text>
        </View>

        {/* <Pressable
          onPress={() => {
            toggleEditable();
          }}
          style={[
            {
              borderWidth: 1.5,
              padding: 5,
              backgroundColor: "#000",
              borderRadius: 5,
              borderColor: "#000",
              marginVertical: 10,
              justifyContent: "center",
              maxWidth: 200,
              alignSelf: "center",
            },
          ]}
        >
          <Text
            style={{
              fontSize: 16,
            fontFamily: FontFamily.InterMedium,
              textAlign: "left",
              alignSelf: "center",
              color: "#fff",
            }}
          >
            Edit preference
          </Text>
        </Pressable> */}
      </View>
    </View>
  );
};
export const MyAccount = ({ userData, preferences, setModel }) => {
  const toggleEditable = async () => {
    setModel(true);
  };

  return (
    <View
      style={{
        width: "100%",
        marginTop: 20,
      }}
    >
      {/* <Text
        style={{
          fontSize: 35,
          color: "black",
         fontFamily: FontFamily.InterMedium,
          paddingVertical: 10,
          width: "100%",
          letterSpacing: 0.5,
          // marginVertical: 10,
          marginBottom: 15,
        }}
      >
        My Account
      </Text> */}
      <UserDetailsForm
        userData={userData}
        toggleEditable={toggleEditable}
        preferences={preferences}
      />
    </View>
  );
};
