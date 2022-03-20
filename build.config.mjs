import packager from "electron-packager";
import { rebuild } from "electron-rebuild";

packager({
  arch: "x64",
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
