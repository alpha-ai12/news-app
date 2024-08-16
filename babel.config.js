module.exports = function (api) {
  api.cache(true);
  // process.env.STAGE === 'prod' ? api.cache(true) : api.cache(false)

  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      // For some reason the built in setup for JSX transformation
      // in babel-preset-expo is not properly using the React 17
      // JSX tranform. This forces it, but who fucking knows if it will
      // break something else down the road
      // [
      //   "react-native-reanimated/plugin",
      //   {
      //     globals: ["__scanCodes"],
      //   },
      // ],
    ],
  };
};
