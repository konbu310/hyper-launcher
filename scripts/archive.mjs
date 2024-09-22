import archiver from "archiver";
import fs from "node:fs";

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
