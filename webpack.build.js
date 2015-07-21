var webpack = require("webpack");
var merge = require("webpack-merge");

var common = require("./webpack.common");
var mergeCommon = merge.bind(null, common);
var BuildConstants = require("./build-constants");

module.exports = mergeCommon({
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: [ "babel?stage=1" ], exclude: [ BuildConstants.NODE_MODULES ] }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});