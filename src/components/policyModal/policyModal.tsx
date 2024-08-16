/* eslint-disable no-useless-escape */
import { useState } from "react";
import {
  Image,
  Text,
  Pressable,
  View,
  TextInput,
  ScrollView,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import RenderHTML from "react-native-render-html";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import { FontFamily } from "../../assets/fonts";
import { contactApi } from "../../store";

interface PolicyProp {
  model: boolean;
  setModel: any;
  data: any;
}

export const PolicyModel = (props: PolicyProp) => {
  const { model, setModel, data } = props;
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch<Dispatch<any>>();
  const validation = async () => {
    setError(false);
    if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setLoading(true);
      await dispatch(
        contactApi({
          email,
          name,
          message,
        }),
      );
      setLoading(false);
      setTimeout(() => {
        setModel(false);
        Toast.show({
          type: "info",
          text1: "Thanks for contacting us. Expect a reply soon.",
          visibilityTime: 2500,
        });
      }, 300);
    } else {
      setError(true);
    }
  };
  return (
    <Modal
      isVisible={model}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onBackdropPress={() => setModel(false)}
    >
      <View
        style={{
          width: width > 675 ? "80%" : "100%",
          backgroundColor: "#fff",
          paddingHorizontal: 20,
          borderRadius: 20,
          maxWidth: data === "contact" ? 500 : 700,
          maxHeight: height * 0.9,
        }}
      >
        <Pressable
          onPress={() => setModel(false)}
          style={{
            marginTop: 20,
            position: "absolute",
            zIndex: 999,
            alignSelf: "flex-end",
          }}
        >
          <Image
            source={require("../../assets/icons/closeIcon.png")}
            style={{
              height: 25,
              width: 25,
              resizeMode: "contain",
            }}
          />
        </Pressable>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingBottom: 20, paddingTop: 20 }}
        >
          <RenderHTML
            contentWidth={width}
            source={{
              html:
                data === "policy"
                  ? `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Privacy Policy - Open News AI</title>
            </head>
            <body>
                <header>
                    <h1>Privacy Policy</h1>
                    <p>Last Updated: 09-15-2023</p>
                </header>
            
                <section>
                    <h2>1. Introduction</h2>
                    <p>Welcome to Open News AI. This Privacy Policy is designed to help you understand how we collect, use, and safeguard your personal information. By using our services, you consent to the practices described in this policy.</p>
                </section>
            
                <section>
                    <h2>2. Information We Collect</h2>
                    <p>We may collect the following types of information when you use our website and services:</p>
                    <ul>
                        <li>Personal Information: Name ,Email and Profile Picture</li>
                        <li>Usage Information: IP address, browser type and search data</li>
                    </ul>
                </section>
            
                <section>
                    <h2>3. How We Use Your Information</h2>
                    <p>We may use your information for the following purposes:</p>
                    <ul>
                        <li>Provide and improve our services</li>
                        <li>Communicate with you</li>
                        <li>Protect against fraud and ensure the security of our website</li>
                    </ul>
                </section>
            
                <section>
                    <h2>4. Cookies and Similar Technologies</h2>
                    <p>We may use cookies and similar technologies to collect information and improve our services. You can manage your cookie preferences through your browser settings.</p>
                </section>
            
                <section>
                    <h2>5. Information Sharing</h2>
                    <p>We may share your information with third parties in the following circumstances:</p>
                    <ul>
                        <li>With your consent</li>
                        <li>For legal reasons</li>
                        <li>With service providers and partners</li>
                    </ul>
                </section>
            
                <section>
                    <h2>6. Your Choices</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access, correct, or delete your personal information</li>
                        <li>Opt out of marketing communications</li>
                    </ul>
                </section>
            
                <section>
                    <h2>7. Security</h2>
                    <p>We take measures to protect your information, but no data transmission over the internet is entirely secure.</p>
                </section>
            
                <section>
                    <h2>8. Changes to this Privacy Policy</h2>
                    <p>We may update this Privacy Policy as needed. The latest version will be posted on our website with a revised "Last Updated" date.</p>
                </section>
            
                <section>
                    <h2>9. Contact Us</h2>
                    <p>If you have any questions or concerns about this Privacy Policy, please contact us at services@opennewsai.com.</p>
                </section>
            
                <footer>
                    <p>Copyright © 2023 Open News AI. All rights reserved.</p>
                </footer>
            </body>
            </html>
            `
                  : data === "terms"
                    ? `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Terms & Conditions - Open News AI</title>
            </head>
            <body>
                <header>
                    <h1>Terms & Conditions</h1>
                    <p>Last Updated: 09-15-2023</p>
                </header>
            
                <section>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing or using the services provided by Open News AI, you agree to comply with and be bound by these Terms & Conditions.</p>
                </section>
            
                <section>
                    <h2>2. Use of Services</h2>
                    <p>You agree to use the services provided by Open News AI only for lawful purposes and in accordance with these Terms & Conditions.</p>
                </section>
            
                <section>
                    <h2>3. Intellectual Property</h2>
                    <p>Open News AI and its content, including but not limited to text, graphics, logos, and software, are protected by intellectual property laws. You may not use, reproduce, or distribute our content without permission.</p>
                </section>
            
                <section>
                    <h2>4. User Accounts</h2>
                    <p>If you create an account with Open News AI, you are responsible for maintaining the confidentiality of your account information and agree to notify us of any unauthorized access or use of your account.</p>
                </section>
            
                <section>
                    <h2>5. Privacy</h2>
                    <p>Your use of our services is also governed by our Privacy Policy, which can be found [link to Privacy Policy].</p>
                </section>
            
                <section>
                    <h2>6. Limitation of Liability</h2>
                    <p>Open News AI is not liable for any damages or losses incurred as a result of using our services. We do not guarantee the accuracy or availability of our content.</p>
                </section>
            
                <section>
                    <h2>7. Changes to Terms & Conditions</h2>
                    <p>We may update these Terms & Conditions as needed. The latest version will be posted on our website with a revised "Last Updated" date.</p>
                </section>
            
                <section>
                    <h2>8. Contact Us</h2>
                    <p>If you have any questions or concerns about these Terms & Conditions, please contact us at services@opennewsai.com.</p>
                </section>
            
                <footer>
                    <p>Copyright © 2023 Open News AI. All rights reserved.</p>
                </footer>
            </body>
            </html>
            `
                    : `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <title>Contact Us - Open News AI</title>
            </head>
            <body>
                <header>
                    <h1>Contact Us</h1>
                </header>
                <section>
                    <p>If you have any questions or feedback, please don't hesitate to get in touch with us:</p>
                </section>
 
            </body>
            </html>
            `,
            }}
            defaultTextProps={{
              selectable: true,
            }}
            enableExperimentalMarginCollapsing
          />
          {data === "contact" && (
            <View>
              <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                placeholderTextColor="gray"
                style={{
                  borderColor: "#D3D3D3",
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 8,
                  fontSize: 16,
                  marginTop: 15,
                  backgroundColor: "#fff",
                }}
              />

              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholderTextColor="gray"
                style={{
                  borderColor: "#D3D3D3",
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 8,
                  fontSize: 16,
                  marginTop: 15,
                  backgroundColor: "#fff",
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "red",
                  marginLeft: 2,
                }}
              >
                {error ? "Enter valid email address" : " "}
              </Text>
              <TextInput
                placeholder="Message"
                multiline
                numberOfLines={5}
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholderTextColor="gray"
                style={{
                  borderColor: "#D3D3D3",
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: 8,
                  fontSize: 16,
                  marginTop: 3,
                  backgroundColor: "#fff",
                }}
              />

              <Pressable
                style={{
                  backgroundColor: "#000",
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                  marginVertical: 13,
                  width: 120,
                  alignSelf: "center",
                }}
                disabled={!(message.length > 0 && name.length > 0)}
                onPress={() => {
                  validation();
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
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    Submit
                  </Text>
                )}
              </Pressable>
              <Text>Copyright © 2023 Open News AI. All rights reserved.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
};
