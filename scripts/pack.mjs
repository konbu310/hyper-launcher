import packager from "electron-packager";

packager({
  arch: ["x64", "arm64"],
  asar: true,
  dir: ".",
  icon: "./assets/Hyper Launcher.icns",
  out: "./build",
  overwrite: true,
  platform: "darwin",
})
  .then(() => {
    console.log("done😎");
  })
  .catch((err) => {
    console.error(err);
  });
