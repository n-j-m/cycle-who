var webpack = require("webpack");
var merge = require("webpack-merge");
var common = require("./webpack.common");
var mergeCommon = merge.bind(null, common);

var BuildConstants = require("./build-constants");

module.exports = mergeCommon({
  devTool: "eval",
  entry: [
    "webpack-dev-server/client?http://localhost:3000"
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: [ "babel?stage=1" ], include: BuildConstants.ENTRY_FOLDER }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ],
  devServer: {
    stats: {
      progress: true,
      colors: true
    },
    port: 3000,
    contentBase: BuildConstants.OUTPUT,
    historyApiFallback: true
  }
});