const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "/public/index.html"),
  filename: "./index.html"
});


module.exports = (env, options) => {
  return {
    entry: path.join(__dirname, "/src/index.js"),
    output: {
      path: path.join(__dirname, "./src/dist"),
      filename: "slazzer-image-editor.[chunkhash].js",
      chunkFilename: 'slazzer-image-editor.[name].[chunkhash].js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: "babel-loader",
          exclude: /(node_modules|bower_components)\/(?!pretty-bytes\/).*/,
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
      extensions: [".js", ".jsx"]
    },
    devtool: options.mode === 'production' ? 'none' : "sourcemap",
    devServer: {
      port: 3005
    }
  }
};