import React from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

export const WebViewScreen = ({ route, title }) => {
  const { uri } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <WebView style={{ width: "100%" }} source={{ uri }} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
