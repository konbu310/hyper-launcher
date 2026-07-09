import packager from "@electron/packager";
import fs from "node:fs/promises";
import { parseArgs } from "node:util";

const {
  values: { appVersion = "development" },
} = parseArgs({
  args: process.argv.slice(2),
  options: {
    appVersion: {
      type: "string",
    },
  },
});

await fs.writeFile(
  "./dist/package.json",
  JSON.stringify({ main: "./main/main.js" }),
  { flag: "wx" },
);

await packager({
  name: "Hyper Launcher",
  appVersion,
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
