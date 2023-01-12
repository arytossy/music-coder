const path = require("path");
const webpack = require("webpack");
const IgnoreDynamicRequire = require("webpack-ignore-dynamic-require");

/** @type import("webpack").Configuration[] */
module.exports = [
  {
    name: "client",
    entry: "./src/client/index.tsx",
    mode: "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_module/,
          loader: "ts-loader"
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    resolve: { extensions: [".js", ".ts", ".tsx"] },
    output: {
      path: path.resolve(__dirname, "public"),
      publicPath: "/public",
      filename: "client.bundle.js"
    },
    devServer: {
      contentBase: path.resolve(__dirname, "public"),
      hotOnly: true,
      proxy: {
        "/api": {
          target: "http://localhost:3000"
        }
      }
    },
    plugins: [ new webpack.HotModuleReplacementPlugin() ]
  },
  {
    name: "server",
    target: "node",
    entry: "./src/server/index.ts",
    mode: "development",
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_module/,
          loader: "ts-loader"
        }
      ]
    },
    resolve:{
      extensions: [".js",".ts", ".tsx"],
      alias: {
        "@db": path.resolve(__dirname, "db")
      }
    },
    output: {
      path: __dirname,
      filename: "server.bundle.js"
    },
    plugins: [new IgnoreDynamicRequire()]
  }
];