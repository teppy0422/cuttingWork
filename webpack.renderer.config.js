const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const rules = require("./webpack.rules");

rules.push({
  test: /\.css$/,
  use: [{ loader: "style-loader" }, { loader: "css-loader" }],
});

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src/index.html"), // 元のhtmlをテンプレートとして使う
      filename: "index.html", // 出力ファイル名
    }),
  ],
  devServer: {
    port:3000,
    hot: true, // 👈 Hot Module Replacement（HMR）を有効に
    liveReload: true, // 👈 liveReload も保険で有効に
    static: {
      directory: path.join(__dirname, "src"), // ← 念のため static も追加
      watch:true,
    },
    watchFiles: ['src/**/*.html'], // 🔥 ここを追加
    watchOptions: {
      ignored: /node_modules/,
    },
    output: {
      publicPath: "./", // 相対パスにすることで動作安定化
    },
  },
};
