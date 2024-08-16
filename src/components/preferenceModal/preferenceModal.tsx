import { useEffect, useState } from "react";
import {
  Image,
  Text,
  Pressable,
  View,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Modal from "react-native-modal";

import RenderBadgeItem from "./renderitem";
import { FontFamily } from "../../assets/fonts";
import { changePreferences, storeActions } from "../../store";
interface ModelProp {
  model: boolean;
  setModel: any;
  data: any;
  dispatch: any;
  userData: any;
}
export const filterValues = [
  // { label: "All", value: "all" },
  { label: "Business", value: "business" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Health", value: "health" },
  { label: "Politics", value: "politics" },
  { label: "Science", value: "science" },
  { label: "Sports", value: "sports" },
  { label: "Technology", value: "technology" },
  { label: "World", value: "world" },
];

export const countryValues = [
  // { label: "All", value: "all" },
  { label: "United States of America", value: "united states of america" },
  { label: "India", value: "india" },
  { label: "Germany", value: "germany" },
  { label: "Canada", value: "canada" },
  { label: "South Africa", value: "south africa" },
  { label: "Australia", value: "australia" },
  { label: "United Kingdom", value: "united kingdom" },
  { label: "Singapore", value: "singapore" },
];
export const Preferences = (props: ModelProp) => {
  const { model, setModel, data, userData, dispatch } = props;
  const width = useWindowDimensions().width;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setValue(data.preferredCategory);
    setCountryValue(data.preferredCountry);
  }, [data]);

  const savePreference = async () => {
    setLoading(true);
    await dispatch(
      changePreferences({
        userid: userData?._id,
        category: value,
        country: countryValue,
      }),
    );
    const newData = {
      ...userData,
      preferredCategory: value,
      preferredCountry: countryValue,
    };
    dispatch(
      storeActions.setPreferences({
        preferredCategory: newData.preferredCategory,
        preferredCountry: newData.preferredCountry,
      }),
    );
    // const cookies = new Cookies();
    // cookies.set("userInfo", newData);
    dispatch(storeActions.setUserData(newData));
    setLoading(false);
    setTimeout(() => {
      setModel(false);
    }, 200);
  };
  return (
    <Modal
      isVisible={model}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      onBackdropPress={() => {
        if (!open && !countryOpen) {
          setModel(false);
          setValue(data.preferredCategory);
          setCountryValue(data.preferredCountry);
        } else {
          countryOpen && setCountryOpen(false);
          open && setOpen(false);
        }
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          countryOpen && setCountryOpen(false);
          open && setOpen(false);
        }}
      >
        <View
          style={[
            {
              backgroundColor: "#fff",
              borderRadius: 20,
              maxWidth: 570,
              minHeight: "auto",
              width: "100%",
            },
            width < 675 && { marginHorizontal: 10, minWidth: "100%" },
          ]}
        >
          <Pressable
            onPress={() => {
              setModel(false);
              setValue(data.preferredCategory);
              setCountryValue(data.preferredCountry);
            }}
            style={{
              marginTop: 10,
              marginRight: 10,
              position: "absolute",
              alignSelf: "flex-end",
              zIndex: 9999,
              paddingRight: 10,
            }}
          >
            <Image
              source={require("../../assets/icons/closeIcon.png")}
              style={{
                height: 24,
                width: 24,
                resizeMode: "contain",
                alignSelf: "flex-end",
              }}
            />
          </Pressable>
          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text
              style={{
                fontFamily: FontFamily.InterMedium,
                fontSize: 20,
                alignSelf: "center",
              }}
            >
              My Preferences
            </Text>

            <Text
              style={{
                fontFamily: FontFamily.InterMedium,
                fontSize: 18,
                marginTop: 5,
              }}
            >
              Category
            </Text>
            <DropDownPicker
              open={open}
              value={value}
              items={filterValues}
              setOpen={setOpen}
              setValue={setValue}
              multiple
              max={3}
              min={0}
              mode="BADGE"
              style={{ marginTop: 10 }}
              badgeDotColors="transparent"
              badgeTextStyle={{ marginLeft: 8 }}
              renderBadgeItem={(props) => <RenderBadgeItem {...props} />}
            />
            <Text
              style={{
                fontFamily: FontFamily.InterMedium,
                fontSize: 18,
                marginTop: 10,
              }}
            >
              Country
            </Text>
            <DropDownPicker
              open={countryOpen}
              value={countryValue}
              items={countryValues}
              setOpen={setCountryOpen}
              setValue={setCountryValue}
              multiple
              max={3}
              min={0}
              mode="BADGE"
              zIndex={2000}
              zIndexInverse={2000}
              style={{ marginTop: 10 }}
              badgeTextStyle={{ marginLeft: 8 }}
              badgeDotColors="transparent"
              renderBadgeItem={(props) => <RenderBadgeItem {...props} />}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => savePreference()}
              style={{ marginVertical: 15 }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator
                  style={{
                    backgroundColor: "#000",
                    paddingVertical: 7,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    width: 170,
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
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 8,
                    textAlign: "center",

                    alignSelf: "center",
                  }}
                >
                  Save Preferences
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
