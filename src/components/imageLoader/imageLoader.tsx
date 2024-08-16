import React, { useState } from "react";
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  ImageStyle,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
interface ImageLoaderProps {
  style: ImageStyle;
  source: ImageSourcePropType;
  borderRadius?: number;
  viewStyle: ViewStyle;
}
export const ImageLoader = (props: ImageLoaderProps) => {
  const { style, source, borderRadius, viewStyle } = props;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={[styles.container, viewStyle]}>
      {isLoading && (
        <ActivityIndicator style={styles.loader} size="small" color="#408ee0" />
      )}
      <Image
        borderRadius={borderRadius}
        source={source}
        style={[styles.image, style]}
        onLoad={() => setIsLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
