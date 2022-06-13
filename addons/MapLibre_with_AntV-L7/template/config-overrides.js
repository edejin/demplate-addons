const path = require('path');
const {addBabelPlugin} = require('customize-cra');
const CopyWebpackPlugin = require("copy-webpack-plugin");

const mapFontsSource = "node_modules/map-fonts";
const mapFontsPath = "map-styles/fonts";

module.exports = function override(config, env) {
  let isDev = env === 'development';

  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@': path.resolve(__dirname, 'src'),
    },
  };
  let loaders = config.resolve
  loaders.fallback = {
    "fs": false,
    "tls": false,
    "net": false,
    "http": false, // require.resolve("stream-http"),
    "https": false,
    "zlib": false, // require.resolve("browserify-zlib") ,
    "path": require.resolve("path-browserify"),
    "stream": false, // require.resolve("stream-browserify"),
    "util": false, // require.resolve("util/"),
    "crypto": false, // require.resolve("crypto-browserify")
  }

  if (isDev) {
    addBabelPlugin([
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: true,
        minify: false
      },
    ])(config);
  }

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{
        from: mapFontsSource,
        to: mapFontsPath
      }]
    })
  );

  return config;
};
