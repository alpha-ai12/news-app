import "react-native-gesture-handler";
import { registerRootComponent } from "expo";

import { App } from "./App";
// import App from "./src_magnifi/navigation/primary-navigator"; // old app source

// import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
