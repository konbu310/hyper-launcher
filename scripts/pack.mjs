import packager from "@electron/packager";
import fs from "node:fs/promises";
import { program } from "commander";
import { zipArchive } from "./archive.mjs";

program
  .option("--appVersion <version>", "app version", "development")
  .option("--archive", "archive", false);

program.parse(process.argv);
const { appVersion, archive } = program.opts();

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

if (archive) {
  console.log("archive...");
  const dirs = await fs.readdir("./build");
  await Promise.all(
    dirs.flatMap(async (dir) => {
      if (dir.startsWith("Hyper Launcher")) {
        const inputPath = `./build/${dir}`;
        const outputPath = `./build/${dir}.zip`;
        await zipArchive(inputPath, outputPath);
      } else {
        return [];
      }
    }),
  );
  console.log("done😎");
}
