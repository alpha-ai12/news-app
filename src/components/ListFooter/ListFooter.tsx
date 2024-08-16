import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";

import { FontFamily } from "../../assets/fonts";

interface Props {
  onLoadMore: () => void;
  loading: boolean;
}
export const RenderFooter = (props: Props) => {
  return (
    <View
      style={{
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={props.onLoadMore}
        style={{
          padding: 10,
          backgroundColor: "#800000",
          borderRadius: 4,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            textAlign: "center",
            fontFamily: FontFamily.InterMedium,
          }}
        >
          Load More
        </Text>

        {props.loading ? (
          <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};
