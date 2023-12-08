import packager from "electron-packager";

packager({
  appname: "Hyper Launcher",
  arch: ["x64", "arm64"],
  platform: "darwin",
  asar: false,
  dir: ".",
  icon: "./assets/Hyper Launcher.icns",
  out: "./build",
  overwrite: true,
  ignore: [
    ".idea",
    ".gitignore",
    ".gitmodules",
    "build",
    "docs",
    "node_modules",
    "scripts",
    "src",
    "tsconfig.json",
    "README.md",
    "vite.config.ts",
    "GetAppIcon",
  ],
})
  .then(() => {
    console.log("done😎");
  })
  .catch((err) => {
    console.error(err);
  });
