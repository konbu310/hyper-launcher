const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsConfigWebpackPlugin = require("ts-config-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = [
  // メインプロセス
  {
    name: "main",
    mode: isProduction ? "production" : "development",
    target: "electron-main",
    entry: path.join(__dirname, "src/main/main.ts"),
    node: {
      __dirname: false,
      __filename: false,
    },
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "main.js",
    },
    devtool: isProduction ? void 0 : "source-map",
    plugins: [new TsConfigWebpackPlugin()],
  },
  // レンダラープロセス
  {
    name: "renderer",
    mode: isProduction ? "production" : "development",
    target: "web",
    entry: path.join(__dirname, "src/renderer/index.tsx"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "renderer.js",
    },
    devtool: isProduction ? void 0 : "source-map",
    module: {
      rules: [
        {
          test: /.tsx?$/,
          use: {
            loader: "linaria/loader",
            options: {
              sourceMap: !isProduction,
            },
          },
        },
        {
          test: /.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: !isProduction,
              },
            },
            { loader: "css-loader" },
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/template/index.html",
      }),
      new TsConfigWebpackPlugin(),
    ],
  },
];
