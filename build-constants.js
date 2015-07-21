var path = require("path");

module.exports = {
  ENTRY: path.resolve(__dirname, "src", "main.js"),
  ENTRY_FOLDER: path.resolve(__dirname, "src"),
  OUTPUT: path.resolve(__dirname, "build"),
  NODE_MODULES: path.resolve(__dirname, "node_modules"),
  HTML_TEMPLATE: path.resolve(__dirname, "index-template.html")
};