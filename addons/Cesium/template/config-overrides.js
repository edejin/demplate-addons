const path = require('path');
const {addBabelPlugin} = require('customize-cra');
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const WebpackObfuscator = require('webpack-obfuscator');

const cesiumSource = "node_modules/cesium/Source";
const cesiumPath = "cesium";

module.exports = function override(config, env) {
  const isDev = env === 'development';
  const prod = env === "production";

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
  } else {
    config.plugins.push(
      new WebpackObfuscator ({
      }, [
        // 'excluded_bundle_name.js'
      ])
    )
  }

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(
          cesiumSource,
          `../Build/Cesium${prod ? "" : "Unminified"}`
        ),
        to: cesiumPath
      }]
    }),
    new HtmlWebpackTagsPlugin({
      append: false,
      tags: [
        "cesium/Widgets/widgets.css",
        path.join(cesiumPath, "Cesium.js")
      ]
    }),
    new webpack.DefinePlugin({
      CESIUM_BASE_URL: JSON.stringify(cesiumPath)
    })
  );

  config.externals = {
    ...config.externals,
    cesium: "Cesium"
  };

  return config;
};
