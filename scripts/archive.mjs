import archiver from "archiver";
import fs from "node:fs";
import fsp from "node:fs/promises";

export async function zipArchive(inputPath, outputPath) {
  return new Promise((resolve, reject) => {
    const archive = archiver.create("zip", {});
    const output = fs.createWriteStream(outputPath);
    output.on("end", () => {
      resolve(outputPath);
    });
    output.on("error", (err) => {
      reject(err);
    });
    archive.pipe(output);
    archive.directory(inputPath, false);
    archive.finalize();
  });
}

console.log("archive...");
const dirs = await fsp.readdir("./build");
await Promise.all(
  dirs.map(async (dir) => {
    if (dir.startsWith("Hyper Launcher")) {
      const inputPath = `./build/${dir}`;
      const outputPath = `./build/${dir}.zip`;
      await zipArchive(inputPath, outputPath);
    }
  }),
).catch((err) => {
  console.error(err);
});
console.log("done😎");
