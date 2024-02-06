import packager from "@electron/packager";
import fs from "node:fs/promises";

await fs.writeFile(
  "./dist/package.json",
  JSON.stringify({ main: "./main/main.js" }),
  { flag: "wx" },
);

packager({
  appname: "Hyper Launcher",
  arch: ["x64", "arm64"],
  platform: "darwin",
  asar: false,
  dir: "./dist",
  icon: "./assets/Hyper Launcher.icns",
  out: "./build",
  overwrite: true,
})
  .then(() => {
    console.log("done😎");
  })
  .catch((err) => {
    console.error(err);
  });
