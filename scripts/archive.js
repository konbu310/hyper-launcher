import fs from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

console.log("archive...");
const dirs = await fs.readdir("./build");
await Promise.all(
  dirs.map(async (dir) => {
    if (dir.startsWith("Hyper Launcher")) {
      await execFileAsync("zip", ["-r", `${dir}.zip`, dir], {
        cwd: "./build",
      });
    }
  }),
).catch((err) => {
  console.error(err);
});
console.log("done😎");
