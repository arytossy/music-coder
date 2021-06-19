const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./client/src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "client/dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "client"),
    port: 3333,
    publicPath: "http://localhost:3333/dist/",
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000"
      }
    }
  },
  plugins: [ new webpack.HotModuleReplacementPlugin() ]
};