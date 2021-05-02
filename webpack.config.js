const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";
const mode = isProduction ? "production" : "development";

module.exports = [
  // メインプロセス
  {
    name: "main",
    mode,
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
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.node$/,
          loader: "node-loader",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
  },
  // レンダラープロセス
  {
    name: "renderer",
    mode,
    target: "electron-renderer",
    entry: path.join(__dirname, "src/renderer/index.tsx"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "renderer.js",
    },
    devtool: isProduction ? undefined : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/template/index.html",
      }),
    ],
  },
  // preload
  {
    name: "preload",
    mode,
    target: "electron-preload",
    entry: path.join(__dirname, "src/common/preload.ts"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "preload.js",
    },
    devtool: isProduction ? undefined : "eval-source-map",
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ["ts"],
    },
  },
];
