var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var BuildConstants = require("./build-constants");

module.exports = {
  entry: [ BuildConstants.ENTRY ],
  resolve: {
    extensions: [ "", ".js", ".jsx" ]
  },
  output: {
    path: BuildConstants.OUTPUT,
    filename: "bundle.js"
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: "eslint-loader", include: BuildConstants.ENTRY_FOLDER }
    ],
    loaders: [
      { test: /\.jsx?$/, loader: "babel?stage=1", include: BuildConstants.ENTRY_FOLDER },
      { test: /\.css$/, loaders: [ "style", "css" ] },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "[App]",
      template: BuildConstants.HTML_TEMPLATE
    })
  ]
};