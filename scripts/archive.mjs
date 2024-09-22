import fs from "node:fs/promises";
import { execa } from "execa";

console.log("archive...");
const dirs = await fs.readdir("./build");
await Promise.all(
  dirs.map(async (dir) => {
    if (dir.startsWith("Hyper Launcher")) {
      await execa("zip", ["-r", `${dir}.zip`, dir], { cwd: "./build" });
    }
  }),
).catch((err) => {
  console.error(err);
});
console.log("done😎");
