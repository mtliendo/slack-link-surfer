const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "slack-link-surfer.js",
    library: "slackLinkSurfer",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  }
};
