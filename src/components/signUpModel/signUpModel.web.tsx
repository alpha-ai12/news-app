import {
  Image,
  Text,
  Pressable,
  View,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";

import { FontFamily } from "../../assets/fonts";

interface ModelProp {
  model: boolean;
  setModel: any;
  navigation: any;
  keyword: any;
  setKeyWord: any;
}
export const SignUpModel = (props: ModelProp) => {
  const { model, setModel, setKeyWord, keyword } = props;
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      isVisible={model}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onBackdropPress={() => {
        setModel(false);
        setKeyWord(0);
      }}
    >
      <View
        style={[
          {
            backgroundColor: "#fff",
            overflow: "hidden",
            borderRadius: 20,
            maxWidth: 570,
          },
          width <= 675 && {
            marginHorizontal: 10,
            minWidth: "100%",
            aspectRatio: 0.927,
          },
          width > 675 && {
            aspectRatio: 1920 / 1080,
            width: "100%",
            minHeight: Math.min(height * 0.8, 550),
          },
        ]}
      >
        <Image
          source={require("../../assets/images/AIBackground.webp")}
          style={{
            width: "100%",
            height: "80%",
            position: "absolute",

            resizeMode: "stretch",
          }}
        />
        <View
          style={{
            backgroundColor: "#000",
            opacity: 0.1,
            width: "100%",
            height: "80%",
            position: "absolute",
          }}
        />
        <Pressable
          onPress={() => {
            setModel(false);
            setKeyWord(0);
          }}
          style={{
            marginTop: 10,
            marginRight: 10,
            position: "absolute",
            alignSelf: "flex-end",
            zIndex: 999,
          }}
        >
          <Image
            source={require("../../assets/icons/closeIcon.png")}
            style={{
              height: 20,
              width: 20,
              resizeMode: "contain",
              alignSelf: "flex-end",
            }}
          />
        </Pressable>
        <View style={{ flex: 8, paddingHorizontal: 25, paddingTop: 25 }}>
          <Text
            style={{
              fontSize: width > 675 ? 40 : 32,
              fontFamily: FontFamily.InterRegular,
              color: "#B52813",
            }}
          >
            {keyword === 2
              ? "Register or sign in now to save news on Open News AI."
              : keyword === 1
                ? "Register or sign in now to access More of Open News AI."
                : "Register or sign in now to access Open News AI My View."}
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontFamily: FontFamily.InterRegular,
              color: "#404040",
              marginTop: 15,
            }}
          >
            Customize your news feed by selecting topics of interest.
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            justifyContent: "space-evenly",
            alignItems: "center",
            minHeight: 100,
            backgroundColor: "#fff",
          }}
        >
          <Text
            style={{
              color: "#666666",
              fontSize: 18,
              fontFamily: FontFamily.InterBold,
              borderColor: "lightgray",
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderWidth: 1,
              borderRadius: 8,
              textAlign: "center",
              marginHorizontal: 10,
              // marginRight: 10,
              width: width > 675 ? 300 : (300 * width) / 675,
            }}
            onPress={() => {
              setModel(false);
              props.navigation.navigate("login", { back: true });
            }}
          >
            Log In
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: FontFamily.InterBold,
              borderColor: "lightgray",
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderWidth: 1,
              borderRadius: 8,
              textAlign: "center",
              marginHorizontal: 10,
              backgroundColor: "#000",
              // marginRight: 10,
              width: width > 675 ? 300 : (300 * width) / 675,
            }}
            onPress={() => {
              setModel(false);
              props.navigation.navigate("signUp");
            }}
          >
            Register
          </Text>
        </View>
      </View>
    </Modal>
  );
};
