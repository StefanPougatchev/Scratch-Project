const path = require("path");

module.exports = {
  //main point of entry for webpack
  entry: "./client/index.js",
  //Production or Development, production gets minified/uglified
  mode: process.env.NODE_ENV,
  //Where the bundle file is placed
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        //what file extension to look for
        test: /\.js$/,
        //What dir to skip
        exclude: /node_modules/,
        use: {
          //what loader used to make these file type browser ready
          loader: "babel-loader",
        },
      },
      {
        test: /.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    //where to find the bundle
    publicPath: "/build/",
  },
  resolve: {
    //allows us to leave file extension unspecified
    extensions: [".js", ".jsx"],
  },
};
