const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const useThreadLoader = ({
  name,
  workers = 2,
  workerParallelJobs = 80,
}: {
  name: string;
  workers?: number;
  workerParallelJobs?: number;
}) => ({
  loader: "thread-loader",
  options: {
    name,
    workers,
    workerParallelJobs,
    workerNodeArgs: ["--max-old-space-size=512"],
  },
});

const useEsbuildLoader = ({ loader }: { loader: "ts" | "tsx" }) => ({
  loader: "esbuild-loader",
  options: {
    loader,
    minify: isProduction,
    target: "es2020",
  },
});

const common = {
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "hidden-nosources-source-map" : "eval-source-map",
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

module.exports = [
  // Main
  {
    ...common,
    name: "main",
    context: __dirname,
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
    module: {
      rules: [
        {
          test: /\.node$/,
          loader: "node-loader",
        },
        {
          test: /.ts$/,
          exclude: /node_modules/,
          use: [
            useThreadLoader({ name: "main-ts-pool" }),
            useEsbuildLoader({ loader: "ts" }),
          ],
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "dist/main.js",
          "dist/main.js.map",
          "dist/*.node",
        ],
      }),
    ],
  },
  // Renderer
  {
    ...common,
    name: "renderer",
    context: __dirname,
    target: "electron-renderer",
    entry: path.join(__dirname, "src/renderer/index.tsx"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "renderer.js",
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          exclude: /node_modules/,
          use: [
            useThreadLoader({ name: "renderer-ts-pool" }),
            useEsbuildLoader({ loader: "ts" }),
          ],
        },
        {
          test: /.tsx$/,
          exclude: /node_modules/,
          use: [
            useThreadLoader({ name: "renderer-tsx-pool" }),
            useEsbuildLoader({ loader: "tsx" }),
          ],
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "dist/renderer.js",
          "dist/renderer.js.map",
          "dist/index.html",
        ],
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/template/index.html",
      }),
    ],
  },
  // Preload
  {
    ...common,
    name: "preload",
    target: "electron-preload",
    entry: path.join(__dirname, "src/common/preload.ts"),
    output: {
      path: path.join(__dirname, "dist/"),
      filename: "preload.js",
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          exclude: /node_modules/,
          use: [
            useThreadLoader({ name: "preload-ts-pool" }),
            useEsbuildLoader({ loader: "ts" }),
          ],
        },
      ],
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          "dist/preload.js",
          "dist/preload.js.map",
        ],
      }),
    ],
  },
];
