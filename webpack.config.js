const createExpoWebpackConfigAsync = require("@expo/webpack-config");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.optimization.usedExports = true;
  if (env.mode === "production") {
    config.plugins.push(
      new CompressionPlugin({
        filename: "[path][base].gz",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    );
  }
  return config;
};
