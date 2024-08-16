import { useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { LinkedinIcon } from "react-share";

import { FontFamily } from "../../assets/fonts";
import { Link } from "../../assets/svg/link";
import { HoverLinkText } from "../hover_Text/hover_Text";
import { PolicyModel } from "../policyModal/policyModal";
export const Footer = () => {
  const [model, setModel] = useState(false);
  const [data, setData] = useState("policy");
  const width = useWindowDimensions().width;
  return (
    <View style={{ paddingVertical: 10, justifyContent: "center" }}>
      <View style={{ height: 1, width: "100%", backgroundColor: "#D3D3D3" }} />
      <View
        style={{
          width: "100%",
          maxWidth: 1440,
          alignSelf: "center",
          marginTop: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <View style={{ marginLeft: 25 }}>
          <Text style={{ marginBottom: 3 }}>Follow Us</Text>
          <View
            style={{
              flexDirection: "row",
              width: 80,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              style={{
                width: 24,
                height: 24,
                borderWidth: 1,
                borderRadius: 7,
                borderColor: "gray",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                Linking.openURL("https://www.facebook.com/opennewsai")
              }
            >
              <Image
                source={require("../../assets/images/facebook.png")}
                style={{
                  width: 16,
                  height: 16,
                  resizeMode: "contain",
                }}
              />
            </Pressable>
            <Pressable
              style={{
                width: 24,
                height: 24,
                borderWidth: 1,
                borderRadius: 7,
                borderColor: "gray",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                Linking.openURL("https://twitter.com/OpenNewAI62250")
              }
            >
              <Image
                source={require("../../assets/images/twitter.png")}
                style={{
                  width: 16,
                  height: 16,
                  resizeMode: "contain",
                }}
              />
            </Pressable>
            <Pressable
              style={{
                width: 24,
                height: 24,
                borderWidth: 1,
                borderRadius: 7,
                borderColor: "gray",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                Linking.openURL(
                  "https://www.linkedin.com/company/open-news-ai/",
                )
              }
            >
              <LinkedinIcon size={16} />
            </Pressable>
          </View>
        </View>
        <View
          style={[
            { alignSelf: "flex-end" },
            width < 551 && { marginLeft: 15, width: "100%", marginTop: 3 },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              flexWrap: "wrap",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <HoverLinkText
                text="Privacy Policy"
                onPress={() => {
                  setData("policy");
                  setModel(true);
                }}
                style={{ fontFamily: FontFamily.InterMedium }}
              />
              <Pressable
                onPress={() => {
                  setData("policy");
                  setModel(true);
                }}
              >
                <Link />
              </Pressable>
            </View>

            <Text style={{ paddingHorizontal: 10 }}>|</Text>

            <View style={{ flexDirection: "row" }}>
              <HoverLinkText
                text="Terms & Conditions"
                onPress={() => {
                  setData("terms");
                  setModel(true);
                }}
                style={{ fontFamily: FontFamily.InterMedium }}
              />
              <Pressable
                onPress={() => {
                  setData("terms");
                  setModel(true);
                }}
              >
                <Link />
              </Pressable>
            </View>

            <Text style={{ paddingHorizontal: 10 }}>|</Text>

            <View style={{ flexDirection: "row" }}>
              <HoverLinkText
                text="Contact Us"
                onPress={() => {
                  setData("contact");
                  setModel(true);
                }}
                style={{ fontFamily: FontFamily.InterMedium }}
              />
              <Pressable
                onPress={() => {
                  setData("contact");
                  setModel(true);
                }}
              >
                <Link />
              </Pressable>
            </View>
          </View>
          <Text
            style={{
              textAlign: width > 550 ? "right" : "left",
              paddingHorizontal: 10,
              alignSelf: width > 550 ? "flex-end" : "flex-start",
              marginTop: 5,
            }}
          >
            © 2023 Linkites Corporation. All Rights Reserved.
          </Text>
        </View>
      </View>
      <PolicyModel setModel={setModel} model={model} data={data} />
    </View>
  );
};
